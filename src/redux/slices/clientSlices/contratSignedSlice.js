import { createSlice } from '@reduxjs/toolkit';

const contratSignedSlice = createSlice({
  name: 'contratSignedSlice',
  initialState: {
    data: {
      company: [],
      employee: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchClientCompanyContractRequest: (state) => {
      state.isLoading = true;
    },
    fetchClientCompanyContractRequestSuccess: (state, action) => {
      state.data.company = action?.payload;
      state.isLoading = false;
    },
    fetchClientCompanyContractRequestFailed: (state) => {
      state.isLoading = false;
    },
    fetchClientEmpContractRequest: (state) => {
      state.isLoading = true;
    },
    fetchClientEmpContractRequestSuccess: (state, action) => {
      state.data.employee = action?.payload;
      state.isLoading = false;
    },
    fetchClientEmpContractRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchClientCompanyContractRequest,
  fetchClientCompanyContractRequestSuccess,
  fetchClientCompanyContractRequestFailed,
  fetchClientEmpContractRequest,
  fetchClientEmpContractRequestSuccess,
  fetchClientEmpContractRequestFailed,
} = contratSignedSlice.actions;
export default contratSignedSlice.reducer;
