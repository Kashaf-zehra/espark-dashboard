import { createSlice } from '@reduxjs/toolkit';

const workSpaceMenuSlice = createSlice({
  name: 'workSpaceMenu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    handleworkSpaceMenuOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    handleworkSpaceMenuClose: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { handleworkSpaceMenuOpen, handleworkSpaceMenuClose } =
  workSpaceMenuSlice.actions;
export default workSpaceMenuSlice.reducer;
