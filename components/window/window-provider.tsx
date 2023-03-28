'use client'

import { useContext } from "react"
import { WindowsContext } from '@/context/windows-context';

export default function WindowProvider({ children, id }: { children: React.ReactNode, id: string }) {
  const windowsContext = useContext<any>(WindowsContext);
  
  return (
    <>
      <div style={ windowsContext.context.windows[id].isClose ? {display: 'none'} : {display: 'block'}}>
        <div style={ windowsContext.context.windows[id].isMinimize ? {transition: '0.1s', marginTop: '3000px', position: 'absolute'} : {marginTop: '0px'}}>
          {children}
        </div>
      </div> 
    </>
  )
}