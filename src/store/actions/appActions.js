import React from 'react';
import { actionTypes } from './actionTypes';
import { apiMethods } from '../../services/apiService';


export const handleErrorResponse = err => ({
  type: actionTypes.HANDLE_ERROR_RESPONSE,
  payload: err
});

export const handleSuccessResponse = () => ({
  type: actionTypes.HANDLE_SUCCESS_RESPONSE,
  payload: 'Handled Successfully'
});


export const getCategoryByPublicId = body => async (dispatch) => {
  try {
    const data = await apiMethods.categories.getCategory(body);
    dispatch(handleSuccessResponse(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const createCategory = body => async (dispatch) => {
  try {
    const data = await apiMethods.categories.create(body);
    dispatch(handleSuccessResponse(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const editCategory = body => async (dispatch) => {
  try {
    const data = await apiMethods.categories.edit(body);
    dispatch(handleSuccessResponse(data));
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};

export const removeCategory = publicId => async (dispatch) => {
  try {
    return await apiMethods.categories.remove([publicId]);
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};
