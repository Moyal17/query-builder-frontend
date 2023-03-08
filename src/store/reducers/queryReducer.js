import actionTypes from '../actions/actionTypes';
import { generateKey, removeItemFromArray, updateItemInList } from "../../services/utilsService";
import { emptyQuery, queryExample,  modelFieldsMap } from "../../constants/constants";

const initialState = {
  queryList: [],
  queryDetails: {
    model: 'movie',
  },
  jsonQuery: generateKey([...queryExample]),
  modelFields: [...modelFieldsMap.movie]
};

const achievementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUERIES:
      return { ...state, queryList: action.payload };
    case actionTypes.SET_QUERY_DETAILS:
      return {...state, queryDetails: action.payload};
    case actionTypes.ADD_QUERY_TO_QUERY_LIST:
      const newQueryList = [...state.queryList ]
      newQueryList.push(action.payload);
      return {...state, queryList: newQueryList };
    case actionTypes.REMOVE_QUERY_FROM_QUERY_LIST:
      return {...state, queryList: removeItemFromArray([...state.queryList ], action.payload) };
    case actionTypes.UPDATE_QUERY_FROM_LIST:
      return {...state, queryList: updateItemInList([...state.queryList ], action.payload) };
    case actionTypes.SET_QUERY_RULES:
      if (!action.payload) return;
      return {...state, jsonQuery: action.payload};
    case actionTypes.CLEAR_QUERY_RULES:
      const query = generateKey(emptyQuery());
      return {...state, jsonQuery: query};
    case actionTypes.CLEAR_QUERY_DATA:
      return {...state, queryDetails: { model: state.queryDetails.model } };
    case actionTypes.SET_MODEL_FIELDS: {
      console.log('emptyQuery | ', emptyQuery());
      const queryBasic = generateKey(emptyQuery())
      return {
        ...state,
        queryDetails: {...state.queryDetails, model: action.payload},
        modelFields: modelFieldsMap[action.payload],
        jsonQuery: queryBasic
      };
    }

    case actionTypes.CLEAR_QUERIES:
      return {...state, queryList: [] };
    default:
      return state;
  }
};

export default achievementReducer;
