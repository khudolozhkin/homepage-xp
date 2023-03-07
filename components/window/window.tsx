'use client'

import styles from './window.module.css'
import { useState, useRef, useEffect } from "react"
import React from 'react'

type WindowProps = {
  title: string
}

export default function Window ({title}: WindowProps) {
  const [fullScreen, setFullScreen] = useState(false);
  const [topW, setTop] = useState(100);
  const [leftW, setLeft] = useState(100);
  const [widthW, setWidth] = useState(400)
  const [heightW, setHeight] = useState(800)
  
  const windows = useRef<HTMLDivElement>(null);
  const titleBar = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);


  let isClicked = false;

  let x = 0;
  let y = 0;

  useEffect(() => {
    const cleanup = () => {
      titleBar.current?.removeEventListener('mousedown', onDown)

      windows.current?.removeEventListener('mousemove', onDrag);

      titleBar.current?.removeEventListener('mouseup', onUp)

      right.current?.removeEventListener("mousedown", onMouseDownRightResize);

      bottom.current?.removeEventListener("mousedown", onMouseDownBottomResize);

      leftRef.current?.removeEventListener("mousedown", onMouseDownLeftResize);

      topRef.current?.removeEventListener("mousedown", onMouseDownTopResize);
    }
    
    
    
    if(fullScreen) return cleanup;
    
    
    let width = parseInt(windows.current!.style.width, 10);
    let height = parseInt(windows.current!.style.height, 10);



    let top = topW;

    let left = leftW;
    
    const onDrag = (e: MouseEvent) => {
      if (!isClicked) return;



      top = top + e.movementY;
      //setTop(top);

      left = left + e.movementX;
      //setLeft(left);

      windows.current!.style.zIndex = '10'
      windows.current!.style.transform = `translateX(${left + e.movementX}px) translateY(${top + e.movementY}px)`

      //setLeft(left);
      //setTop(top);

      if (e.y < 20 || e.x < 20 || e.y > (window.innerHeight - 20) || e.x > (window.innerWidth - 20)) { 
        setFullScreen(true);
        onUp();
        setTop(100);
        setLeft(100);
        top = topW;
        left = leftW;
        windows.current!.style.width = `${widthW}px`;
        windows.current!.style.height = `${heightW}px`;
        return cleanup
      }

    }

    const onDown = () => {
      isClicked = true;
    }

    const onUp = () => {
      isClicked = false;
      windows.current!.style.zIndex = '1'
      setLeft(left);
      setTop(top);
    }

    
    
    titleBar.current?.addEventListener('mousedown', onDown)

    windows.current?.addEventListener('mousemove', onDrag);

    titleBar.current?.addEventListener('mouseup', onUp)

    //titleBar.current?.addEventListener('mousemove', onUp)
    
    // Right resize
    const onMouseMoveRightResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      windows.current!.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };
    

    const onMouseDownRightResize = (e: MouseEvent) => {
      x = e.clientX;
      windows.current!.style.left = styles.left;
      windows.current!.style.right = '';
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Bottom resize

    const onMouseMoveBottomResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height = height + dy;
      y = e.clientY;
      windows.current!.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (e: MouseEvent) => {
      y = e.clientY;
      windows.current!.style.top = styles.top;
      windows.current!.style.bottom = '';
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    
    const onMouseMoveLeftResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width - dx;
      windows.current!.style.width = `${width}px`;
      left = left + e.movementX;
      windows.current!.style.transform = `translateX(${left + e.movementX}px) translateY(${top}px)`
    };

    const onMouseUpLeftResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (e: MouseEvent) => {
      x = e.clientX;
      windows.current!.style.right = windows.current!.style.right;
      windows.current!.style.left = '';
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Top resize
    const onMouseMoveTopResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height = height - dy;
      y = e.clientY;
      windows.current!.style.height = `${height}px`;
      top = top + e.movementY;
      windows.current!.style.transform = `translateX(${left}px) translateY(${top + e.movementY}px)`
    };

    const onMouseUpTopResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (e: MouseEvent) => {
      y = e.clientY;
      const styles = (windows?.current!.style);
      windows.current!.style.bottom = styles.bottom;
      windows.current!.style.bottom = '';
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    right.current?.addEventListener("mousedown", onMouseDownRightResize);

    bottom.current?.addEventListener("mousedown", onMouseDownBottomResize);

    leftRef.current?.addEventListener("mousedown", onMouseDownLeftResize);

    topRef.current?.addEventListener("mousedown", onMouseDownTopResize);
    
    return cleanup
  }, []);

  return (
    <div ref={windows} className={fullScreen ? styles.fullWindow : styles.window} style={fullScreen ? {} : {zIndex: 1, width: `${widthW}px`, height: `${widthW}px`, transform: `translateX(${leftW}px) translateY(${topW}px)`}}>
        <div ref={topRef} className={styles.top}></div>
        <div ref={leftRef} className={styles.left}></div>
        <div ref={right} className={styles.right}></div>
        <div ref={bottom} className={styles.bottom}></div>
        <div ref={titleBar} style={fullScreen ? {pointerEvents: 'none'} : {}} className={styles.titleBar}>
          <div className={styles.titleBarText}>{title}</div>
          <div className={styles.titleBarControls} style={{pointerEvents: 'all'}}>
            <button className={styles.minimize}></button>
            <button className={styles.maximize} onClick={() => { setFullScreen(!fullScreen) }}></button>
            <button className={styles.close}></button>
          </div>
        </div>
    </div>
  )
}