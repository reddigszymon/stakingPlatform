import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
