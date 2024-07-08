import { jobTitles } from '../dropdown.js/startHiring';

export const HiringForm = [
  {
    title: 'Job title',
    placeholder: 'Select job',
    type: 'select',
    nested: true,
    options: jobTitles,
    name: 'jobTitle',
  },
  {
    title: 'Role',
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
    name: 'roleType',
  },
  {
    title: 'Gender',
    placeholder: 'Select gender',
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
    title: 'Employment term',
    placeholder: 'Select employment terms',
    name: 'employmentTerm',
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
    name: 'hiringStartDate',
  },
  {
    title: 'Hiring end date',
    placeholder: 'DD/MM/YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'hiringEndDate',
  },
  {
    title: 'Country',
    placeholder: 'Select',
    name: 'country',
    type: 'select',
    searchable: true,
    withFlag: true,
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
];
