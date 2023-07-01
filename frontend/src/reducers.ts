import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
