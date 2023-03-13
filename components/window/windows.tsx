'use client'

import styles from './window.module.css'
import Window from '@/components/window/window'
import AboutMe from '@/components/about-me/about-me';
import { useContext } from 'react';
import { WindowsContext } from '@/context/windows-context';
import WindowProvider from './window-provider';

type taskProps = {
  lang: string,
  dict: any
}

export default function Windows( {lang, dict}: taskProps ) {
  const windowsContext = useContext<any>(WindowsContext);
  
  return (
    <>
      <WindowProvider id='id1'>
          <Window title={dict.titles.id1} id='id1'><AboutMe lang={lang}/></Window>
      </WindowProvider>
      
      <WindowProvider id='id2'>
          <Window title={dict.titles.id2} id='id2'> </Window>
      </WindowProvider>
    </>
  )
}