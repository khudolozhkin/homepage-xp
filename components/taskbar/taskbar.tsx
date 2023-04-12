import styles from './taskbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import WindowsList from './windowsList'
import LangChange from './langChange'

type taskProps = {
  lang: string,
  dict: any
}

export default function Taskbar( {lang, dict}: taskProps) {
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.elements}>
          <div className={styles.leftPart}>
            <button style={{backgroundImage: `url('/assets/${lang}-start.png')`}}className={styles.start}></button>
            <WindowsList dict={dict}/>
          </div>
          <div className={styles.langs}>
            <LangChange lang={lang}/>
          </div>
        </div>
      </div>
    </>
  )
}