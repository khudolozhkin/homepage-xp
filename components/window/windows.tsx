'use client'

import styles from './window.module.css'
import Window from '@/components/window/window'
import AboutMe from '@/components/about-me/about-me';
import { useContext, useState, useEffect } from 'react';
import { WindowsContext } from '@/context/windows-context';
import WindowProvider from './window-provider';
import Posts from '../posts/posts';
import Works from '../works/works';
import WorkPage from '../works/work-page';

type taskProps = {
  lang: string,
  dict: any
}

export default function Windows( {lang, dict}: taskProps ) {
  const windowsContext = useContext<any>(WindowsContext);
  
  return (
      <>
        <WindowProvider id='1'>
            <Window title={dict.titles.id1} id='1'><AboutMe dict={dict} lang={lang}/></Window>
        </WindowProvider>
        
        <WindowProvider id='2'>
            <Window title={dict.titles.id2} id='2'> <Works dict={dict} lang={lang}/> </Window>
        </WindowProvider>

        <WindowProvider id='3'>
            <Window title={dict.titles.id3} id='3'> <Posts dict={dict} /> </Window>
        </WindowProvider>

        <WindowProvider id='4'>
            <Window title={dict.titles.id4} id='4'> <WorkPage workName='futhelper' dict={dict} lang={lang}/> </Window>
        </WindowProvider>

        <WindowProvider id='5'>
            <Window title={dict.titles.id5} id='5'> <WorkPage workName='nfc' dict={dict} lang={lang}/> </Window>
        </WindowProvider>

        <WindowProvider id='6'>
            <Window title={dict.titles.id6} id='6'> <WorkPage workName='cip' dict={dict} lang={lang}/> </Window>
        </WindowProvider>
      </>
  )
}