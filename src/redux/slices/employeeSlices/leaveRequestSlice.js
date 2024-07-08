import { createSlice } from '@reduxjs/toolkit';

const leaveRequestSlice = createSlice({
  name: 'leaveRequestSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchEmpLeaveRequestData: (state) => {
      state.isLoading = true;
    },
    getEmpLeaveRequestDataSuccess: (state, action) => {
      state.data = { ...action.payload };
      state.isLoading = false;
    },
    getEmpLeaveRequestFilteredDataSuccess: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.isLoading = false;
    },
    getEmpLeaveRequestDataFailed: (state) => {
      state.isLoading = false;
    },
    deleteEmpLeaveRequest: (state) => {
      state.isLoading = true;
    },
    deleteEmpLeaveRequestSuccess: (state, action) => {
      const tempData = state?.data?.requests.filter(
        (el) => el.id !== action.payload
      );
      state.data.requests = tempData;
      state.isLoading = false;
    },
    deleteLeaveRequestDataFailed: (state) => {
      state.isLoading = false;
    },
    createEmpLeaveRequest: (state) => {
      state.isLoading = true;
    },
    createEmpLeaveRequestSuccess: (state, action) => {
      // const tempData = state?.data?.requests.filter((el) => el.id !== action.payload)
      const tempData = state?.data?.requests;
      tempData.push(action.payload);
      state.data.requests = tempData;
      state.isLoading = false;
    },
    createEmpLeaveRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getEmpLeaveRequestDataSuccess,
  fetchEmpLeaveRequestData,
  getEmpLeaveRequestDataFailed,
  deleteEmpLeaveRequest,
  deleteEmpLeaveRequestSuccess,
  deleteLeaveRequestDataFailed,
  createEmpLeaveRequest,
  createEmpLeaveRequestSuccess,
  createEmpLeaveRequestFailed,
  getEmpLeaveRequestFilteredDataSuccess,
} = leaveRequestSlice.actions;
export default leaveRequestSlice.reducer;
