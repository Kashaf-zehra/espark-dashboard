import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    homeData: {},
    isLoading: false,
  },
  reducers: {
    getHomeData: (state, action) => {
      state.homeData = action.payload;
      state.isLoading = false;
    },
    getHomeDataRequest: (state) => {
      state.isLoading = true;
    },
    removeHrData: (state) => {
      state.homeData = {};
    },
  },
});

export const { getHomeData, getHomeDataRequest, removeHrData } =
  homeSlice.actions;
export default homeSlice.reducer;
