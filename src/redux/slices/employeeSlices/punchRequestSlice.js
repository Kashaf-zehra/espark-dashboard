import { createSlice } from '@reduxjs/toolkit';

const punchRequestSlice = createSlice({
  name: 'punchRequestSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchEmpPunchRequestData: (state) => {
      state.isLoading = true;
    },
    getEmpPunchRequestDataSuccess: (state, action) => {
      state.data = { ...action.payload };
      state.isLoading = false;
    },
    getEmpPunchRequestDataFailed: (state) => {
      state.isLoading = false;
    },
    deleteEmpPunchRequest: (state) => {
      state.isLoading = true;
    },
    deleteEmpPunchRequestSuccess: (state, action) => {
      const tempData = state?.data?.requests.filter(
        (el) => el.id !== action.payload
      );
      state.data.requests = tempData;
      state.isLoading = false;
    },
    deletePunchRequestDataFailed: (state) => {
      state.isLoading = false;
    },
    createEmpPunchRequest: (state) => {
      state.isLoading = true;
    },
    createEmpPunchRequestSuccess: (state, action) => {
      state.data.requests = [...state.data.requests, action.payload];
      state.isLoading = false;
    },
    createEmpPunchRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getEmpPunchRequestDataSuccess,
  fetchEmpPunchRequestData,
  getEmpPunchRequestDataFailed,
  deleteEmpPunchRequest,
  deleteEmpPunchRequestSuccess,
  deletePunchRequestDataFailed,
  createEmpPunchRequest,
  createEmpPunchRequestSuccess,
  createEmpPunchRequestFailed,
} = punchRequestSlice.actions;
export default punchRequestSlice.reducer;
