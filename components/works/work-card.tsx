'use client'

import { useState, useContext, useRef, useEffect } from 'react'
import styles from './works.module.css'
import Image from 'next/image'
import { LinkWindow } from '@/lib/linkWindow'
import { WindowsContext } from '@/context/windows-context'

type CardProps = {
  staticImage: string,
  lang: string,
  title: string,
  about: string,
  linkId: number
}

export default function WorkCard({staticImage, lang, title, about, linkId}: CardProps) {
  const windowsContext = useContext(WindowsContext);
  let video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    video!.current!.play()
    video!.current!.pause()
  }, []);

  return (
    <>
      <div onClick={() => LinkWindow(`${linkId}`, windowsContext)} onMouseEnter={() => {video!.current!.play()}} onMouseLeave={() => {video!.current!.pause()}} className={styles.work}>
            <video ref={video} className={styles.workPhoto} muted loop playsInline>
              <source src={`/assets/${staticImage}`} type='video/mp4'/>
            </video>
            <h4 className={styles.h}>{title}</h4>
            <p className={styles.p} style={{width: '90%'}}>{about}</p>
      </div>
    </>
  )
}