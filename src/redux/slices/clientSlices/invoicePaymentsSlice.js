import { createSlice } from '@reduxjs/toolkit';

const invoiceTrackingSlice = createSlice({
  name: 'invoiceTrackingSlice',
  initialState: {
    data: {
      pending: [],
      processing: [],
      paid: [],
    },
    otherInvoicesData: {
      pending: [],
      processing: [],
      paid: [],
    },
    otherInvoices: [],
    isLoading: false,
  },
  reducers: {
    updateEmpInvStatus: (state, action) => {
      const currentType = action.payload.currentVal.toLowerCase();
      const newType = action.payload.newVal.toLowerCase();
      const tempDataOld = state?.data?.[currentType].filter(
        (el) => el.id !== action.payload.id
      );
      // console.log({
      //   tempDataOld,
      //   currentType,
      //   newType,
      //   data: action.payload.data,
      // });
      state.data[currentType] = tempDataOld;
      state.data[newType] = [
        ...state.data[newType],
        {
          ...action.payload.data,
          payment_status: action.payload.newVal,
        },
      ];
    },
    fetchPendingInvoicePaymentsRequest: (state) => {
      state.isLoading = true;
    },
    fetchPendingInvoicePaymentsRequestSuccess: (state, action) => {
      state.data.pending = action?.payload;
      state.isLoading = false;
    },
    fetchPendingInvoicePaymentsRequestFailed: (state) => {
      state.isLoading = false;
    },
    fetchProcessingInvoicePaymentsRequest: (state) => {
      state.isLoading = true;
    },
    fetchProcessingInvoicePaymentsRequestSuccess: (state, action) => {
      state.data.processing = action?.payload;
      state.isLoading = false;
    },
    fetchProcessingInvoicePaymentsRequestFailed: (state) => {
      state.isLoading = false;
    },
    fetchPaidInvoicePaymentsRequest: (state) => {
      state.isLoading = true;
    },
    fetchPaidInvoicePaymentsRequestSuccess: (state, action) => {
      state.data.paid = action?.payload;
      state.isLoading = false;
    },
    fetchPaidInvoicePaymentsRequestFailed: (state) => {
      state.isLoading = false;
    },
    fetchOtherPendingInvoicePaymentsRequestSuccess: (state, action) => {
      console.log({ pendingSlice: action.payload });
      state.otherInvoicesData.pending = action?.payload;
      state.isLoading = false;
    },
    fetchOtherProcessingInvoicePaymentsRequestSuccess: (state, action) => {
      console.log({ processingSlice: action.payload });
      state.otherInvoicesData.processing = action?.payload;
      state.isLoading = false;
    },
    fetchOtherPaidInvoicePaymentsRequestSuccess: (state, action) => {
      console.log({ paidSlice: action.payload });
      state.otherInvoicesData.paid = action?.payload;
      state.isLoading = false;
    },
    fetchOtherInvoicesData: (state, action) => {
      state.otherInvoices = [...state.otherInvoices, ...action.payload];
    },
  },
});

export const {
  fetchPendingInvoicePaymentsRequest,
  fetchPendingInvoicePaymentsRequestSuccess,
  fetchPendingInvoicePaymentsRequestFailed,
  fetchProcessingInvoicePaymentsRequest,
  fetchProcessingInvoicePaymentsRequestSuccess,
  fetchProcessingInvoicePaymentsRequestFailed,
  fetchPaidInvoicePaymentsRequest,
  fetchPaidInvoicePaymentsRequestSuccess,
  fetchPaidInvoicePaymentsRequestFailed,
  fetchOtherPendingInvoicePaymentsRequest,
  fetchOtherPendingInvoicePaymentsRequestSuccess,
  fetchOtherPendingInvoicePaymentsRequestFailed,
  fetchOtherProcessingInvoicePaymentsRequest,
  fetchOtherProcessingInvoicePaymentsRequestSuccess,
  fetchOtherProcessingInvoicePaymentsRequestFailed,
  fetchOtherPaidInvoicePaymentsRequest,
  fetchOtherPaidInvoicePaymentsRequestSuccess,
  fetchOtherPaidInvoicePaymentsRequestFailed,
  fetchOtherInvoicesData,
  updateEmpInvStatus,
} = invoiceTrackingSlice.actions;
export default invoiceTrackingSlice.reducer;
