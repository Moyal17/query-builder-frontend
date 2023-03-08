import actionTypes from '../actions/actionTypes';
import {toast} from "react-toastify";

const initialState = {
  userInfo: {},
  authenticated: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_CREDENTIALS:
      return {...state, userInfo: action.payload.user};
    case actionTypes.HANDLE_ERROR_RESPONSE: {
      toast.error('An error occurred, thats weird...', {closeOnClick: true, pauseOnHover: true});
      return {...state};
    }
    default:
      return state;
  }
};

export default userReducer;
