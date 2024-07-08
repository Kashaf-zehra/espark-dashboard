import { createSlice } from '@reduxjs/toolkit';

const invoicesSlice = createSlice({
  name: 'invoicesSlice',
  initialState: {
    data: [],
  },
  reducers: {
    getInvoicesData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getInvoicesData } = invoicesSlice.actions;
export default invoicesSlice.reducer;
