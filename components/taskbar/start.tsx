'use client'

import Image from 'next/image'
import styles from './taskbar.module.css'
import Link from 'next/link'
import {useRef, useEffect, useState} from 'react'

type StartProps = {
  lang: string
}

export default function Start({lang}: StartProps ) {
  const [dropMenu, setDropMenu] = useState(false)
  const menu = useRef<any>(null);

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
      <button onClick={() => {setDropMenu(true)}} style={{backgroundImage: `url('/assets/${lang}-start.png')`, pointerEvents: (dropMenu) ? 'none' : 'all'}} className={styles.start}></button>
      <div ref={menu} className={styles.startContainer} style={{display: dropMenu ? 'block' : 'none'}}>
        <div className={styles.titleBar}>
          <Image style={{borderRadius: '0.25rem', marginLeft: '5px'}} alt='Avatar' src={'/assets/avatar.jpg'} height={40} width={40}/>
          {(lang == 'ru') ? <h2 style={{color: 'white', marginLeft: '10px'}}>Пользователь</h2> : <h2 style={{color: 'white', marginLeft: '10px'}}>User</h2>}
        </div>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
          {(lang == 'ru') ? <h2>Это сайт портфолио с моими проектами ¯\_(ツ)_/¯</h2> : <h2>This is a portfolio site with my projects ¯\_(ツ)_/¯</h2>}
        </div>
      </div>
    </>
  )
}