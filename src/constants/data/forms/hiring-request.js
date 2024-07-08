import { jobTitles } from '../dropdown.js/startHiring';

export const hringRequestForm = [
  {
    title: 'Job title',
    placeholder: 'Select job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'job_title',
  },
  {
    title: 'Role type',
    placeholder: 'Select role',
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
    title: 'Country',
    placeholder: 'Pakistan',
    name: 'country',
  },
  {
    title: 'Salary range',
    placeholder: 'Enter first name',
    name: 'salary_range',
    type: 'input-range',
    fields: [
      {
        placeholder: '0.00',
        name: 'minimum',
        suffixIcon: '$',
      },
      {
        placeholder: '0.00',
        name: 'maximum',
        suffixIcon: '$',
      },
    ],
  },

  {
    title: 'Employment term',
    placeholder: 'Select employment term',
    name: 'employment_term',
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
  },
  {
    title: 'Hiring start date',
    placeholder: 'DD/MM/YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiring_start_date',
  },
  {
    title: 'Hiring end date',
    placeholder: 'DD/MM/YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiring_end_date',
  },
];
