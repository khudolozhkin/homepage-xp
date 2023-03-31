import styles from './page.module.css';
import Windows from '@/components/window/windows';
import { getDictionary } from './dictionaries';
import Taskbar from '@/components/taskbar/taskbar';
import Labels from '@/components/window/labels';

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
      <Windows lang={props.params.lang} dict={dict}/>
      <Taskbar lang={props.params.lang} dict={dict}/>
      <Labels dict={dict}/>
    </main>
  )
}
