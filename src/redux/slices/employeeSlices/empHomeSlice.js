import { createSlice } from '@reduxjs/toolkit';

const empHomeSlice = createSlice({
  name: 'empHomeSlice',
  initialState: {
    homeData: {
      today_activity: {
        check_in_timer: '-',
      },
    },
    currentWorkSpace: {},
  },
  reducers: {
    getEmpHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    // getEmpHomeData: (state, action) => {
    //   state.homeData = {
    //     ...action.payload,
    //     today_activity: {
    //       ...action.payload.today_activity,
    //       check_in_timer: state?.homeData?.today_activity?.check_in_timer || '-'
    //     }
    //   };
    // },
    marKCheckin: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          // check_in: action.payload,
          check_in: action.payload?.check_in,
          // check_in_timer: action.payload?.check_in_timer,
        },
      };
    },
    markBreak: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          // break: action.payload.breakTime,
          break: action.payload,
          // break_in_sec: action.payload.breakTimeSec,
        },
      };
    },
    markResume: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          // resume: action.payload.resumeTime,
          resume: action.payload,
          // resume_in_sec: action.payload.resumeTimeSec,
        },
      };
    },
    markCheckout: (state, action) => {
      state.homeData = {
        ...state.homeData,
        today_activity: {
          ...state.homeData.today_activity,
          check_out: action.payload,
        },
      };
    },
    addCurrentWorkSpace: (state, action) => {
      state.currentWorkSpace = action.payload;
    },
  },
});

export const {
  getEmpHomeData,
  markBreak,
  markResume,
  markCheckout,
  marKCheckin,
  addCurrentWorkSpace,
} = empHomeSlice.actions;
export default empHomeSlice.reducer;
