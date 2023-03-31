'use client'

import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "@/context/loading-context";

export default function Preloader() {
  const loadingContext = useContext(LoadingContext)
  const [isLoading, setIsLoading] = useState(loadingContext.loading?.itsFirstLoad);

  useEffect(() => {
    setIsLoading(false);
    loadingContext.setLoading(false)
 }, []);
  
  return (
    <>
      <div style={isLoading ?
        {
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'black',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: '0.5s',
          opacity: 1
          } :
          {
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.5s',
            opacity: 0,
            pointerEvents: 'none'
          }
        }>
          <div style={{
            backgroundImage: 'url(/assets/welcome-loading.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '600px',
            height: '420px',
          }}>

          </div>
      </div>
    </>
  )
}