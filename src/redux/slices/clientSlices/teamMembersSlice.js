import { createSlice } from '@reduxjs/toolkit';

const teamMemberSlice = createSlice({
  name: 'teamMemberSlice',
  initialState: {
    data: {
      active: [],
      onBoard: [],
      terminated: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchTeamMembersRequest: (state) => {
      state.isLoading = true;
    },
    fetchTeamMembersRequestActiveSuccess: (state, action) => {
      state.data.active = action?.payload;
      state.isLoading = false;
    },
    fetchTeamMembersRequestTerminatedSuccess: (state, action) => {
      state.data.terminated = action?.payload;
      state.isLoading = false;
    },
    fetchTeamMembersRequestOnBoardSuccess: (state, action) => {
      state.data.onBoard = action?.payload;
      state.isLoading = false;
    },
    fetchTeamMembersRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchTeamMembersRequest,
  fetchTeamMembersRequestActiveSuccess,
  fetchTeamMembersRequestFailed,
  fetchTeamMembersRequestOnBoardSuccess,
  fetchTeamMembersRequestTerminatedSuccess,
} = teamMemberSlice.actions;
export default teamMemberSlice.reducer;
