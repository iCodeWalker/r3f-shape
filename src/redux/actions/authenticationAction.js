import { SIGN_IN, SIGN_OUT, SIGN_UP } from "./actionTypes.js";

export const signIn = (value) => {
  return {
    type: SIGN_IN,
    payload: value,
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
export const signUp = () => {
  return {
    type: SIGN_UP,
  };
};
