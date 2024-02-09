import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'
const Header = () => {
  const router = useRouter()
  const [waitTime, setWaitTime] = useState(15)

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        // Generate a random number between 15 and 30
        const newWaitTime = Math.floor(Math.random() * (30 - 15 + 1)) + 15
        setWaitTime(newWaitTime)
      },
      5 * 60 * 1000,
    ) // Update every 5 minutes

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={styles.header}>
      <p className={styles.announcement}>Current wait time for Doctor Visit is {waitTime} minutes</p>
      <div className={styles.contentWrapper}>
        <div className={styles.image} onClick={() => router.push('/')}>
          {' '}
          {/* <img src={'/images/logos.svg'} width={60} height={60} alt="Picture of the author" /> */}
          <div className={styles.title}>
            EZ<span className={styles.crashText}>INJURY</span>
          </div>
        </div>
        <p className={styles.headerSubContent}>WE SIMPLIFY THE PROCESS OF FINDING A DOCTOR AFTER AN ACCIDENT</p>
      </div>
    </div>
  )
}

export default Header
