'use client'
import { useState, useEffect, useContext } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
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