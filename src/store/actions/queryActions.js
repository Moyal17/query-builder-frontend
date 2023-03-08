import actionTypes from '../actions/actionTypes';
import { apiMethods }  from '../../services/apiService';


export const handleUserQueries = payload => ({
  type: actionTypes.SET_QUERIES,
  payload: payload
});

export const handleErrorResponse = err => ({
  type: actionTypes.HANDLE_ERROR_RESPONSE,
  payload: err
});

export const handleSuccessResponse = () => ({
  type: actionTypes.HANDLE_SUCCESS_RESPONSE,
  payload: 'Handled Successfully'
});

export const addNewQuery = (payload) => ({
  type: actionTypes.ADD_QUERY_TO_QUERY_LIST,
  payload: payload
});

export const updateQueryFromList = (payload) => ({
  type: actionTypes.UPDATE_QUERY_FROM_LIST,
  payload: payload
});

export const removeQueryFromList = (payload) => ({
  type: actionTypes.REMOVE_QUERY_FROM_QUERY_LIST,
  payload: payload
});

export const getUserQueries = () => async (dispatch) => {
  try {
    const data = await apiMethods.queries.getUserQueries();
    dispatch(handleUserQueries(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const createQuery = body => async (dispatch) => {
  try {
    const data = await apiMethods.queries.create(body);
    dispatch(addNewQuery(data))
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const updateQuery = query => async (dispatch) => {
  try {
    await apiMethods.queries.update(query);
    dispatch(updateQueryFromList(query));
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const removeQuery = query => async (dispatch) => {
  try {
    await apiMethods.queries.remove(query.id);
    dispatch(removeQueryFromList(query));
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};
