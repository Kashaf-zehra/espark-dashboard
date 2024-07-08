import { combineReducers } from 'redux';
import clientSlice from './clientSlice';
import contractSlice from './contractSlice';
import employeeSlice from './employeeSlice';
import homeSlice from './homeSlice';
import settingsSlice from './settingsSlice';
import invoicesSlice from './invoices';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import policiesSlice from './policy';

const persistConfig = {
  key: 'home',
  storage,
  whitelist: ['home', 'clients', 'employees'],
};

const hrReducer = persistReducer(
  persistConfig,
  combineReducers({
    home: homeSlice,
    clients: clientSlice,
    employees: employeeSlice,
    contracts: contractSlice,
    settings: settingsSlice,
    invoices: invoicesSlice,
    policies: policiesSlice,
  })
);

export { hrReducer };
