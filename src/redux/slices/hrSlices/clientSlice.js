import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState: {
    clients: [],
    currentClient: {},
    addClientForm: {},
    currentClientData: {
      hireAndOnBoard: {
        hiringRequest: [],
        interviewSchedule: [],
        onBoarding: [],
      },
      employees: {
        all: [],
      },
      employeeInvoices: {
        pending: [],
        processing: [],
        paid: [],
      },
      otherInvoices: {
        pending: [],
        processing: [],
        paid: [],
      },
    },
    isLoading: false,
    isLoadingClientEmployees: false,
    outsourceableEmployees: [],
    currentEmpToAddInClient: null,
  },
  reducers: {
    getClientsData: (state, action) => {
      state.clients = action.payload;
    },
    updateClientStatus: (state, action) => {
      const clientIndex = state.clients.findIndex(
        (el) => el.id === action.payload
      );
      state.clients[clientIndex].active = !state.clients[clientIndex].active;
    },
    deleteClient: (state, action) => {
      const tempData = state?.clients.filter((el) => el.id !== action.payload);
      state.clients = tempData;
    },
    getCurrentClientData: (state) => {
      state.isLoading = true;
    },
    getCurrentClientDataSuccess: (state, action) => {
      state.currentClient = action.payload;
      state.isLoading = false;
    },
    getCurrentClientDataFailed: (state) => {
      state.isLoading = false;
    },
    addClientFormData: (state, action) => {
      state.addClientForm = {
        ...state.addClientForm,
        ...action.payload,
      };
    },
    getClientHiringRequest: (state, action) => {
      state.currentClientData.hireAndOnBoard.hiringRequest = action.payload;
    },
    getClientInterviewSchedule: (state, action) => {
      state.currentClientData.hireAndOnBoard.interviewSchedule = action.payload;
    },
    getClientOnboarding: (state, action) => {
      state.currentClientData.hireAndOnBoard.onBoarding = action.payload;
    },
    getClientEmpInvoicePending: (state, action) => {
      state.currentClientData.employeeInvoices.pending = action.payload;
    },
    getClientEmpInvoiceProcessing: (state, action) => {
      state.currentClientData.employeeInvoices.processing = action.payload;
    },
    getClientEmpInvoicePaid: (state, action) => {
      state.currentClientData.employeeInvoices.paid = action.payload;
    },
    getClientOthInvoicePending: (state, action) => {
      state.currentClientData.otherInvoices.pending = action.payload;
    },
    getClientOthInvoiceProcessing: (state, action) => {
      state.currentClientData.otherInvoices.processing = action.payload;
    },
    getClientOthInvoicePaid: (state, action) => {
      state.currentClientData.otherInvoices.paid = action.payload;
    },
    getOutsourceableEmps: (state, action) => {
      state.outsourceableEmployees = action.payload;
    },
    selectEmployeeToAdd: (state, action) => {
      state.currentEmpToAddInClient = action.payload;
    },
    deleteHiringRequest: (state, action) => {
      const tempData =
        state?.currentClientData?.hireAndOnBoard?.hiringRequest.filter(
          (el) => el.id !== action.payload
        );
      state.currentClientData.hireAndOnBoard.hiringRequest = tempData;
    },
    deleteInterSchedule: (state, action) => {
      const tempData =
        state?.currentClientData?.hireAndOnBoard?.interviewSchedule.filter(
          (el) => el.id !== action.payload
        );
      state.currentClientData.hireAndOnBoard.interviewSchedule = tempData;
    },
    deleteOnBoarding: (state, action) => {
      const tempData =
        state?.currentClientData?.hireAndOnBoard?.onBoarding.filter(
          (el) => el.id !== action.payload
        );
      console.log({ tempData, id: action.payload });
      state.currentClientData.hireAndOnBoard.onBoarding = tempData;
    },
    deleteEmpInv: (state, action) => {
      const type = action.payload.type;
      const tempData = state?.currentClientData?.employeeInvoices?.[
        type
      ].filter((el) => el.id !== action.payload.id);
      console.log({ tempData, id: action.payload });
      state.currentClientData.employeeInvoices[type] = tempData;
    },
    deleteOthInv: (state, action) => {
      const type = action.payload.type;
      const tempData = state?.currentClientData?.otherInvoices?.[type].filter(
        (el) => el.id !== action.payload.id
      );
      console.log({ tempData, id: action.payload });
      state.currentClientData.otherInvoices[type] = tempData;
    },
    updateOthInv: (state, action) => {
      const currentType = action.payload.currentVal.toLowerCase();
      const newType = action.payload.newVal.toLowerCase();
      const tempDataOld = state?.currentClientData?.otherInvoices?.[
        currentType
      ].filter((el) => el.id !== action.payload.id);
      console.log({
        tempDataOld,
        currentType,
        newType,
        data: action.payload.data,
      });
      state.currentClientData.otherInvoices[currentType] = tempDataOld;
      state.currentClientData.otherInvoices[newType] = [
        ...state.currentClientData.otherInvoices[newType],
        {
          ...action.payload.data,
          payment_status: action.payload.newVal,
        },
      ];
    },
    updateEmpInv: (state, action) => {
      const currentType = action.payload.currentVal.toLowerCase();
      const newType = action.payload.newVal.toLowerCase();
      const tempDataOld = state?.currentClientData?.employeeInvoices?.[
        currentType
      ].filter((el) => el.id !== action.payload.id);
      console.log({
        tempDataOld,
        currentType,
        newType,
        data: action.payload.data,
      });
      state.currentClientData.employeeInvoices[currentType] = tempDataOld;
      state.currentClientData.employeeInvoices[newType] = [
        ...state.currentClientData.employeeInvoices[newType],
        {
          ...action.payload.data,
          payment_status: action.payload.newVal,
        },
      ];
    },
    addHiringRequest: (state, action) => {
      state.currentClientData.hireAndOnBoard.hiringRequest = [
        ...state.currentClientData.hireAndOnBoard.hiringRequest,
        action.payload,
      ];
    },
    addInterviewSchedule: (state, action) => {
      state.currentClientData.hireAndOnBoard.interviewSchedule = [
        ...state.currentClientData.hireAndOnBoard.interviewSchedule,
        action.payload,
      ];
    },
    addOnBoard: (state, action) => {
      state.currentClientData.hireAndOnBoard.onBoarding = [
        ...state.currentClientData.hireAndOnBoard.onBoarding,
        action.payload,
      ];
    },
    addEmpInvoice: (state, action) => {
      console.log({ action });
      state.currentClientData.employeeInvoices[action.payload.type] = [
        ...state.currentClientData.employeeInvoices[action.payload.type],
        action.payload.data,
      ];
    },
    addOthInvoice: (state, action) => {
      console.log({ action });
      state.currentClientData.otherInvoices[action.payload.type] = [
        ...state.currentClientData.otherInvoices[action.payload.type],
        action.payload.data,
      ];
    },
    getClientAllEmpsRequest: (state) => {
      state.isLoadingClientEmployees = true;
    },
    getClientAllEmps: (state, action) => {
      state.currentClientData.employees.all = action.payload;
      state.isLoadingClientEmployees = false;
    },
    updateClientEmpStatus: (state, action) => {
      const empIndex = state.currentClientData.employees.all.findIndex(
        (el) => el.id === action.payload.id
      );
      state.currentClientData.employees.all[empIndex] = {
        ...state.currentClientData.employees.all[empIndex],
        status: action.payload.status,
      };
    },
    updateCurrentClientImage: (state, action) => {
      console.log({ currClient: action.payload });
      state.currentClient.image_path = action.payload;
    },
    removeHrClientData: (state) => {
      state.clients = [];
      state.currentClient = {};
      state.addClientForm = {};
      state.currentClientData = {
        hireAndOnBoard: {
          hiringRequest: [],
          interviewSchedule: [],
          onBoarding: [],
        },
        employees: {
          all: [],
        },
        employeeInvoices: {
          pending: [],
          processing: [],
          paid: [],
        },
        otherInvoices: {
          pending: [],
          processing: [],
          paid: [],
        },
      };
      state.isLoading = false;
      state.isLoadingClientEmployees = false;
      state.outsourceableEmployees = [];
      state.currentEmpToAddInClient = null;
    },
    removeActiveClientAndData: (state) => {
      state.currentClient = {};
      state.currentClientData = {
        hireAndOnBoard: {
          hiringRequest: [],
          interviewSchedule: [],
          onBoarding: [],
        },
        employees: {
          all: [],
        },
        employeeInvoices: {
          pending: [],
          processing: [],
          paid: [],
        },
        otherInvoices: {
          pending: [],
          processing: [],
          paid: [],
        },
      };
    },
    removeClientFormData: (state) => {
      state.addClientForm = {};
    },
  },
});

export const {
  getClientsData,
  updateClientStatus,
  getCurrentClientData,
  getCurrentClientDataSuccess,
  getCurrentClientDataFailed,
  addClientFormData,
  getClientHiringRequest,
  getClientInterviewSchedule,
  getClientOnboarding,
  getClientEmpInvoicePending,
  getClientEmpInvoiceProcessing,
  getClientEmpInvoicePaid,
  getClientOthInvoicePending,
  getClientOthInvoiceProcessing,
  getClientOthInvoicePaid,
  getOutsourceableEmps,
  selectEmployeeToAdd,
  deleteHiringRequest,
  deleteInterSchedule,
  deleteOnBoarding,
  deleteEmpInv,
  deleteOthInv,
  updateOthInv,
  updateEmpInv,
  addHiringRequest,
  addInterviewSchedule,
  addOnBoard,
  addEmpInvoice,
  addOthInvoice,
  getClientAllEmps,
  updateClientEmpStatus,
  getClientAllEmpsRequest,
  updateCurrentClientImage,
  removeHrClientData,
  deleteClient,
  removeActiveClientAndData,
  removeClientFormData,
} = clientSlice.actions;
export default clientSlice.reducer;
