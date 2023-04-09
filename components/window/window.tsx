'use client'

import styles from './window.module.css'
import { useState, useRef, useEffect, useContext, Children } from "react"
import { WindowsContext } from '@/context/windows-context'


type WindowProps = {
  title: string,
  id: string,
  children: React.ReactNode
}

type WindowsContext =  {
    windows: {
      id: string
    }
  }

export default function Window ({title, id, children}: WindowProps) {
  const windowsContext = useContext<any>(WindowsContext);
  const [fullScreen, setFullScreen] = useState(windowsContext.context.windows[id].fullScreen);
  const [topW, setTop] = useState(parseInt(windowsContext.context.windows[id].top));
  const [leftW, setLeft] = useState(parseInt(windowsContext.context.windows[id].left));
  const [widthW, setWidth] = useState(windowsContext.context.windows[id].width)
  const [heightW, setHeight] = useState(windowsContext.context.windows[id].height)
  const [zIndexW, setZIndexW] = useState(windowsContext.context.windows[id].zIndex)
  
  const windows = useRef<HTMLDivElement>(null);
  const titleBar = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const maximize = useRef<HTMLButtonElement>(null);


  let isClicked = false;

  let x = 0;
  let y = 0;

  function updClose(id:string) {
    let newContext:any = windowsContext.context;
    for (var window in newContext.windows) {
      if (window = id) {
        newContext.windows[id].isClose = 1;

        windowsContext.setContext({"windows" : newContext.windows, "userPlatform": `${windowsContext.context.userPlatform}`});;
      }
    }
  }

  function updMinimize(id: string) {
    let newContext:any = windowsContext.context;
    for (var window in newContext.windows) {
      if (window = id) {
        newContext.windows[id].isMinimize = 1;
        windowsContext.setContext({"windows" : newContext.windows, "userPlatform": `${windowsContext.context.userPlatform}`});
      }
    }
  }

  function updContextResize(id:string, context:any, left:any = true, top:any = true) {
    let newContext:any = context;
    for (var window in newContext.windows) {
      if (window = id) {
        if(windows.current != null) {
          
          if (top == true) {
            newContext.windows[window].width = parseInt(windows.current!.style.width);
            newContext.windows[window].height = parseInt(windows.current!.style.height);
          } else {
            newContext.windows[window].width = parseInt(windows.current!.style.width);
            newContext.windows[window].height = parseInt(windows.current!.style.height);
            newContext.windows[window].top = top;
            newContext.windows[window].left = left;
          }
        }
        
        windowsContext.setContext({"windows" : newContext.windows, "userPlatform": `${windowsContext.context.userPlatform}`});
      }
    }
  }

  function updContextDrag(id:string, context:any, top: number, left:number) {
    let newContext:any = context;
    for (var window in newContext.windows) {
      newContext.windows[window].zIndex = 1;
      if (window = id) {
        newContext.windows[window].zIndex = 5;
        newContext.windows[window].fullScreen = false;

        newContext.windows[window].top = top;
        newContext.windows[window].left = left;

        if (isNaN(parseInt(windows.current!.style.height))) {
          newContext.windows[window].height = heightW;
          newContext.windows[window].width = widthW;
        } else {
          newContext.windows[window].height = parseInt(windows.current!.style.height);
          newContext.windows[window].width = parseInt(windows.current!.style.width);
        }

        windowsContext.setContext({"windows" : newContext.windows, "userPlatform": `${windowsContext.context.userPlatform}`});
      }
    }
  }

  function updContextFullScreen(id:string, context:any, fullScreen:boolean) {
    let newContext:any = context;
    for (var window in newContext.windows) {
      if (window = id) {
        if(fullScreen) {
          newContext.windows[window].fullScreen = true;
        } else {
          newContext.windows[window].fullScreen = false;
        }
        windowsContext.setContext({"windows" : newContext.windows, "userPlatform": `${windowsContext.context.userPlatform}`});
        setFullScreen(fullScreen)
      }
    }
  }

  async function makeFullScreen () {
    setFullScreen(!fullScreen); updContextFullScreen(id, windowsContext.context, !fullScreen);
  }

  useEffect(() => {    
    const cleanup = () => {
      titleBar.current?.removeEventListener('mousedown', onDown)

      document.removeEventListener('mousemove', onDrag);

      titleBar.current?.removeEventListener('mouseup', onUp)

      right.current?.removeEventListener("mousedown", onMouseDownRightResize);

      bottom.current?.removeEventListener("mousedown", onMouseDownBottomResize);

      leftRef.current?.removeEventListener("mousedown", onMouseDownLeftResize);

      topRef.current?.removeEventListener("mousedown", onMouseDownTopResize);
      
      windows.current?.removeEventListener('mousedown', mainIndex);
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/.test(navigator.userAgent)) {
      let newContext = windowsContext.context;
      newContext!.userPlatform = 'mobile';
      for (var curWindow in newContext.windows) {
        newContext.windows[curWindow].left = '70';
        newContext.windows[curWindow].width = '300';
        newContext.windows[curWindow].height = '400';
        setLeft(70);
        setWidth(300)
        setHeight(400)
      }
      windowsContext.setContext(newContext);
    }

    let width = parseInt(windows.current!.style.width, 10);
    let height = parseInt(windows.current!.style.height, 10);
    let top = topW;
    let left = leftW;
    let shiftX = 0;
    let shiftY = 0;

    const mainIndex = (e: any) => {
      setZIndexW(windowsContext.context.windows[id].zIndex);
      updContextDrag(id, windowsContext.context, top, left)
    }

    const onDrag = (e: any) => {
      if (!isClicked || windows.current!.style.width == '') return;
      top = e.pageY - shiftY;
      left = e.pageX - shiftX;
      windows.current!.style.zIndex = '10';
      windows.current!.style.transform = `translateX(${left}px) translateY(${top}px)`
      if (e.y < 20 || e.x < 20) { 
        top += 50;
        left += 50;
        maximize.current?.click()
      }

      if (e.y > (window.innerHeight - 60) || e.x > (window.innerWidth - 20)) { 
        top -= 50;
        left -= 50;
        maximize.current?.click()
      }
    }

    const onDragMobile = (e: any) => {
      top = e.changedTouches[0].pageY - shiftY;
      left = e.changedTouches[0].pageX - shiftX;
      windows.current!.style.zIndex = '10';
      windows.current!.style.transform = `translateX(${left}px) translateY(${top}px)`
    }

    const onDownMobile = (e: any) => {
      isClicked = true;
      shiftX = e.targetTouches[0].clientX - titleBar!.current!.getBoundingClientRect().left;
      shiftY = e.targetTouches[0].clientY - titleBar!.current!.getBoundingClientRect().top;
    }

    const onUpMobile = (e: any) => {
      console.log(1)
      isClicked = false;
    }

    const onDown = (e: any) => {
      isClicked = true;
      shiftX = e.clientX - titleBar!.current!.getBoundingClientRect().left;
      shiftY = e.clientY - titleBar!.current!.getBoundingClientRect().top;
    }

    const onUp = () => {
      isClicked = false;
      setLeft(left);
      setTop(top);
      setZIndexW(windowsContext.context.windows[id].zIndex);
      updContextDrag(id, windowsContext.context, top, left)
    }

    titleBar.current?.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onDrag);
    titleBar.current?.addEventListener('mouseup', onUp)
    windows.current?.addEventListener('mousedown', mainIndex)

    titleBar.current?.addEventListener("touchstart", onDownMobile)
    titleBar.current?.addEventListener("touchmove", onDragMobile);
    titleBar.current?.addEventListener("touchend", onUp)
    windows.current?.addEventListener("touchstart", mainIndex)


    // right resize

    const onMouseMoveRightResize = (e: MouseEvent) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      if (width >= 500) {
        windows.current!.style.width = `${width}px`;
        setWidth(width);
      } 
      else 
      {
        width = 500
      }
    };

    const onMouseUpRightResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      updContextResize(id, windowsContext.context)
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
      if (height >= 500) {
        windows.current!.style.height = `${height}px`;
        setHeight(height)
      } 
      else
      {
        height = 500
      }
    };

    const onMouseUpBottomResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      updContextResize(id, windowsContext.context)
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
      if (width >= 500) {
        windows.current!.style.width = `${width}px`;
        left = e.pageX - shiftX;
        windows.current!.style.transform = `translateX(${left}px) translateY(${top}px)`
        setWidth(width)
        setLeft(left)
        updContextResize(id, windowsContext.context, left, top);
      } 
      else 
      {
        width = 500;
      }
    };

    const onMouseUpLeftResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (e: MouseEvent) => {
      x = e.clientX;
      windows.current!.style.right = windows.current!.style.right;
      windows.current!.style.left = '';
      shiftX = e.clientX - windows!.current!.getBoundingClientRect().left;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Top resize

    const onMouseMoveTopResize = (e: MouseEvent) => {
      const dy = e.clientY - y;
      height = height - dy;
      y = e.clientY;
      if (height >= 500) {
        windows.current!.style.height = `${height}px`;
        top = e.pageY - shiftY;
        windows.current!.style.transform = `translateX(${left}px) translateY(${top}px)`
        setTop(top)
        setHeight(height)
        updContextResize(id, windowsContext.context, left, top);
      } 
      else
      {
        height = 500;
      }
    };

    const onMouseUpTopResize = (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (e: MouseEvent) => {
      y = e.clientY;
      const styles = (windows?.current!.style);
      windows.current!.style.bottom = styles.bottom;
      windows.current!.style.bottom = '';
      shiftY = e.clientY - titleBar!.current!.getBoundingClientRect().top;
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
      <div ref={windows} className={fullScreen ? styles.fullWindow : styles.window} style={fullScreen ? {zIndex: windowsContext.context.windows[id].zIndex} : {zIndex: windowsContext.context.windows[id].zIndex, width: `${widthW}px`, height: `${heightW}px`, transform: `translateX(${leftW}px) translateY(${topW}px)`}}>
          <div ref={topRef} style={fullScreen ? {pointerEvents: 'none'} : {pointerEvents: 'all'}} className={styles.top}></div>
          <div ref={leftRef} style={fullScreen ? {pointerEvents: 'none'} : {pointerEvents: 'all'}} className={styles.left}></div>
          <div ref={right} style={fullScreen ? {pointerEvents: 'none'} : {pointerEvents: 'all'}} className={styles.right}></div>
          <div ref={bottom} style={fullScreen ? {pointerEvents: 'none'} : {pointerEvents: 'all'}} className={styles.bottom}></div>
          <div ref={titleBar} style={fullScreen ? {pointerEvents: 'none'} : {pointerEvents: 'all'}} className={styles.titleBar}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div className={styles.icon} style={{backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundImage: `url('${windowsContext.context.windows[id].icon}')`}}></div>
              <div className={styles.titleBarText}>{title}</div>
            </div>
            <div className={styles.titleBarControls} style={{pointerEvents: 'all'}}>
              <button className={styles.minimize} onClick={() => {updMinimize(id)}}></button>
              <button className={styles.maximize} ref={maximize} onClick={() => makeFullScreen()}></button>
              <button className={styles.close} onClick={() => {updClose(id)}}></button>
            </div>
          </div>
          <div className={styles.content}>
            {children}
          </div>
      </div>
    )
}