import React from 'react'
import styles from "./Loader.module.css"

const Loader = () => {
  return (
  <div className={styles.loading}>
      <div className={styles.d1}></div>
      <div className={styles.d2}></div>
  </div>
  )
}

export default Loader;
