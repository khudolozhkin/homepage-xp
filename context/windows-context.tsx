'use client'

import { useState, createContext } from "react";
import config from './config.json'

export const WindowsContext = createContext({});

export default function WindowsProvider({ children } : {children: React.ReactNode}) {
  const [context, setContext] = useState<object>(config);

  return (
    <WindowsContext.Provider value={{context, setContext}}>
      {children}
    </WindowsContext.Provider>
  )
}