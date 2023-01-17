import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { deepCleanUp } from '../../redux/actions'

import styles from "./Landing.module.css"

const Landing = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(deepCleanUp());
  }, [dispatch]);

  return (
    <div className={styles.container} >
      <div className={styles.title_container}>
        <span>WELCOME!</span>
      </div>
      <div className={styles.btn_container}>
        <Link to="/home">
          <button className={styles["learn-more"]}>
            <span className={styles.circle} aria-hidden="true">
              <span className={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span className={styles["button-text"]}>START</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
