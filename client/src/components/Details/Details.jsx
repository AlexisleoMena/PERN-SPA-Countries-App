import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { cleanUpDetail, getDetails } from '../../redux/actions'

import styles from "./Details.module.css"

const Details = () => {
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const details = useSelector( (state) => state.details)

  useEffect( () => {
    dispatch(getDetails(id));
    return () => {
      dispatch(cleanUpDetail)
    }
  }, [id, dispatch])

  window.scroll(0,0);

  return (
    <div className={styles.container}>
      <button className={styles.btn__back} onClick={()=>navigate(-1)}><i className="fas fa-arrow-left"></i></button>

      <div className={styles.detail_container}>
        <img src={details.flagimg} alt="" />
        <h1 className={styles.title}>{details.name}</h1>
        <ul>
          <li>capital:  {details.capital}</li>
          <li>region:  {details.region}</li>
          <li>subregion:  {details.subregion}</li>
          <li>continent:  {details.continents}</li>
          <li>area:  {details.area} km<sup>2</sup></li>
          <li>population:  {details.population}</li>
          <li>id: {details.id}</li>
        </ul>
      </div>

      <div className={styles.activities_container}>
          <h1 className={styles.title}>ACTIVITIES </h1>
          <div className={styles.activities_cards}>
            {details.Activities?.length
              ?  details.Activities?.map( (a, i) => (
                <div className={styles.activity_card} key={i}>
                  <i
                    className={`fas fa-times ${styles.delete__activity}`}
                    onClick={(e) => { }}
                  ></i>
                  <ul>
                    <li>name: {a.name}</li>
                    <li>difficulty: {a.difficulty}</li>
                    <li>duration: {a.duration}</li>
                    <li>season: {a.season}</li>
                  </ul>
                </div>
              ))
              : <span>NO ACTIVITIES</span>
            }
          </div>
      </div>
    </div>
  )
}

export default Details
