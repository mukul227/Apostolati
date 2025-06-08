import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import userSlicer from "../slices/userSlicer";
import homeSlicer from "../slices/homeSlicer";

const rootReducer = combineReducers({
  auth: userSlicer,
  homeStore: homeSlicer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
