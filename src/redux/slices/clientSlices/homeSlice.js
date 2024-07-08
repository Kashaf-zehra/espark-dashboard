import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchClientHomeDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchClientHomeDataRequestSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
    fetchClientHomeDataRequestFailed: (state) => {
      state.isLoading = false;
    },
    removeClientHomeData: (state) => {
      state.data = {};
    },
    updateClientImage: (state, action) => {
      state.data.client_image = action.payload;
    },
  },
});

export const {
  fetchClientHomeDataRequest,
  fetchClientHomeDataRequestSuccess,
  fetchClientHomeDataRequestFailed,
  removeClientHomeData,
  updateClientImage,
} = homeSlice.actions;
export default homeSlice.reducer;
