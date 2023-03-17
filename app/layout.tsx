import './globals.css'
import localFont from 'next/font/local';
import WindowsProvider from '@/context/windows-context';

export const metadata = {
  title: 'Homepage XP',
  description: 'Homepage XP',
  viewport: 'width=device-width, user-scalable=no'
}

const myFont = localFont({
  src: 'tahoma.ttf',
  display: 'swap'
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={myFont.className}>
      <WindowsProvider>
        <body>
          {children}
        </body>
      </WindowsProvider>
    </html>
  )
}
