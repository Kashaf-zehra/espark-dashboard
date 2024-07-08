import { createSlice } from '@reduxjs/toolkit';

const contractSlice = createSlice({
  name: 'contractSlice',
  initialState: {
    contracts: {
      company: [],
      offShores: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchEmpContracts: (state) => {
      state.isLoading = true;
    },
    fetchEmpCompanyContractsSuccess: (state, action) => {
      state.contracts.company = action?.payload?.company;
      state.isLoading = false;
    },
    fetchEmpClientContractSuccess: (state, action) => {
      state.contracts.offShores = action.payload.offShores;
      state.isLoading = false;
    },
    fetchEmpContractsFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchEmpContracts,
  fetchEmpCompanyContractsSuccess,
  fetchEmpContractsFailed,
  fetchEmpClientContractSuccess,
} = contractSlice.actions;
export default contractSlice.reducer;
