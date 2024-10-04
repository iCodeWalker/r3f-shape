import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../actions/actionTypes.js";

const initialState = {
  isLoggedIn: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isLoggedIn: action.payload };
    case SIGN_UP:
      return !state;
    case SIGN_OUT:
      return !state;
    default:
      return state;
  }
};
export default authenticationReducer;
