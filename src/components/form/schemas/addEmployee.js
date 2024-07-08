import * as Yup from 'yup';
import {
  dobValidation,
  dojValidation,
  emailValidation,
  nameValidation,
  phoneValidation,
} from './validations';

export const basicInformationSchema = Yup.object({
  first_name: nameValidation,
  last_name: nameValidation,
  gender: Yup.string().required('Gender is required'),
  dob: dobValidation,
  phone_number: phoneValidation,
  email: emailValidation,
  marital_status: Yup.string().required('Marital status is required'),
  image: Yup.mixed().required('Image is required'),
  emergency_no: phoneValidation,
  resume: Yup.mixed().required('Resume is required'),
});
export const emergencyContactSchema = Yup.object({
  name1: nameValidation,
  name2: nameValidation,
  relation1: Yup.string()
    .required('Relation is required')
    .matches(/^[a-zA-Z]+$/, ' name must contain only alphabetical characters'),
  relation2: Yup.string()
    .required('Relation is required')
    .matches(
      /^[a-zA-Z]+$/,
      'First name must contain only alphabetical characters'
    ),
  phoneNumber1: phoneValidation,
  phoneNumber2: phoneValidation,
});
export const companyDetailsSchema = Yup.object({
  joining_date: dojValidation,
  role: Yup.string().required('Role is required'),
  job_title: Yup.string().required('Job Title is required'),
  company: Yup.string().required('Company is required'),
  employementTerms: Yup.string().required('Employement terms is required'),
});
export const securitySchema = Yup.object({
  employee_id: Yup.string().required('Employee ID is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const timeFormatRegex =
  /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;

const customTimeValidator = Yup.string()
  .required('Required')
  .matches(timeFormatRegex, 'Invalid time format');

export const timeAndLeaveAllotmentSchema = Yup.object({
  check_in: customTimeValidator,
  check_out: customTimeValidator,
  casual_leaves: Yup.string().required('Required'),
  sick_leaves: Yup.string().required('Required'),
  annual_leaves: Yup.string().required('Required'),
  hajj_leaves: Yup.string().required('Required'),
  paid_leaves: Yup.string().required('Required'),
  unpaid_leaves: Yup.string().required('Required'),
});
