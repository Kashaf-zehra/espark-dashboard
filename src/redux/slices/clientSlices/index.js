import { combineReducers } from 'redux';
import hiringProgressSlice from './hiringProgressSlice';
import homeSlice from './homeSlice';
import invoicePaymentsSlice from './invoicePaymentsSlice';
import policiesSlice from './policiesSlice';
import teamMembersSlice from './teamMembersSlice';
import timeOffSlice from './timeOffSlice';
import timeTrackingSlice from './timeTrackingSlice';
import contratSignedSlice from './contratSignedSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'home',
  storage,
  whitelist: ['home'],
};

const clientReducer = persistReducer(
  persistConfig,
  combineReducers({
    hiringProgress: hiringProgressSlice,
    home: homeSlice,
    teamMembers: teamMembersSlice,
    timeOff: timeOffSlice,
    timeTracking: timeTrackingSlice,
    invoicePayments: invoicePaymentsSlice,
    policies: policiesSlice,
    contract: contratSignedSlice,
  })
);

// const clientReducer = combineReducers({
//   hiringProgress: hiringProgressSlice,
//   home: homeSlice,
//   teamMembers: teamMembersSlice,
//   timeOff: timeOffSlice,
//   timeTracking: timeTrackingSlice,
//   invoicePayments: invoicePaymentsSlice,
//   policies: policiesSlice,
//   contract: contratSignedSlice,
// });

export { clientReducer };
