import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  HANDLE_DIMENSION_CHANGE,
} from "./actionTypes.js";

export const handleDimensionChange = (key, value) => {
  console.log(value, "handleDimensionChange");
  return {
    type: HANDLE_DIMENSION_CHANGE,
    key: key,
    value: value,
  };
};
