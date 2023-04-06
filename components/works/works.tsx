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
          <WorkCard linkId={4} title='FutHelper' about={dict.works.futhelper} hoverImage='futhelper-site.png' staticImage='futhelper-site.png' lang={lang}/>
        </div>
        <h3>{dict.works.video}</h3>
        <div className={styles.grid}>
          <WorkCard linkId={5} title='Need For Code' about={dict.works.NeedForCode} hoverImage='futhelper-site.png' staticImage='futhelper-site.png' lang={lang}/>
          <WorkCard linkId={6} title={lang == 'ru' ? 'Код в Мишке' : 'Code in Poke'} about={dict.works.CodeInPoke} hoverImage='futhelper-site.png' staticImage='futhelper-site.png' lang={lang}/>
        </div>
      </div>
    </div>
  )
}