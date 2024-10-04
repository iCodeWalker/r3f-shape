import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer.js";
import buildingReducer from "./buidlingReducer.js";

const rootReducer = combineReducers({
  authenticationReducer: authenticationReducer,
  buildingReducer: buildingReducer,
});
export default rootReducer;
