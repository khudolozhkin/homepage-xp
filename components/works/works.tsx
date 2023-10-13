import styles from './works.module.css'
import Image from 'next/image'
import WorkCard from './work-card'

type WorksProps = {
  lang: string,
  dict: any
}

export default function Works({dict, lang}: WorksProps) {
  return (
    <div className={styles.container}>
      <div className={styles.inContainer}>
        <h3>{dict.works.applications}</h3>
        <div className={styles.grid}>
          <WorkCard linkId={4} title='FutHelper' about={dict.works.futhelper} staticImage='futhelper-preview.mp4' lang={lang}/>
          <WorkCard linkId={7} title={lang == 'ru' ? 'НашЮТрек' : 'NashYouTrack'} about={dict.works.nyt} staticImage='nyt.mp4' lang={lang}/>
        </div>
        <h3>{dict.works.video}</h3>
        <div className={styles.grid}>
          <WorkCard linkId={5} title='Need For Code' about={dict.works.NeedForCode} staticImage='NeedForCode.mp4' lang={lang}/>
          <WorkCard linkId={6} title={lang == 'ru' ? 'Код в Мишке' : 'Code in Poke'} about={dict.works.CodeInPoke} staticImage='CodeInPoke.mp4' lang={lang}/>
        </div>
      </div>
    </div>
  )
}