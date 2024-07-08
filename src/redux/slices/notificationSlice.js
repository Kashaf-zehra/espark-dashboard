import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    data: [],
  },
  reducers: {
    getNotifications: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
