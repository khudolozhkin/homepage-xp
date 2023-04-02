import styles from './works.module.css'
import Image from 'next/image'

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
          <div className={styles.work}>
            <Image src={'/assets/futhelper-site.png'} width={1280} height={720} alt='futhelper' className={styles.workPhoto}/>
            <h4 className={styles.h}>FutHelper</h4>
            <p className={styles.p}>{dict.works.futhelper}</p>
          </div>
        </div>
      </div>
    </div>
  )
}