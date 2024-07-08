import { createSlice } from '@reduxjs/toolkit';

const policiesSlice = createSlice({
  name: 'policiesSlice',
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    fetchClientPoliciesRequest: (state) => {
      state.isLoading = true;
    },
    fetchClientPoliciesRequestSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
    fetchClientPoliciesRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchClientPoliciesRequest,
  fetchClientPoliciesRequestSuccess,
  fetchClientPoliciesRequestFailed,
} = policiesSlice.actions;
export default policiesSlice.reducer;
