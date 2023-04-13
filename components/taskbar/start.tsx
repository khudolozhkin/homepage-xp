'use client'

import styles from './taskbar.module.css'
import Link from 'next/link'
import {useRef, useEffect, useState} from 'react'

type StartProps = {
  lang: string
}

export default function Start({lang}: StartProps ) {
  const [dropMenu, setDropMenu] = useState(false)
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (event: any) => {
      if(!menu.current!.contains(event.target)) {
        setDropMenu(false)
      }
     };
    
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menu])

  return (
    <>
    <button onClick={() => {setDropMenu(!dropMenu)}} style={{backgroundImage: `url('/assets/${lang}-start.png')`, pointerEvents: (dropMenu) ? 'none' : 'all'}} className={styles.start}></button>
    <div ref={menu} className={styles.startDiv} style={{display: dropMenu ? 'block' : 'none'}}>
      <h2 style={{display: 'flex', justifyContent: 'center'}}>{(lang == 'ru') ? 'Это моя домашняя страничка' : 'Its my homepage'}</h2>
    </div>
    </>
  )
}