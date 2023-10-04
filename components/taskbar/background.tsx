import styles from './taskbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import WindowsList from './windowsList'
import LangChange from './langChange'

export default function Background() {
  
  return (
    <>
      <Image
            className={styles.wallpaper}
            alt='wallpaper'
            src='/assets/wallpaper.jpg'
            width={4256}
            height={3200}
            style={{userSelect: 'none', pointerEvents: 'none'}}
      />
    </>
  )
}