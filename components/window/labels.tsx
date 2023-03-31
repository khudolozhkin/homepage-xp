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
      for (var windowC in newContext.windows) {
        if (windowC = id) {
          newContext.windows[id].isClose = false;
          windowsContext.setContext({"windows" : newContext.windows});
        }
      }
    } else {
      if (windowsContext.context.windows[id].isMinimize) {
        let newContext:any = windowsContext.context;
        for (var windowC in newContext.windows) {
          if (windowC = id) {
            newContext.windows[id].isMinimize = false;
            windowsContext.setContext({"windows" : newContext.windows});
          }
        }
      }
    }
  }

  for (var windowC in windowsContext.context.windows) {
    windowsArray.push(windowsContext.context.windows[windowC])
  }

  const WindowsLabels = windowsArray.map((window:any) => {
    return ( 
      <div key={window.id} onClick={() => {updClose(window.id)}} className={styles.label}>
        <div className={styles.image} style={{backgroundRepeat: 'no-repeat',backgroundSize: 'contain', backgroundImage: `url(${window.icon})`}}>
          <div className={styles.yarlblk} style={{backgroundRepeat: 'no-repeat',backgroundSize: 'contain', backgroundImage: `url(/assets/label.png)`}}></div>
        </div>
        <div className={styles.title}>{dict.titles[`id${window.id}`]}</div>
      </div>
    )
 });
  
  return (
    <div className={styles.container}>
      {WindowsLabels}
      <div onClick={() => {window.open('https://github.com/Halatnbly/homepage-xp', '_blank')}} className={styles.label}>
      <div className={styles.image} style={{backgroundRepeat: 'no-repeat',backgroundSize: 'contain', backgroundImage: `url(/assets/github.gif)`}}>
        <div className={styles.yarlblk} style={{backgroundRepeat: 'no-repeat',backgroundSize: 'contain', backgroundImage: `url(/assets/label.png)`}}></div>
      </div>
      <div className={styles.title}>{dict.titles.source}</div>
      </div>
    </div>
  )
}