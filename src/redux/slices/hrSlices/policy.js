import { createSlice } from '@reduxjs/toolkit';

const policySlice = createSlice({
  name: 'policySlice',
  initialState: {
    policies: [],
  },
  reducers: {
    getPolicyData: (state, action) => {
      state.policies = action.payload;
    },
    removePolicy: (state, action) => {
      const tempData = state?.policies?.filter(
        (el) => el.id !== action.payload
      );
      state.policies = tempData;
    },
    addPolicy: (state, action) => {
      console.log({ paylaod: action.payload });
      state.policies = [...state.policies, action.payload];
    },
    updatePolicyValue: (state, action) => {
      const policyIndex = state.policies.findIndex(
        (el) => el.id === action.payload.id
      );
      state.policies[policyIndex][action.payload.key] = [
        'DisabledCheck',
        'EnabledCheck',
        action.payload.value,
      ];
    },
  },
});

export const { getPolicyData, updatePolicyValue, addPolicy, removePolicy } =
  policySlice.actions;
export default policySlice.reducer;
