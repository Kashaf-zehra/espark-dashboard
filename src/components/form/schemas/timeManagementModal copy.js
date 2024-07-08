import * as Yup from 'yup';

export const timeManagementFormSchema = Yup.object({
  checkinTime: Yup.string().required('Checkin time is required'),
  checkoutTime: Yup.string().required('Checkout time is required'),
});
