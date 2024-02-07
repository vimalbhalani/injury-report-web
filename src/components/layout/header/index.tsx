import React from 'react'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'
const Header = () => {
  const router = useRouter()
  return (
    <div className={styles.header}>
      <div className={styles.contentWrapper}>
        <div className={styles.image} onClick={() => router.push('/')}>
          {' '}
          <img src={'/images/logos.svg'} width={60} height={60} alt="Picture of the author" />
          <div className={styles.title}>
            <span className={styles.crashText}>INJURY</span>
          </div>
        </div>
        <p className={styles.headerSubContent}>WE SIMPLIFY THE PROCESS OF FINDING A DOCTOR AFTER AN ACCIDENT</p>
      </div>
    </div>
  )
}

export default Header
