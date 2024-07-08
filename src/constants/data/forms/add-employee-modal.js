import { addEmployeModalFormSchema } from '@/src/components/form/schemas/addEmployeeModal';
import { jobTitles } from '../dropdown.js/startHiring';
import {
  addEmployeeFormTableColumn,
  addEmployeeFormTableData,
} from '../tables/hr/addEmployeeFormTable';

const form = [
  // {
  //   title: 'Employee name',
  //   placeholder: 'Enter name',
  //   name: 'employeeName',
  // },
  // {
  //   title: 'Gender',
  //   placeholder: 'Select',
  //   name: 'gender',
  //   type: 'select',
  //   options: [
  //     {
  //       label: 'Male',
  //     },
  //     {
  //       label: 'Female',
  //     },
  //   ],
  // },
  {
    title: 'Job title',
    placeholder: 'Select Job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'job_title',
  },
  {
    title: 'Role type',
    placeholder: 'Select Role',
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
    name: 'role_type',
  },
  {
    title: 'Employment term',
    placeholder: 'Select employment term',
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
    name: 'employment_term',
  },
  {
    title: 'Join date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'joining_date',
  },
  {
    title: 'Country',
    placeholder: 'Pakistan',
    name: 'country',
  },
  {
    title: 'Salary',
    placeholder: 'Enter salary',
    name: 'salary',
  },
  {
    title: 'Benefits',
    placeholder: 'Enter benefits',
    name: 'benefits',
    type: 'checkboxes',
    options: [
      {
        name: 'fuel_card',
        title: 'Fuel',
      },
      {
        name: 'medical_card',
        title: 'Medical',
      },
      {
        name: 'life_insurance_card',
        title: 'Life insurance',
      },
    ],
  },
];
export const addEmployeeModalFormSteps = [
  {
    title: 'Select employee',
    countNo: 1,
    data: addEmployeeFormTableData,
    column: addEmployeeFormTableColumn,
  },
  {
    title: 'Add employee',
    countNo: 2,
    schema: addEmployeModalFormSchema,
    form: form,
  },
];
