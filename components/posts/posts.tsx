import styles from './posts.module.css'

export default function Posts(dict: any) {
  
  return (
    <>
      <div className={styles.container}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className={styles.errorIcon}></div>
          <p style={{lineHeight: '2rem', width: '220px' , marginLeft: '1rem', marginBottom: '1rem', marginTop: '1rem'}}>{dict.dict.posts.error}</p>
        </div>
      </div>
    </>
  )
}