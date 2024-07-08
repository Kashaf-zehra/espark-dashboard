import { jobTitles } from '../dropdown.js/startHiring';

export const addNewInterviewForm = [
  {
    title: 'Employee name',
    placeholder: 'Enter name',
    name: 'employee_name',
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
    title: 'Interview date & time',
    placeholder: 'DD/MM/YYYY , 00:00 PST',
    suffixIcon: 'CalendarOutline',
    type: 'date-and-time',
    name: 'interview_date_time',
  },
  {
    title: 'Country',
    placeholder: 'Pakistan',
    name: 'country',
  },
];
