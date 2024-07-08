import * as Yup from 'yup';
import { dojValidation, nameValidation } from './validations';

export const addOnboardFormSchema = Yup.object({
  employee_name: nameValidation,
  gender: Yup.string().required('Gender is required'),
  job_title: Yup.string().required('Job title is required'),
  role_type: Yup.string().required('Role type is Required'),
  employment_term: Yup.string().required('Employement term is required'),
  joining_date: dojValidation,
  country: Yup.string().required('Country is required'),
  notice_period: Yup.string().required('Notice period is Required'),
  salary: Yup.string().required('Salary is required'),
  benefits: Yup.mixed(),
});
