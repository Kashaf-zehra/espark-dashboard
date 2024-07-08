import { createSlice } from '@reduxjs/toolkit';

const contractSlice = createSlice({
  name: 'contractSlice',
  initialState: {
    companyContract: {
      clients: [],
      employees: [],
    },
    offShoreContract: [],
    isLoading: false,
  },
  reducers: {
    getClientsCompanyContractRequest: (state) => {
      state.isLoading = true;
    },
    getClientsCompanyContractRequestSuccess: (state, action) => {
      state.companyContract.clients = action.payload;
      state.isLoading = false;
    },
    getClientsCompanyContractRequestFailed: (state) => {
      state.isLoading = false;
    },
    getEmployeesCompanyContractRequest: (state) => {
      state.isLoading = true;
    },
    getEmployeesCompanyContractRequestSuccess: (state, action) => {
      state.companyContract.employees = action.payload;
      state.isLoading = false;
    },
    getEmployeesCompanyContractRequestFailed: (state) => {
      state.isLoading = false;
    },
    getOffShoreContractRequest: (state) => {
      state.isLoading = true;
    },
    getOffShoreContractRequestSuccess: (state, action) => {
      state.offShoreContract = action.payload;
      state.isLoading = false;
    },
    getOffShoreContractRequestFailed: (state) => {
      state.isLoading = false;
    },
    addClientContract: (state, action) => {
      state.companyContract.clients = [
        ...state.companyContract.clients,
        action.payload,
      ];
    },
    addCompEmpContract: (state, action) => {
      state.companyContract.clients = [
        ...state.companyContract.employees,
        action.payload,
      ];
    },
    addOffShoreContract: (state, action) => {
      state.offShoreContract = [...state.offShoreContract, action.payload];
    },
    deleteCompanyClientContractSuccess: (state, action) => {
      const tempData = state?.companyContract?.clients.filter(
        (el) => el.id !== action.payload
      );
      state.companyContract.clients = tempData;
      state.isLoading = false;
    },
  },
});

export const {
  getClientsCompanyContractRequest,
  getClientsCompanyContractRequestSuccess,
  getClientsCompanyContractRequestFailed,
  getEmployeesCompanyContractRequest,
  getEmployeesCompanyContractRequestSuccess,
  getEmployeesCompanyContractRequestFailed,
  getOffShoreContractRequest,
  getOffShoreContractRequestSuccess,
  getOffShoreContractRequestFailed,
  addClientContract,
  addOffShoreContract,
  deleteCompanyClientContractSuccess,
  addCompEmpContract,
} = contractSlice.actions;
export default contractSlice.reducer;
