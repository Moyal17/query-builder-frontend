import { actionTypes } from '../actions/actionTypes';


const initialState = {
  authorised: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_CREDENTIALS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default appReducer;
