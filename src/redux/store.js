import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index.js";

const store = configureStore({
  reducer: { rootReducer: rootReducer },
});

export default store;
