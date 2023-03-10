'use client'

import styles from './taskbar.module.css'
import Link from 'next/link'
import {useRef, useEffect, useState} from 'react'

type ChoiceLangProps = {
  lang: string
}

export default function LangChange( {lang}: ChoiceLangProps ) {
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
    <div ref={menu} className={styles.choiceLang} style={{display: dropMenu ? 'block' : 'none'}}>
      <li className={styles.li}><Link href='/en' className={(lang == 'en' ?  styles.linkSelect : styles.link)}>EN - english</Link></li>
      <li className={styles.li}><Link href='/ru' className={(lang == 'ru' ? styles.linkSelect : styles.link)}>RU - русский</Link></li>
    </div>
    <div onClick={() => {setDropMenu(!dropMenu)}}>{lang.toUpperCase()}</div>
    </>
  )
}