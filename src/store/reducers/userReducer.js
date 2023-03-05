import { actionTypes } from '../actions/actionTypes';

const initialState = {
  userInfo: {},
  authenticated: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_CREDENTIALS: {
      return {
        ...state,
        userInfo: action.payload.user
      };
    }
    default:
      return state;
  }
};

export default userReducer;
