import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_COUNTRIES = "GET_COUNTRIES"
export const SET_INPUT_SEARCHED = "SET_INPUT_SEARCHED"
export const CLEAN_UP_GET_COUNTRIES = "CLEAN_UP_GET_COUNTRIES"
export const GET_DETAILS = "GET_DETAILS"
export const CLEAN_UP_DETAIL = "CLEAN_UP_DETAIL"
export const SET_FILTERS = "SET_FILTERS"
export const APPLY_FILTERS = "APPLY_FILTERS"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_LOADING = "SET_LOADING"
export const POST_ACTIVITY = "POST_ACTIVITY"
export const DEEP_CLEAN_UP = "DEEP_CLEAN_UP"

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/countries");
      return dispatch({ type: GET_ALL_COUNTRIES, payload: data });
    } catch (error) {
      console.log(error)
    }
  }
}
export const getCountries = ( name ) => {
  return async ( dispatch ) => {
    try {
      const { data } = await axios("/countries?name="+name);
      return dispatch({ type: GET_COUNTRIES, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}
export const setInputSearched = ( payload ) => ({ type: SET_INPUT_SEARCHED, payload })
export const cleanUpGetCountries = () => ({ type: CLEAN_UP_GET_COUNTRIES }) 
export const getDetails = ( id ) => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/countries/"+id)
      return dispatch({ type: GET_DETAILS, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}
export const cleanUpDetail = () => ({ type: CLEAN_UP_DETAIL }) 
export const setFilters = ( payload ) => ({ type: SET_FILTERS, payload })
export const applyFilters = () => ({ type: APPLY_FILTERS })
export const setCurrentPage = ( payload ) => ({ type: SET_CURRENT_PAGE, payload })
export const setLoading = ( payload ) => ({ type: SET_LOADING, payload })
export function postActivity(data) { 
  return function(dispatch) { 
    return new Promise( function(resolve, reject) {
      console.log("Data", data)
      axios.post("/activities", data)
      .then( (res) => {
        dispatch({ type: 'POST_ACTIVITY', payload: true });
        resolve(res);
      })
      .catch( (error) => {
        dispatch({ type: 'POST_ACTIVITY', payload: false });
        reject(error);
      });
    });
  }
}
export const deepCleanUp = () => ({type: DEEP_CLEAN_UP})