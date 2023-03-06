import actionTypes from '../actions/actionTypes';
import { apiMethods }  from '../../services/apiService';


export const handleUserQueries = err => ({
  type: actionTypes.HANDLE_USER_QUERIES,
  payload: err
});

export const handleErrorResponse = err => ({
  type: actionTypes.HANDLE_ERROR_RESPONSE,
  payload: err
});

export const handleSuccessResponse = () => ({
  type: actionTypes.HANDLE_SUCCESS_RESPONSE,
  payload: 'Handled Successfully'
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
    dispatch(handleSuccessResponse(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const editQuery = body => async (dispatch) => {
  try {
    const data = await apiMethods.queries.edit(body);
    dispatch(handleSuccessResponse(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const removeQuery = queryId => async (dispatch) => {
  try {
    return await apiMethods.queries.remove(queryId);
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};
