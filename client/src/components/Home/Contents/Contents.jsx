import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cleanUpGetCountries, getAllCountries, setCurrentPage, setFilters, setLoading } from '../../../redux/actions';
import Card from '../Contents/Card/Card';
import Pagination from '../../../components/common/Pagination/Pagination';
import Loader from '../../../components/common/Loading/Loader';
// import Filters from './Contents/Filters/Filters';
import styles from "./Contents.module.css"
import Filters from './Filters/Filters';
import NoFilterResult from './NoFilterResult/NoFilterResult';

const CardsContainer = ({array}) => (
  <div className={styles.cards__container}>
    { array?.map((e) =>
      <Link to={"/details/"+e.id} key={e.id} >
        <Card
          flagimg={e.flagimg}
          name={e.name}
          continents={e.continents}
        />
      </Link>
    )}
  </div>
)

const Contents = () => {
  const dispatch = useDispatch();

  let { countries, loading, currentPage, emptyAfterFiltering, recentSearch, inputSearched } = useSelector((state) => state);

  const cardsPerPage = 10;
  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  let currentCards = countries.slice(firstIndex, lastIndex);
  const selectPageNumber = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  useEffect(() => {
    if (!countries.length && !emptyAfterFiltering && !recentSearch && !inputSearched.length) {
      dispatch(setLoading(true));
      dispatch(getAllCountries());
    }
  }, [dispatch, countries.length, emptyAfterFiltering, recentSearch, inputSearched.length]);

  function handleResetSearch() {
    dispatch(cleanUpGetCountries());
    dispatch(setFilters({ order: "", continent: "", activity: "", reverse: false }))
  }

  return (
    <main className={styles.container}>
        {
          loading
          ? <div className={styles.loader_container}> <Loader /></div>
          :
            <div className={styles.contents}>
              <Filters/>
              {
                recentSearch 
                  ? <div className={styles.results_text_container}> 
                      <p>RESULT FOR "{inputSearched}" (+FILTERS): {countries.length} COUNTRIES</p> 
                      <button className={styles.reset_search_btn}>
                        <i className="fas fa-times" onClick={() => { handleResetSearch() }}></i>
                      </button>
                    </div> 
                  : null
              }
              {
                !recentSearch && emptyAfterFiltering
                ? <NoFilterResult />
                : null
              }
              <div className={styles.cards__container}>
                <CardsContainer array={currentCards} />
              </div>
            </div>
        }

      <div className={styles.pagination}>
        {loading
          ? null
          : <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={countries.length}
            selectPageNumber={selectPageNumber}
          />
        }
      </div>

    </main>
  )
}

export default Contents