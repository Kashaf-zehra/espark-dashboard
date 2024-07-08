import { createSlice } from '@reduxjs/toolkit';

const profileMenuSlice = createSlice({
  name: 'profileMenu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    handleProfileMenuOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    handleProfileMenuClose: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { handleProfileMenuOpen, handleProfileMenuClose } =
  profileMenuSlice.actions;
export default profileMenuSlice.reducer;
