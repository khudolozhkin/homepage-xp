import styles from './works.module.css'

type FutHelperProps = {
  lang: string,
  dict: any
}

export default function FutHelper({lang, dict}: FutHelperProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inContainer}>
          <div className={styles.workTitle}>
            <h4>{(lang == 'ru') ? 'Работы' : 'Works'}</h4>
            <svg className={styles.arrow}><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            <h3>FutHelper <span className={styles.year}>2023-</span></h3> 
          </div>
          <p className={styles.workAbout}>
            {dict.futhelper.about}
          </p>
          <ul className={styles.list}>
            <li>
              <span>{dict.futhelper.linkName}</span>
              <span>{dict.futhelper.link}</span>
            </li>
            {dict.futhelper.headers.map((item:any, i:any) => <li key={i}><span>{item}</span><span>{dict.futhelper.info[i]}</span></li>)}
          </ul>
        </div>
      </div>
    </>
  )
}