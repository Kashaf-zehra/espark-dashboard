import { createSlice } from '@reduxjs/toolkit';

const timeTrackingSlice = createSlice({
  name: 'timeTrackingSlice',
  initialState: {
    data: {
      employees: [],
      time_sheet: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchTimeTrackingDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchTimeTrackingDataRequestSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
    fetchTimeTrackingDataRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchTimeTrackingDataRequest,
  fetchTimeTrackingDataRequestSuccess,
  fetchTimeTrackingDataRequestFailed,
} = timeTrackingSlice.actions;
export default timeTrackingSlice.reducer;
