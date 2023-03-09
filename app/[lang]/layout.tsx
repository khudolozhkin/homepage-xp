import '../globals.css'

export const metadata = {
  title: 'Homepage XP',
  description: 'Homepage XP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
