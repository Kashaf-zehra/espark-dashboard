import * as Yup from 'yup';

export const contractFormSchema = Yup.object({
  contract_name: Yup.string().required('Contract name is required'),
  client_id: Yup.string().required('Client id is equired'),
  date: Yup.string().required('Date is required'),
  contract_doc: Yup.mixed().required('Contract doc is required'),
});

export const contractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string().required('Contract name is required'),
  employee_id: Yup.string().required('Employee id is required'),
  date: Yup.string().required('Date is required'),
  contract_doc: Yup.mixed().required('Contract doc is required'),
});
export const OffShContractFormHrPortalSchema = Yup.object({
  contract_name: Yup.string().required('Contract name is required'),
  employee_id: Yup.string().required('Employee id is required'),
  client_id: Yup.string().required('Client id is required'),
  date: Yup.string().required('Date is required'),
  contract_doc: Yup.mixed().required('Contract doc is required'),
});
