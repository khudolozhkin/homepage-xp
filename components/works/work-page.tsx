'use client'

import styles from './works.module.css'
import Image from 'next/image'
import { LinkWindow } from '@/lib/linkWindow'
import { WindowsContext } from '@/context/windows-context'
import { useContext } from 'react'

type WorkPageProps = {
  lang: string,
  dict: any,
  workName: string
}

export default function WorkPage({lang, dict, workName}: WorkPageProps) {
  const windowsContext = useContext(WindowsContext)
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inContainer}>
          <div className={styles.workTitle}>
            <h4 onClick={() => {LinkWindow(`${2}`, windowsContext)}} style={{color: '#00f', fontWeight: '300', cursor: 'pointer', textDecoration: 'underline'}}>{(lang == 'ru') ? 'Работы' : 'Works'}</h4>
            <svg className={styles.arrow}><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            <h3>{dict[workName].name} <span className={styles.year}>{dict[workName].year}</span></h3> 
          </div>
          <p className={styles.workAbout}>
            {dict[workName].about}
          </p>
          <ul className={styles.list}>
            <li>
              <span className={styles.header}>{dict[workName].linkName}</span>
              <a className={styles.info} style={{color: '#00f'}} href={dict[workName].link}>{dict[workName].link}</a>
            </li>
            {dict[workName].headers.map((header:string, i:number) => <li key={i}><span className={styles.header}>{header}</span><span className={styles.info}>{dict[workName].info[i]}</span></li>)}
          </ul>
            {dict[workName].img.map((img:string, i: number) => <div key={i} style={{position: 'relative', maxWidth: '100%'}}> 
                <Image alt={img} src={img} key={i} width={1280} height={720} layout="intrinsic"  style={{
                  borderRadius: '3px',
                  boxShadow: 'inset 1px 1px #fcfcfe, inset -1px -1px #fcfcfe, 1px 2px 2px 0 rgba(208,206,191,.75)',
                  border: '1px solid #919b9c',
                  marginTop: '1rem',
                  position: 'relative'
                }}/>
              </div>)}
        </div>
      </div>
    </>
  )
}