import actionTypes  from './actionTypes';
import {apiMethods} from "../../services/apiService";


export const handleErrorResponse = err => ({
  type: actionTypes.HANDLE_ERROR_RESPONSE,
  payload: err
});

export const handleSuccessResponse = () => ({
  type: actionTypes.HANDLE_SUCCESS_RESPONSE,
  payload: 'Handled Successfully'
});


export const getMovies = () => async (dispatch) => {
  try {
    const data = await apiMethods.movies.getMovies();
    console.log('movies data: ', data)
    return data;
  } catch (e) {
    dispatch(handleErrorResponse(e));
    return false;
  }
};
