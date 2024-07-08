import * as Yup from 'yup';
import {
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from './validations';

export const editClientSchema = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  company_name: Yup.string().required('Company name is required'),
  email: emailValidation,
  phone_number: phoneValidation,
  join_date: dojValidation,
  country: Yup.mixed().required('Country is required'),
  address: Yup.string().required('Address is required'),
});
