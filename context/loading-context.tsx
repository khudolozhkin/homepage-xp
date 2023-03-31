'use client'

import { useState, createContext } from "react";

type LoadingContext = {
  loading: any;
  setLoading: any
}

export const LoadingContext = createContext<LoadingContext>({loading: {}, setLoading: {}});

export default function LoadingProvider({ children } : {children: React.ReactNode}) {
  const [loading, setLoading] = useState<object>({itsFirstLoad: true});

  return (
    <LoadingContext.Provider value={{loading, setLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}