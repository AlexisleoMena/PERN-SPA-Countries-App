import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { setFilters, applyFilters, setLoading } from '../../../../redux/actions'

import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch()
  const { filters, allCountries } = useSelector((state) => state);

  const continents = useMemo(() => {
    return Array.from(new Set(allCountries.map(({ continents }) => continents))).sort()
  }, [allCountries]);
  
  const [openFilters, setOpenFilters] = useState(false);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/activities");
        setActivities(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function handleFilters(e, filterName) {
    window.scroll({ top: 0, behavior: "smooth" })
    if(filters[filterName] === e.target.value) return handleResetFilter(filterName)
    dispatch(setLoading(true));
    filterName === "order" 
      ? dispatch(setFilters({ ...filters, order: e.target.value, reverse: false }))
      : dispatch(setFilters({ ...filters, [filterName]: e.target.value }));
    dispatch(applyFilters());
  }
  
  function handleReverse(value) {
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, reverse: value }));
    dispatch(applyFilters());
    window.scroll({ top: 0, behavior: "smooth" })
  }

  function handleResetFilter(name) {
    dispatch(setLoading(true));
    name === "order"
      ? dispatch(setFilters({ ...filters, order: "", reverse: false }))
      : dispatch(setFilters({ ...filters, [name]: "" }));
    dispatch(applyFilters());
  }
 

  return (
    <div className={styles.container}>
      <div className={styles.filters__actives}>
        <div className={styles.btn__filter} onClick={(e) => { setOpenFilters(!openFilters) }} >
          <i className="fas fa-sliders-h"></i>
          <h3>FILTERS</h3>
        </div>
        {
          filters.order.length>0 && 
            <div 
              className={styles.filter__active}
              onClick={(e) => { handleResetFilter("order") }}
            >
              "<span>{filters.order}</span>"
              <i className="fas fa-times"></i>
            </div>
        }
        {
          filters.continent.length>0 && 
            <div 
              className={styles.filter__active}
              onClick={(e) => { handleResetFilter("continent") }}
            >
              "<span>{filters.continent}</span>"
              <i className="fas fa-times"></i>
            </div>
        }
        {
          filters.activity.length>0 && 
            <div 
              className={styles.filter__active}
              onClick={(e) => { handleResetFilter("activity") }}
            >
              "<span>{filters.activity}</span>"
              <i className="fas fa-times"></i>
            </div>
        }
      </div>

      {
        openFilters &&
        <div className={styles.options__filters}>
          <div className={styles.item}>
            <h3>ORDER</h3>
            <hr />
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Alphabetical"
                  onChange={(e) => { handleFilters(e, "order") }}
                  checked={filters.order === "Alphabetical"}
                />
                <span>ALPHABETICAL</span>
                {filters.order === "Alphabetical" && <i className="fas fa-times"></i>}
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Population"
                  onChange={(e) => { handleFilters(e, "order") }}
                  checked={filters.order === "Population"}
                />
                <span>POPULATION</span>
                {filters.order === "Population" && <i className="fas fa-times"></i>}
              </label>
            </div>
          </div>
          <div className={styles.item}>
            <h3>CONTINENTS</h3>
            <hr />
            <div>
              {
                continents?.map((c) => (
                  <label key={c}>
                    <input
                      type="checkbox"
                      value={c}
                      onChange={(e) => { handleFilters(e, "continent") }}
                      checked={filters.continent === c}
                    />
                    <span>{c.toUpperCase()}</span>
                    {filters.continent === c && <i className="fas fa-times"></i>}
                  </label>
                ))
              }
            </div>

          </div>
          <div className={styles.item}>
            <h3>ACTIVITIES</h3>
            <hr />
            <div className={styles.item_activity}>
              {
                activities?.map((a) => (
                  <label key={a}>
                    <input
                      type="checkbox"
                      value={a}
                      onChange={(e) => { handleFilters(e, "activity") }}
                      checked={filters.activity === a}
                    />
                    <span>{a.toUpperCase()}</span>
                    {filters.activity === a && <i className="fas fa-times"></i>}
                  </label>
                ))
              }
            </div>
          </div>
          <div className={styles.reverse__container}>

            {filters.order === "Alphabetical" && (
              <>
                <i
                  className={`fas fa-sort-alpha-down ${!filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(false) }}
                  key="Population_Asc"
                ></i>
                <i
                  className={`fas fa-sort-alpha-down-alt ${filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(true) }}
                  key="Population_Desc"
                ></i>
              </>
            )}

            {filters.order === "Population" && (
              <>
                <i
                  className={`fas fa-sort-numeric-down ${!filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(false) }}
                  key="Alphabetical_Asc"
                ></i>
                <i
                  className={`fas fa-sort-numeric-down-alt ${filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(true) }}
                  key="Alphabetical_Desc"
                ></i>
              </>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default Filters
