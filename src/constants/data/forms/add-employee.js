import {
  basicInformationSchema,
  companyDetailsSchema,
  emergencyContactSchema,
  securitySchema,
  timeAndLeaveAllotmentSchema,
} from '@/src/components/form/schemas/addEmployee';
import { jobTitles } from '../dropdown.js/startHiring';

const formElements = [
  {
    title: 'First name',
    placeholder: 'Enter first name',
    name: 'first_name',
  },
  {
    title: 'Last name',
    placeholder: 'Enter first name',
    name: 'last_name',
  },
  {
    title: 'Gender',
    placeholder: 'Select',
    name: 'gender',
    type: 'select',
    options: [
      {
        label: 'Male',
      },
      {
        label: 'Female',
      },
    ],
  },
  {
    title: 'Date of birth',
    placeholder: 'DD-MM-YYYY',
    name: 'dob',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Phone number',
    placeholder: 'Enter phone number',
    name: 'phone_number',
  },
  {
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
  },
  {
    title: 'Marital status',
    placeholder: 'Select',
    name: 'marital_status',
    type: 'select',
    options: [
      {
        label: 'Married',
      },
      {
        label: 'Single',
      },
    ],
  },
  {
    title: 'Image',
    placeholder: 'Upload image',
    name: 'image',
    prefixIcon: 'upload',
    type: 'file',
    filelabel: 'Accept .png or .jpg files only',
    accept: 'image/png, image/jpg',
  },
  {
    title: 'Emergency Contact',
    placeholder: 'Enter phone number',
    name: 'emergency_no',
  },
  {
    title: 'Upload resume',
    placeholder: 'Upload resume',
    name: 'resume',
    prefixIcon: 'upload',
    type: 'file',
    filelabel: 'Accept .pdf file only',
    accept: '.pdf',
  },
];
export const formElementsStep2 = [
  {
    label: 'Primary',
    fields: [
      {
        title: 'Name',
        placeholder: 'Enter name',
        name: 'name1',
      },
      {
        title: 'Relation',
        placeholder: 'Enter relation',
        name: 'relation1',
      },
      {
        title: 'Phone number',
        placeholder: 'Enter phone number',
        name: 'phoneNumber1',
      },
    ],
  },
  {
    label: 'Seconday',
    fields: [
      {
        title: 'Name',
        placeholder: 'Enter name',
        name: 'name2',
      },
      {
        title: 'Relation',
        placeholder: 'Enter relation',
        name: 'relation2',
      },
      {
        title: 'Phone number',
        placeholder: 'Enter phone number',
        name: 'phoneNumber2',
      },
    ],
  },
];
const formElementsStep3 = [
  {
    title: 'Join date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joining_date',
    col: 3,
  },
  {
    title: 'Role',
    placeholder: 'Select',
    type: 'select',
    options: [
      {
        label: 'Senior',
      },
      {
        label: 'Intermediate',
      },
      {
        label: 'Junior',
      },
      {
        label: 'Intern',
      },
    ],
    name: 'role',
  },
  {
    title: 'Job Title',
    placeholder: 'Select',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'job_title',
  },
  {
    title: 'Company',
    placeholder: 'Enter company',
    name: 'company',
  },
  {
    title: 'Employement terms',
    placeholder: 'Select employement terms',
    type: 'select',
    options: [
      {
        label: 'Salary based',
      },
      {
        label: 'Hourly based',
      },
      {
        label: 'Project based',
      },
    ],
    name: 'employementTerms',
  },
];
const formElementsStep4 = [
  {
    title: 'Checkin time',
    placeholder: '--:-- --',
    name: 'check_in',
    type: 'time',
    col: 6,
    suffixIcon: 'ClockIcon',
  },
  {
    title: 'Checkout time',
    placeholder: '--:-- --',
    name: 'check_out',
    type: 'time',
    col: 6,
    suffixIcon: 'ClockIcon',
  },

  {
    title: 'Casual Leaves',
    placeholder: 'Enter password',
    name: 'casual_leaves',
    // col: 3,
    type: 'add-sub-counter',
    min: 0,
    max: 8,
  },
  {
    title: 'Sick Leaves',
    placeholder: '0',
    name: 'sick_leaves',
    // col: 3,
    type: 'add-sub-counter',
    min: 0,
    max: 12,
    defaultValue: 0,
  },
  {
    title: 'Annual Leaves',
    placeholder: '0',
    name: 'annual_leaves',
    // col: 3,
    type: 'add-sub-counter',
    min: 0,
    max: 20,
    defaultValue: 0,
  },
  {
    title: 'Hajj / Umrah Leaves',
    placeholder: '0',
    name: 'hajj_leaves',
    // col: 3,
    type: 'add-sub-counter',
    min: 0,
    max: 45,
    defaultValue: 0,
  },
  {
    title:
      'Paid Leaves <span style = font-size:8px> (Excl Umrah & Hajj)</span>',
    placeholder: '0',
    name: 'paid_leaves',
    // col: 3,
    type: 'add-sub-counter',
    min: 0,
    max: 40,
    defaultValue: 0,
  },
  {
    title: 'Unpaid Leaves',
    placeholder: '0',
    name: 'unpaid_leaves',
    // col: 3,
    type: 'add-sub-counter',
    min: 0,
    max: 20,
    defaultValue: 0,
  },
];
const formElementsStep5 = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee id',
    name: 'employee_id',
  },
  {
    title: 'Password',
    placeholder: 'Enter password',
    name: 'password',
    type: 'password',
  },
  {
    title: 'Confirm password',
    placeholder: 'Confirm password',
    name: 'confirm_password',
    type: 'password',
  },
];
export const formSteps = [
  {
    title: 'Basic Information',
    countNo: 1,
    schema: basicInformationSchema,
    form: formElements,
  },
  {
    title: 'Emergency contact',
    countNo: 2,
    schema: emergencyContactSchema,
    form: formElementsStep2,
    isMultiColumn: true,
  },
  {
    title: 'Company details',
    countNo: 3,
    schema: companyDetailsSchema,
    form: formElementsStep3,
  },
  {
    title: 'Time & Leaves Allotment',
    countNo: 4,
    schema: timeAndLeaveAllotmentSchema,
    form: formElementsStep4,
  },
  {
    title: 'Security',
    countNo: 5,
    schema: securitySchema,
    form: formElementsStep5,
  },
];
