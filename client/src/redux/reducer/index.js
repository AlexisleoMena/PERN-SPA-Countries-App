import { 
  GET_ALL_COUNTRIES, 
  GET_COUNTRIES, 
  SET_INPUT_SEARCHED,
  CLEAN_UP_GET_COUNTRIES,
  GET_DETAILS, 
  CLEAN_UP_DETAIL,
  SET_FILTERS,
  APPLY_FILTERS,
  SET_CURRENT_PAGE, 
  SET_LOADING,
  POST_ACTIVITY, 
  DEEP_CLEAN_UP
} from "../actions";

const initialState = {
  allCountries: [],
  countries: [],
  countriesSearched: [],
  inputSearched: "",
  filters: { order: "", continent: "", activity: "", reverse: false },
  details: {},
  loading: false,
  emptyAfterFiltering: false,
  recentSearch: false,
  currentPage: 1,
}

function applyFilters(state=initialState) {
  let { order, reverse, continent, activity } = state.filters;
  let copy = state.recentSearch ? [...state.countriesSearched] : [...state.allCountries];
  if(order.length) {
    if(order === "Population") {
      copy.sort( (a,b) => a.population - b.population);
    } else {
      copy.sort( (a,b) => a.name.localeCompare(b.name));
    }
    if(reverse) {
      copy = copy.reverse();
    }
  }
  if(continent.length) {
    copy = copy.filter( ({continents}) => continent === continents );
  }
  if(activity.length) {
    copy = copy.filter( ({Activities}) =>  Activities.find( ({name}) => name === activity))
  }
  return copy;
}

export default function rootReducer( state=initialState, action ) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_COUNTRIES: 
      return {
        ...state,
        allCountries: [...payload],
        countries: payload,
        loading: false
      };
    case GET_COUNTRIES: 
      return {
        ...state,
        countries: payload,
        countriesSearched: [...payload],
        loading: false,
        currentPage: 1,
        recentSearch: true
      }
    case SET_INPUT_SEARCHED:
      return {
        ...state,
        inputSearched: payload
      }
    case CLEAN_UP_GET_COUNTRIES: 
      return {
        ...state,
        countries: [...state.allCountries],
        countriesSearched: initialState.countriesSearched,
        recentSearch: initialState.recentSearch,
        inputSearched: initialState.inputSearched
      }
    case GET_DETAILS:
      return {
        ...state,
        details: payload,
        loading: false
      }
    case CLEAN_UP_DETAIL:
      return {
        ...state,
        details: {}
      }
    case SET_FILTERS:
      return {
        ...state,
        filters: payload,
      }
    case APPLY_FILTERS:
      let countriesFiltered = applyFilters(state)
      return {
        ...state,
        countries: countriesFiltered,
        currentPage: 1,
        loading: false,
        emptyAfterFiltering: !countriesFiltered.length
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case POST_ACTIVITY:
      return state
    case DEEP_CLEAN_UP: 
      return initialState;
    default: 
      return state
  }
}