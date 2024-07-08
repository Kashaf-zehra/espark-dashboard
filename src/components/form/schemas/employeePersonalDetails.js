import * as Yup from 'yup';
import { dobValidation, dojValidation, nameValidation } from './validations';

export const employeePersonalDataSchema = Yup.object({
  employee_name: nameValidation,
  employee_id: Yup.string(),
  dob: dobValidation,
  gender: Yup.string(),
  // email: Yup.string().email('Invalid email address'),
  role: Yup.string(),
  // team: Yup.string().email('Invalid email address'),
  joining_date: dojValidation,
  job_title: Yup.string(),
  marital_status: Yup.string(),
});
