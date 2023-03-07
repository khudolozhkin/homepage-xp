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

  let isClicked = false;

  useEffect(() => {
    let top = 100;

    let left = 100;
    
    const onDrag = (e: MouseEvent) => {
      if (!isClicked) return

      top = top + e.movementY;

      left = left + e.movementX;

      console.log(e)

      window.current!.style.zIndex = '10'
      window.current!.style.transform = `translateX(${left + e.movementX}px) translateY(${top + e.movementY}px)`
    }

    const onDown = () => {
      isClicked = true;
    }

    const onUp = () => {
      isClicked = false;
      window.current!.style.zIndex = '1'
    }
    
    titleBar.current?.addEventListener('mousedown', onDown)

    window.current?.addEventListener('mousemove', onDrag);

    titleBar.current?.addEventListener('mouseup', onUp)

    //titleBar.current?.addEventListener('mousemove', onUp)


    const cleanup = () => {
      titleBar.current?.removeEventListener('mousedown', onDown)

      window.current?.removeEventListener('mousemove', onDrag);

      titleBar.current?.removeEventListener('mouseup', onUp)

      //titleBar.current?.removeEventListener('mousemove', onUp)
    }
    
    return cleanup
  }, []);

  return (
    <div ref={window} className={styles.window} style={{transform: 'translateX(100px) translateY(100px)'}}>
        <div ref={titleBar} className={styles.titleBar}>
          <div className={styles.titleBarText}>{title}</div>
          <div className={styles.titleBarControls}>
            <button className={styles.minimize}></button>
            <button className={styles.maximize}></button>
            <button className={styles.close}></button>
          </div>
        </div>
    </div>
  )
}