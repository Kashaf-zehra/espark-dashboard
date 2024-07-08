import { createSlice } from '@reduxjs/toolkit';

const empPoliciesSlice = createSlice({
  name: 'empPoliciesSlice',
  initialState: {
    data: {},
    isLoading: false,
  },
  reducers: {
    fetchEmpPoliciesDataRequest: (state) => {
      state.isLoading = true;
    },
    fetchEmpPoliciesDataRequestSuccess: (state, action) => {
      state.data = { ...action.payload };
      state.isLoading = false;
    },
    fetchEmpPoliciesDataRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchEmpPoliciesDataRequest,
  fetchEmpPoliciesDataRequestSuccess,
  fetchEmpPoliciesDataRequestFailed,
} = empPoliciesSlice.actions;
export default empPoliciesSlice.reducer;
