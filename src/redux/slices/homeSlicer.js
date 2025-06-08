import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regionList: {},
};

const homeSlicer = createSlice({
  name: "home",
  initialState,
  reducers: {
    setRegionList(state, action) {
      state.regionList = action.payload;
    },
    setAllClubList(state, action) {
    state.allClubList = action.payload;
    },
  },
});

export const { setRegionList } = homeSlicer.actions;
export default homeSlicer.reducer;
