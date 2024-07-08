import { createSlice } from '@reduxjs/toolkit';

const timeOffSlice = createSlice({
  name: 'timeOffSlice',
  initialState: {
    data: {
      leaveRequest: [],
      leaveBalance: [],
      clockInOutRequests: [],
    },
    tabData: {
      currentReqTypeTab: 'Leave Requests',
      currentReqTypeTabVal: 0,
      currentReqStatusTab: 'All',
      currentReqStatusTabVal: 0,
      isLoadingTimeOff: false,
      isLoadingLeaveRequest: false,
      isLoadingLeaveBalance: false,
    },
  },
  reducers: {
    fetchTimeOffRequest: (state) => {
      state.isLoadingTimeOff = true;
    },
    fetchTimeOffRequestSuccess: (state, action) => {
      state.data.clockInOutRequests = action?.payload;
      state.isLoadingTimeOff = false;
    },
    updateTimeOffRequests: (state, action) => {
      const requestIndex = state.data.clockInOutRequests.findIndex(
        (el) => el.id === action.payload.id
      );
      state.data.clockInOutRequests[requestIndex].actions = ['View'];
      state.data.clockInOutRequests[requestIndex].status =
        action.payload.status;
    },
    fetchTimeOffRequestFailed: (state) => {
      state.isLoadingTimeOff = false;
    },
    fetchLeaveRequests: (state) => {
      state.isLoadingLeaveRequest = true;
    },
    fetchLeaveRequestsSuccess: (state, action) => {
      state.data.leaveRequest = action?.payload;
      state.isLoadingLeaveRequest = false;
    },
    updateLeaveRequest: (state, action) => {
      const requestIndex = state.data.leaveRequest.findIndex(
        (el) => el.id === action.payload.id
      );
      state.data.leaveRequest[requestIndex].actions = ['View'];
      state.data.leaveRequest[requestIndex].status = action.payload.status;
    },
    fetchLeaveRequestsFailed: (state) => {
      state.isLoadingLeaveRequest = false;
    },
    fetchLeaveBalanceRequest: (state) => {
      state.isLoadingLeaveBalance = true;
    },
    fetchLeaveBalanceRequestSuccess: (state, action) => {
      state.data.leaveBalance = action?.payload;
      state.isLoadingLeaveBalance = false;
    },
    fetchLeaveBalanceRequestFailed: (state) => {
      state.isLoadingLeaveBalance = false;
    },
    updateCurrentReqTypeTab: (state, action) => {
      state.tabData.currentReqTypeTab = action.payload.tab;
      state.tabData.currentReqTypeTabVal = action.payload.val;
    },
    updateCurrentReqStatusTab: (state, action) => {
      state.tabData.currentReqStatusTab = action.payload.tab;
      state.tabData.currentReqStatusTabVal = action.payload.val;
    },
  },
});

export const {
  fetchTimeOffRequest,
  fetchTimeOffRequestSuccess,
  fetchTimeOffRequestFailed,
  fetchLeaveRequests,
  fetchLeaveRequestsSuccess,
  fetchLeaveRequestsFailed,
  fetchLeaveBalanceRequest,
  fetchLeaveBalanceRequestSuccess,
  fetchLeaveBalanceRequestFailed,
  updateCurrentReqTypeTab,
  updateCurrentReqStatusTab,
  updateLeaveRequest,
  updateTimeOffRequests,
} = timeOffSlice.actions;
export default timeOffSlice.reducer;
