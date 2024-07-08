import * as Yup from 'yup';

export const empLeaveReqfilterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  status: Yup.string().required('Status is required'),
  leaveType: Yup.string().required('Leave type is required'),
  // checkinTimeFrom: Yup.string().required('Checkin start time is required'),
  // checkinTimeTo: Yup.string().required('Checkin end time is required'),
  // checkoutTimeFrom: Yup.string().required('Checkout start time is required'),
  // checkoutTimeTo: Yup.string().required('Checkout end time is required'),
});
