import styles from './taskbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import LangChange from './langChange'

type TaskBarProps = {
  lang: string
}

export default function Taskbar( {lang}: TaskBarProps ) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.elements}>
          <div>
            <button style={{backgroundImage: `url('/assets/${lang}-start.png')`}}className={styles.start}></button>
          </div>
          <div className={styles.langs}>
            <LangChange lang={lang}/>
          </div>
        </div>
      </div>
      <Image
            className={styles.wallpaper}
            alt='wallpaper'
            src='/assets/wallpaper.jpg'
            width={5333}
            height={4000}
            style={{userSelect: 'none', pointerEvents: 'none'}}
      />
    </>
  )
}