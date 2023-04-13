import styles from './taskbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import WindowsList from './windowsList'
import LangChange from './langChange'
import Start from './start'

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
            <Start lang={lang}/>
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