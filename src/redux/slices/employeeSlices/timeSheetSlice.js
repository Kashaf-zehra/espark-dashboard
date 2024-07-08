import { createSlice } from '@reduxjs/toolkit';

const timeSheetSlice = createSlice({
  name: 'timeSheetSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    getTimeSheetData: (state) => {
      state.isLoading = true;
    },
    getTimeSheetDataSuccess: (state, action) => {
      state.data = { ...action.payload };
      state.isLoading = false;
    },
    getTimeSheetDataFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getTimeSheetData,
  getTimeSheetDataSuccess,
  getTimeSheetDataFailed,
} = timeSheetSlice.actions;
export default timeSheetSlice.reducer;
