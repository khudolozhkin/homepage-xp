'use client'

import styles from './window.module.css'
import { useState, useRef, useEffect } from "react"
import React from 'react'

type WindowProps = {
  title: string
}

export default function Window ({title}: WindowProps) {
  const [windowWidth, setWindowWidth] = useState('500px');
  const [windowHeight, setWindowHeight] = useState('400px');

  
  const window = useRef<HTMLDivElement>(null);
  const titleBar = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const coordinates = {
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  }

  useEffect(() => {
    const box = window.current;
    const cont = container.current;
    const title = titleBar.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coordinates.startX = e.clientX;
      coordinates.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coordinates.lastX = box!.offsetLeft;
      coordinates.lastY = box!.offsetTop;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      if (box?.style != undefined) {
        const nextX = e.clientX - coordinates.startX + coordinates.lastX;
        const nextY = e.clientY - coordinates.startY + coordinates.lastY;
        console.log()
        box!.style.top = `${nextY}px`;
        box!.style.left = `${nextX}px`;
      }
    }

    title?.addEventListener('mousedown', onMouseDown);
    title?.addEventListener('mouseup', onMouseUp);
    cont?.addEventListener('mousemove', onMouseMove);


    const cleanup = () => {
      title?.removeEventListener('mousedown', onMouseDown)
      title?.removeEventListener('mouseup', onMouseUp)
      cont?.removeEventListener('mousemove', onMouseMove);
    }

    return cleanup;
  }, []);

  return (
    <div ref={container} style={{width: '100%', height: '100%'}}>
      <div ref={window} className={styles.window}>
        <div ref={titleBar} className={styles.titleBar}>
          <div className={styles.titleBarText}>{title}</div>
          <div className={styles.titleBarControls}>
            <button className={styles.minimize}></button>
            <button className={styles.maximize}></button>
            <button className={styles.close}></button>
          </div>
        </div>
      </div>
    </div>
  )
}