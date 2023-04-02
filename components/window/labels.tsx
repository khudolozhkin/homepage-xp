'use client'

import styles from './labels.module.css'
import { useContext } from 'react'  
import { WindowsContext } from '@/context/windows-context'
import { LinkWindow } from '@/lib/linkWindow'

type WindowsLabelsProps = {
  dict: any
}

export default function Labels({dict}: WindowsLabelsProps) {
  const windowsContext = useContext<any>(WindowsContext)
  let windowsArray:any = [];

  for (var windowC in windowsContext.context.windows) {
    windowsArray.push(windowsContext.context.windows[windowC])
  }

  const WindowsLabels = windowsArray.map((window:any) => {
    return ( 
      <div key={window.id} onClick={() => {LinkWindow(window.id, windowsContext)}} className={styles.label}>
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