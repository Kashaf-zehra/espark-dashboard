import * as Yup from 'yup';
import { dojValidation } from './validations';

export const addEmployeModalFormSchema = Yup.object({
  // employeeName: nameValidation,
  salary: Yup.string().required('Salary is required'),
  job_title: Yup.string().required('Job title is required'),
  role_type: Yup.string().required('Role type is required'),
  employment_term: Yup.string().required('Employement term is required'),
  joining_date: dojValidation,
  country: Yup.string().required('Country is required'),
  benefits: Yup.mixed(),
});
