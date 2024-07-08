import * as Yup from 'yup';
import {
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from './validations';

export const basicInformationSchemaClient = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  address: Yup.string().required('Address is required'),
  join_date: dojValidation,
  phone_number: phoneValidation,
  email: emailValidation,
  image: Yup.mixed().required('Image is required'),
  company_name: Yup.string().required('Company name is required'),
  country: Yup.mixed().required('Country is required'),
});
export const securitySchemaClient = Yup.object({
  client_id: Yup.string().required('Client id is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
