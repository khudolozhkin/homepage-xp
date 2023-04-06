'use client'

import { useState, useContext } from 'react'
import styles from './works.module.css'
import Image from 'next/image'
import { LinkWindow } from '@/lib/linkWindow'
import { WindowsContext } from '@/context/windows-context'

type CardProps = {
  staticImage: string,
  hoverImage: string,
  lang: string,
  title: string,
  about: string,
  linkId: number
}

export default function WorkCard({staticImage, hoverImage, lang, title, about, linkId}: CardProps) {
  const [currentImage, setCurrentImage] = useState(staticImage);
  const windowsContext = useContext(WindowsContext);

  return (
    <>
      <div onClick={() => LinkWindow(`${linkId}`, windowsContext)} onMouseEnter={() => {setCurrentImage(hoverImage)}} onMouseLeave={() => {setCurrentImage(staticImage)}}  className={styles.work}>
            <Image src={`/assets/${currentImage}`} width={1280} height={720} alt={title} className={styles.workPhoto}/>
            <h4 className={styles.h}>{title}</h4>
            <p className={styles.p}>{about}</p>
      </div>
    </>
  )
}