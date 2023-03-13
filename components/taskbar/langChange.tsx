'use client'

import styles from './taskbar.module.css'
import Link from 'next/link'
import {useRef, useEffect, useState} from 'react'

type taskProps = {
  lang: string
}

export default function LangChange({lang}: taskProps ) {
  const [dropMenu, setDropMenu] = useState(false)
  const menu = useRef<any>(null);
  const en = useRef<any>(null);
  const ru = useRef<any>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if(!menu.current!.contains(event.target)) {
        setDropMenu(false)
      }
     };
    
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    
    window.addEventListener('keydown', (event) => {
      if ((event.keyCode == 16 && event.altKey == true) || (event.keyCode == 18 && event.shiftKey == true)) {
        if(lang == 'ru') {
          en.current?.click();
        } 
        if (lang == 'en') {
          ru.current?.click();
        }
      }
    })

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menu])

  return (
    <>
    <div ref={menu} className={styles.choiceLang} style={{display: dropMenu ? 'block' : 'none'}}>
      <li className={styles.li}><Link href='/en' ref={en} className={(lang == 'en' ?  styles.linkSelect : styles.link)}>EN - english</Link></li>
      <li className={styles.li}><Link href='/ru' ref={ru} className={(lang == 'ru' ? styles.linkSelect : styles.link)}>RU - русский</Link></li>
    </div>
    <div onClick={() => {setDropMenu(!dropMenu)}}>{lang.toUpperCase()}</div>
    </>
  )
}