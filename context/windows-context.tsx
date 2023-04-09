'use client'

import { useState, createContext, useEffect } from "react";
import config from './config.json'

type WindowsContext =  {
  windows: any,
  userPlatform: string
}

export const WindowsContext = createContext({});

export default function WindowsProvider({ children } : {children: React.ReactNode}) {
  const [context, setContext] = useState<WindowsContext>(config);
  
  return (
    <WindowsContext.Provider value={{context, setContext}}>
      {children}
    </WindowsContext.Provider>
  )
}