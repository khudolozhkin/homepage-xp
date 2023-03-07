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
  const right = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);


  let isClicked = false;

  useEffect(() => {
    let width = parseInt(window.current!.style.width, 10);
    let height = parseInt(window.current!.style.height, 10);
    let x = 0;
    let y = 0;



    let top = 100;

    let left = 100;
    
    const onDrag = (e: MouseEvent) => {
      if (!isClicked) return

      top = top + e.movementY;

      left = left + e.movementX;


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
    
    // Right resize
    const onMouseMoveRightResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      window.current!.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };
    

    const onMouseDownRightResize = (e: MouseEvent) => {
      x = e.clientX;
      window.current!.style.left = styles.left;
      window.current!.style.right = '';
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Bottom resize

    const onMouseMoveBottomResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height = height + dy;
      y = e.clientY;
      window.current!.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (e: MouseEvent) => {
      y = e.clientY;
      window.current!.style.top = styles.top;
      window.current!.style.bottom = '';
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    
    const onMouseMoveLeftResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width - dx;
      window.current!.style.width = `${width}px`;
      left = left + e.movementX;
      window.current!.style.transform = `translateX(${left + e.movementX}px) translateY(${top}px)`
    };

    const onMouseUpLeftResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (e: MouseEvent) => {
      x = e.clientX;
      window.current!.style.right = window.current!.style.right;
      window.current!.style.left = '';
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Top resize
    const onMouseMoveTopResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height = height - dy;
      y = e.clientY;
      window.current!.style.height = `${height}px`;
      top = top + e.movementY;
      window.current!.style.transform = `translateX(${left}px) translateY(${top + e.movementY}px)`
    };

    const onMouseUpTopResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (e: MouseEvent) => {
      y = e.clientY;
      const styles = (window?.current!.style);
      window.current!.style.bottom = styles.bottom;
      window.current!.style.bottom = '';
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    right.current?.addEventListener("mousedown", onMouseDownRightResize);

    bottom.current?.addEventListener("mousedown", onMouseDownBottomResize);

    leftRef.current?.addEventListener("mousedown", onMouseDownLeftResize);

    topRef.current?.addEventListener("mousedown", onMouseDownTopResize);
    
    const cleanup = () => {
      titleBar.current?.removeEventListener('mousedown', onDown)

      window.current?.removeEventListener('mousemove', onDrag);

      titleBar.current?.removeEventListener('mouseup', onUp)

      right.current?.removeEventListener("mousedown", onMouseDownRightResize);

      bottom.current?.removeEventListener("mousedown", onMouseDownBottomResize);

      leftRef.current?.removeEventListener("mousedown", onMouseDownLeftResize);

      topRef.current?.removeEventListener("mousedown", onMouseDownTopResize);
    }
    
    return cleanup
  }, []);

  return (
    <div ref={window} className={styles.window} style={{width: '700px', height: '300px', transform: 'translateX(100px) translateY(100px)'}}>
        <div ref={topRef} className={styles.top}></div>
        <div ref={leftRef} className={styles.left}></div>
        <div ref={right} className={styles.right}></div>
        <div ref={bottom} className={styles.bottom}></div>
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