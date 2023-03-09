import localStorage from 'local-storage';
import { apiMethods, publicClientConfig } from '../../services/apiService';
import actionTypes from '../actions/actionTypes';
import { handleErrorResponse } from './index';

export const saveUserCredentials = (data) => {
  if (data.token) {
    publicClientConfig.headers.Authorization = data.token;
    localStorage.set('qb-token', data.token);
  }
  return {
    type: actionTypes.SAVE_USER_CREDENTIALS,
    payload: data
  };
};

export const saveUserData = (data) => {
  return {
    type: actionTypes.SAVE_USER_CREDENTIALS,
    payload: data
  };
};


export const checkIfLoggedIn = () => async (dispatch) => {
  try {
    const data = await apiMethods.users.checkIfLoggedIn();
    dispatch(saveUserData(data));
    return data;
  } catch (e) {
    console.log('error', e);
    return false;
  }
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

