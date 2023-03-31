'use client'

import styles from './window.module.css'
import Window from '@/components/window/window'
import AboutMe from '@/components/about-me/about-me';
import { useContext, useState, useEffect } from 'react';
import { WindowsContext } from '@/context/windows-context';
import WindowProvider from './window-provider';
import Preloader from '../preloader/preloader';

type taskProps = {
  lang: string,
  dict: any
}

export default function Windows( {lang, dict}: taskProps ) {
  const windowsContext = useContext<any>(WindowsContext);
  
  return (
      <>
        <Preloader/>
        <WindowProvider id='1'>
            <Window title={dict.titles.id1} id='1'><AboutMe dict={dict} lang={lang}/></Window>
        </WindowProvider>
        
        <WindowProvider id='2'>
            <Window title={dict.titles.id2} id='2'> </Window>
        </WindowProvider>

        <WindowProvider id='3'>
            <Window title={dict.titles.id3} id='3'> </Window>
        </WindowProvider>

        <WindowProvider id='4'>
            <Window title={dict.titles.id4} id='4'> </Window>
        </WindowProvider>

        <WindowProvider id='5'>
            <Window title={dict.titles.id5} id='5'> </Window>
        </WindowProvider>

        <WindowProvider id='6'>
            <Window title={dict.titles.id6} id='6'> </Window>
        </WindowProvider>
      </>
  )
}