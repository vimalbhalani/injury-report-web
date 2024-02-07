import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>&copy; {new Date().getFullYear()} EZINJURY All rights reserved .</div>
      <div className={styles.policy}>
        <a href="/privacy-policy">Privacy Policy</a> <span>|</span>
        <a href="/terms"> Terms of Use</a>
      </div>
    </div>
  )
}

export default Footer
