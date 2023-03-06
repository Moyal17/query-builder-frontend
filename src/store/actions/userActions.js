import localStorage from 'local-storage';
import { apiMethods, publicClientConfig } from '../../services/apiService';
import actionTypes from '../actions/actionTypes';
import { handleErrorResponse } from './index';

export const saveUserToken = (res) => {
  if (res.token) {
    publicClientConfig.headers.Authorization = res.token;
    localStorage.set('Aspire-auth', res.token);
  }
  return {
    type: actionTypes.HANDLE_SUCCESS_RESPONSE,
    payload: 'Handled Successfully'
  };
};

export const saveUserCredentials = (res) => {
  if (res.token) {
    publicClientConfig.headers.Authorization = res.token;
    localStorage.set('Aspire-auth', res.token);
  }
  return {
    type: actionTypes.HANDLE_SUCCESS_RESPONSE,
    payload: 'Handled Successfully'
  };
};


export const loginUser = body => async (dispatch) => {
  try {
    const data = await apiMethods.users.login(body);
    dispatch(saveUserCredentials(data));
    return data;
  } catch (e) {
    if (e.response.data) return e.response.data;
    dispatch(handleErrorResponse(e));
    return false;
  }
};


export const signUpUser = body => async (dispatch) => {
  try {
    const data = await apiMethods.users.register(body);
    dispatch(saveUserCredentials(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return e.response.data;
  }
};


export const logoutUser = body => async (dispatch) => {
  try {
    await apiMethods.users.logout(body);
    return true;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

