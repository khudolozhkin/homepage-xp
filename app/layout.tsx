import './globals.css'
import localFont from 'next/font/local';

export const metadata = {
  title: 'Homepage XP',
  description: 'Homepage XP',
}

const myFont = localFont({
  src: 'tahoma.ttf',
  display: 'swap'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={myFont.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
