import * as Yup from 'yup';

export const leaveManagementFormSchema = Yup.object({
  casual_leaves: Yup.string().required('Casual leave is required'),
  sick_leaves: Yup.string().required('Sick leave is required'),
  annual_leaves: Yup.string().required('Annual leave is required'),
  hajj_leaves: Yup.string().required('Hajj leave is required'),
  paid_leaves: Yup.string().required('Paid leave is required'),
  unpaid_leaves: Yup.string().required('Unpaid leave is required'),
});
