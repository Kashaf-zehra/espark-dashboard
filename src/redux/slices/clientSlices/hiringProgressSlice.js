import { createSlice } from '@reduxjs/toolkit';

const hiringProgressSlice = createSlice({
  name: 'hiringProgressSlice',
  initialState: {
    data: {
      hiringRequests: [],
      interviewSchedule: [],
      onBoarding: [],
    },
    isLoading: false,
  },
  reducers: {
    fetchClientHiringRequests: (state) => {
      state.isLoading = true;
    },
    fetchClientHiringRequestsSuccess: (state, action) => {
      state.data.hiringRequests = action?.payload;
      state.isLoading = false;
    },
    fetchClientHiringRequestsFailed: (state) => {
      state.isLoading = false;
    },
    fetchClientInterviewSchedules: (state) => {
      state.isLoading = true;
    },
    fetchClientInterviewSchedulesSuccess: (state, action) => {
      state.data.interviewSchedule = action?.payload;
      state.isLoading = false;
    },
    fetchClientInterviewSchedulesFailed: (state) => {
      state.isLoading = false;
    },
    fetchClientOnboarding: (state) => {
      state.isLoading = true;
    },
    fetchClientOnboardingSuccess: (state, action) => {
      state.data.onBoarding = action?.payload;
      state.isLoading = false;
    },
    fetchClientOnboardingFailed: (state) => {
      state.isLoading = false;
    },
    createClientHiringRequest: (state) => {
      state.isLoading = true;
    },
    createClientHiringRequestSuccess: (state, action) => {
      state.data.hiringRequests = [
        ...state.data.hiringRequests,
        action?.payload,
      ];
      state.isLoading = false;
    },
    createClientHiringRequestFailed: (state) => {
      state.isLoading = false;
    },
    deleteClientHiringRequest: (state) => {
      state.isLoading = true;
    },
    deleteClientHiringRequestSuccess: (state, action) => {
      const tempData = state?.data?.hiringRequests.filter(
        (el) => el.id !== action.payload
      );
      state.data.hiringRequests = tempData;
      state.isLoading = false;
    },
    deleteClientHiringRequestFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  fetchClientHiringRequests,
  fetchClientHiringRequestsSuccess,
  fetchClientHiringRequestsFailed,
  fetchClientInterviewSchedules,
  fetchClientInterviewSchedulesSuccess,
  fetchClientInterviewSchedulesFailed,
  fetchClientOnboarding,
  fetchClientOnboardingSuccess,
  fetchClientOnboardingFailed,
  createClientHiringRequest,
  createClientHiringRequestSuccess,
  createClientHiringRequestFailed,
  deleteClientHiringRequest,
  deleteClientHiringRequestSuccess,
  deleteClientHiringRequestFailed,
} = hiringProgressSlice.actions;
export default hiringProgressSlice.reducer;
