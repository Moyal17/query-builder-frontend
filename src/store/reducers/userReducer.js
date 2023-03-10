import actionTypes from '../actions/actionTypes';
import {toast} from "react-toastify";

const initialState = {
  userInfo: {},
  authorized: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_CREDENTIALS:
      return {...state, userInfo: action.payload, authorized: true};
    case actionTypes.HANDLE_ERROR_RESPONSE: {
      if (!action.payload.response.data.message) toast.error('An error occurred, thats weird...', {closeOnClick: true, pauseOnHover: true});
      return {...state};
    }
    default:
      return state;
  }
};

export default userReducer;
