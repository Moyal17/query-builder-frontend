import actionTypes from '../actions/actionTypes';
import { generateKey, removeItemFromArray, updateItemInList } from "../../services/utilsService";
import { modelFieldsMap } from "../../constants/constants";

const queryExample = [{
  condition: 'and',
  id: Number.parseInt(Math.random() * 10000),
  rules: [{
    id: 3,
    fieldName: 'budget',
    operator: 'greaterEqual',
    value: 55000000
  }, {
    condition: 'or',
    id: Number.parseInt(Math.random() * 10000),
    rules: [{
      id: 4,
      fieldName: 'popularity',
      operator: 'greater',
      value: 80
    }]
  }]
}];

const initialState = {
  queryList: [],
  queryDetails: {
    model: 'movie',
  },
  jsonQuery: generateKey(queryExample),
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
      const query = generateKey(queryExample);
      return {...state, jsonQuery: query};
    case actionTypes.CLEAR_QUERY_DATA:
      return {...state, queryDetails: { model: 'movie' } };
    case actionTypes.SET_MODEL_FIELDS:
      return {...state, modelFields: modelFieldsMap[action.payload]};
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
