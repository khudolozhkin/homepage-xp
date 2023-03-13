'use client'

import styles from './labels.module.css'
import { useContext } from 'react'  
import { WindowsContext } from '@/context/windows-context'

type WindowsLabelsProps = {
  dict: any
}

export default function Labels({dict}: WindowsLabelsProps) {
  const windowsContext = useContext<any>(WindowsContext)
  let windowsArray:any = [];

  function updClose(id: string) {
    if (windowsContext.context.windows[id].isClose) {
      let newContext:any = windowsContext.context;
      for (var window in newContext.windows) {
        if (window = id) {
          newContext.windows[id].isClose = false;
          windowsContext.setContext({"windows" : newContext.windows});
        }
      }
    } else {
      if (windowsContext.context.windows[id].isMinimize) {
        let newContext:any = windowsContext.context;
        for (var window in newContext.windows) {
          if (window = id) {
            newContext.windows[id].isMinimize = false;
            windowsContext.setContext({"windows" : newContext.windows});
          }
        }
      }
    }
  }

  for (var window in windowsContext.context.windows) {
    windowsArray.push(windowsContext.context.windows[window])
  }

  const windowsLabels = windowsArray.map((window:any) => {
    return ( 
      <div key={window.id} onClick={() => {updClose(`id${window.id}`)}} className={styles.label}>
        <div className={styles.image} style={{backgroundImage: `url(${window.icon})`}}></div>
        <div className={styles.title}>{dict.titles[`id${window.id}`]}</div>
      </div>
    )
 });
  
  return (
    <div className={styles.container}>
      <div style={{display: 'flex', 'flexDirection': 'column', gap: '15px'}}>
        {windowsLabels}
      </div>
    </div>
  )
}