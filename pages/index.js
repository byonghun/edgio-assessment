import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/products"><button>Go to Products Page</button></Link>
    </div>
  )
}