import styles from './about.module.css'
import Image from 'next/image'
import { LinkWindow } from '@/lib/linkWindow'
import { WindowsContext } from '@/context/windows-context'
import { useContext } from 'react'

type AboutMeProps = {
  lang: string,
  dict: any
}

export default function AboutMe({dict, lang}: AboutMeProps) {
  const windowsContext = useContext(WindowsContext);

  return (
    <div className={styles.container}>
      <div style={{margin: '0 0 0 0', color: 'white'}} className={styles.background}>
        <div className={styles.outContainer}>
          <Image className={styles.welcomeImg} src={`/assets/welcome-${lang}.png`} width={520} height={76} alt='Welcome'/>
          <img src='assets/fire.gif' style={{width: '100%', marginTop: '-1rem'}}/>
          <div className={styles.hello}>
            <div className={styles.text}>
              <h1 style={{fontWeight: '700', margin: '0 0 0 0'}}>{dict.aboutMe.name}</h1>
              <h3 style={{fontWeight: '300', margin: '0 0 0 0'}}>{dict.aboutMe.about}</h3>
            </div>
            <Image className={styles.meImg} src='/assets/me.jpg' width={100} height={100} alt='Me'/>
          </div>
          <div className={styles.work}>
            <h3 className={styles.paragraph} style={{fontSize: '20px', fontWeight: '600'}}>{(lang == 'ru') ? 'Работа' : 'Work'}</h3>
            <p onClick={() => LinkWindow('id2', windowsContext)} className={styles.p}>
              {dict.aboutMe.work}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}