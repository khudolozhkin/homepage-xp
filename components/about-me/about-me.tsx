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
  let itsRu = (lang == 'ru');

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
            <p className={styles.p}>
              {dict.aboutMe.work} <span onClick={() => LinkWindow('id4', windowsContext)} className={styles.windowLink}>FutHelper</span>.
            </p>
          </div>
          <div className={styles.portfolio} onClick={() => LinkWindow('id2', windowsContext)}>
            <img src='./assets/hand.gif' width={30} style={{rotate: '90deg', paddingTop: '4rem'}}/>
            <div className={styles.bounceDiv}>
              <span style={{display: 'inline-block', animationDelay: '80ms'}} className={styles.bounce_me}>{itsRu ? 'П' : 'P'}</span>
              <span style={{display: 'inline-block', animationDelay: '120ms'}} className={styles.bounce_me}>{itsRu ? 'о' : 'o'}</span>
              <span style={{display: 'inline-block', animationDelay: '160ms'}} className={styles.bounce_me}>{itsRu ? 'р' : 'r'}</span>
              <span style={{display: 'inline-block', animationDelay: '200ms'}} className={styles.bounce_me}>{itsRu ? 'т' : 't'}</span>
              <span style={{display: 'inline-block', animationDelay: '240ms'}} className={styles.bounce_me}>{itsRu ? 'ф' : 'f'}</span>
              <span style={{display: 'inline-block', animationDelay: '280ms'}} className={styles.bounce_me}>{itsRu ? 'о' : 'o'}</span>
              <span style={{display: 'inline-block', animationDelay: '320ms'}} className={styles.bounce_me}>{itsRu ? 'л' : 'l'}</span>
              <span style={{display: 'inline-block', animationDelay: '360ms'}} className={styles.bounce_me}>{itsRu ? 'и' : 'i'}</span>
              <span style={{display: 'inline-block', animationDelay: '400ms'}} className={styles.bounce_me}>{itsRu ? 'о' : 'o'}</span>
            </div>
            <img src='./assets/hand.gif' width={30} style={{transform: `rotate(270deg) scaleX(-1)`, paddingTop: '4rem'}}/>
          </div>
          <div className={styles.bio}>
            <h3 className={styles.paragraph} style={{fontSize: '20px', fontWeight: '600'}}>{itsRu ? 'Биография' : 'Bio'}</h3>
            <div className={styles.bioDiv}>
              <span className={styles.bioYear}>2003</span>{dict.aboutMe[2003]}
            </div>
            <div className={styles.bioDiv}>
              <span className={styles.bioYear}>2020</span>{dict.aboutMe[2020]}
            </div>
            <div style={{marginBottom: '1rem'}} className={styles.bioDiv}>
              <span className={styles.bioYear}>2021 {itsRu ? "по настоящее время" : "to present"}</span>{dict.aboutMe[2021]}
            </div>
          </div>
          <div className={styles.onTheWeb}>
            <h3 className={styles.paragraph} style={{fontSize: '20px', fontWeight: '600'}}>{itsRu ? 'В интеренте' : 'On the web'}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}