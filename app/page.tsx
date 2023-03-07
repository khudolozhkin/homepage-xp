import Image from 'next/image'
import styles from './page.module.css'
import Window from '@/components/window/window'

export default function Home() {
  return (
    <main className={styles.main}>
      <Window title='Обо мне'/>
      <Window title='FutHelper'/>
    </main>
  )
}
