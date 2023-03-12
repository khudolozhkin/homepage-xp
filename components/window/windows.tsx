'use client'

import styles from './window.module.css'
import Window from '@/components/window/window'
import AboutMe from '@/components/about-me/about-me';
import { useContext } from 'react';
import { WindowsContext } from '@/context/windows-context';

type taskProps = {
  lang: string,
  dict: any
}

export default function Windows( {lang, dict}: taskProps ) {
  const windowsContext = useContext<any>(WindowsContext);
  
  return (
    <>
      <div style={ windowsContext.context.windows['id1'].isClose ? {display: 'none'} : {display: 'block'}}>
        <div style={ windowsContext.context.windows['id1'].isMinimize ? {transition: '0.1s', marginTop: '3000px', position: 'absolute'} : {marginTop: '0px'}}>
          <Window title={dict.titles.id1} id='id1'><AboutMe lang={lang}/></Window>
        </div>
      </div>
      
      <div style={ windowsContext.context.windows['id2'].isClose ? {display: 'none'} : {display: 'block'}}>
        <div style={ windowsContext.context.windows['id2'].isMinimize ? {transition: '0.1s', marginTop: '3000px', position: 'absolute'} : {marginTop: '0px'}}>
          <Window title={dict.titles.id2} id='id2'> </Window>
        </div>
      </div>
    </>
  )
}