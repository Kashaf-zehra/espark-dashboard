import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: {
    companySettings: {},
    accounts: [],
    rolesDetails: [],
    passwordData: [],
    isLoadingRoleDetails: false,
  },
  reducers: {
    getCompSettingsData: (state, action) => {
      state.companySettings = action.payload;
    },
    getAccountsData: (state, action) => {
      console.log({ getData: action.payload });
      state.accounts = action.payload;
    },
    addAccount: (state, action) => {
      console.log({ addData: action.payload });
      state.accounts = [...state.accounts, action.payload];
    },
    getPasswordData: (state, action) => {
      state.passwordData = [...state.passwordData, action.payload];
    },
    deleteAccount: (state, action) => {
      const tempData = state?.accounts?.filter(
        (el) => el.id !== action.payload
      );
      state.accounts = tempData;
    },
    getRolesDetailsRequest: (state) => {
      state.isLoadingRoleDetails = true;
    },
    getRolesDetailsSuccess: (state, action) => {
      state.rolesDetails = action.payload;
      state.isLoadingRoleDetails = false;
    },
  },
});

export const {
  getCompSettingsData,
  getAccountsData,
  getRolesDetailsSuccess,
  getRolesDetailsRequest,
  deleteAccount,
  addAccount,
  getPasswordData,
} = settingsSlice.actions;
export default settingsSlice.reducer;
