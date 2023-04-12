'use client'
import { useState, useEffect, useContext } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false)
  } 

  useEffect(() => {
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
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
            width: '90%',
            height: '420px',
            maxWidth: '600px',
            backgroundPosition: 'center',
            marginLeft: '18px'
          }}>

          </div>
      </div>
    </>
  )
}