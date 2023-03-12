'use client'
import { useContext } from "react"
import { WindowsContext } from "@/context/windows-context"
import styles from './taskbar.module.css'

type WindowsListProps = {
  dict: any
}

export default function WindowsList({dict}: WindowsListProps) {
  const windowsContext = useContext<any>(WindowsContext)
  let windowsArray:any = [];

  function updMinimize(id: string) {
    if (windowsContext.context.windows[id].isMinimize) {
      let newContext:any = windowsContext.context;
      for (var window in newContext.windows) {
        if (window = id) {
          newContext.windows[id].isMinimize = false;
          windowsContext.setContext({"windows" : newContext.windows});
        }
      }
    } else {
      let newContext:any = windowsContext.context;
      for (var window in newContext.windows) {
        if (window = id) {
          newContext.windows[id].isMinimize = true;
          windowsContext.setContext({"windows" : newContext.windows});
        }
      }
    }
  }

  for (var window in windowsContext.context.windows) {
    windowsArray.push(windowsContext.context.windows[window])
  }
  
  const windowsList = windowsArray.map((window:any) => {
    if (window.isClose) {
      return
    }
    return <div className={ ( windowsContext.context.windows[`id${window.id}`].zIndex == 5 ) ? styles.buttonActive : styles.button} onClick={() => {updMinimize(`id${window.id}`)}} key={window.id}>{dict.titles[`id${window.id}`]}</div>;
 });

  return (
    <>
      <ul style={{display: 'contents'}}>
        {windowsList}
      </ul>
    </>
  )
}