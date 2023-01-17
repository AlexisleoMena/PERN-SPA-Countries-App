import React from 'react'
import styles from "./Card.module.css";
const Card = ({name, flagimg, continents}) => {
  
  return (
    <div className={styles.card_container}>
      <img src={flagimg} alt="" />
      <h4 className={styles.name}>{name}</h4>
      <h5 className={styles.continent}>({continents})</h5>
    </div>
  )
}

export default Card