import React from 'react'
import Footer from './footer'
import Header from './header'
import styles from './Layout.module.scss'

const Layout = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.middleContent}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
