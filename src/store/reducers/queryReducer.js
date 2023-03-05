import { actionTypes } from '../actions/actionTypes';

const initialState = {
  queryList: [],
  queryDetails: {},
};

const achievementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUERIES:
      return { ...state, queryList: action.payload };
    case actionTypes.SET_QUERY_DATA:
      return {
        ...state,
        queryDetails: action.payload
      };
    case actionTypes.CLEAR_QUERY_DATA:
      return {
        ...state,
        queryDetails: null
      };

    case actionTypes.CLEAR_QUERIES:
      return {
        ...state,
        queryList: [],
      };
    default:
      return state;
  }
};

export default achievementReducer;
