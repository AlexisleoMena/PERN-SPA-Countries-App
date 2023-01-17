import React from 'react'
import { useDispatch } from 'react-redux'
import { applyFilters, setFilters } from '../../../../redux/actions'

import styles from "./NoFilterResult.module.css"
const NoFilterResult = () => {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(setFilters({ order: "", continent: "", activity: "", reverse: false }));
    dispatch(applyFilters());
  }
  return (
    <div className={styles.container}>
      <h2>No Countries Found</h2>
      <p>There are no countries that match your current filters. Try removing some of them to get better results.</p>
      <button onClick={(e) => {handleClick()}}>Clear All Filter + Start Over</button>
    </div>
  )
}

export default NoFilterResult