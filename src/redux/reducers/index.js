import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer.js";

const rootReducer = combineReducers({
  authenticationReducer: authenticationReducer,
});
export default rootReducer;
