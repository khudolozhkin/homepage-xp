import Image from 'next/image'
import styles from './page.module.css'
import Window from '@/components/window/window'
import { getDictionary } from './dictionaries';
import Link from 'next/link';
import Taskbar from '@/components/taskbar/taskbar';

type Props = {
  params: {
    lang: string
  },
  searchParams: object,
}

export default async function Home( props: Props ) {
  const dict = await getDictionary(props.params.lang);
  
  return (
    <main className={styles.main}>
      <Window title={dict.title}/>
      <Taskbar lang={props.params.lang}/>
    </main>
  )
}
