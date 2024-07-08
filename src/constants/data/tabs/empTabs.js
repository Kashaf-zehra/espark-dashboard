import { a11yProps } from '@/src/utils/tabs';
import {
  employeeTableDataHiringRequest,
  employeeTableDataInterviewSchedule,
  employeeTableDataOnBoarding,
  employeeTableHiringRequestColumn,
  employeeTableInterviewScheduleColumn,
  employeeTableOnboardingColumn,
} from '../tables/employee';

export const empTabs = [
  {
    label: 'Hiring Request',
    prop: a11yProps(0),
    data: employeeTableDataHiringRequest,
    column: employeeTableHiringRequestColumn,
  },
  {
    label: 'Interview Schedule',
    prop: a11yProps(1),
    data: employeeTableDataInterviewSchedule,
    column: employeeTableInterviewScheduleColumn,
  },
  {
    label: 'Onboarding',
    prop: a11yProps(2),
    data: employeeTableDataOnBoarding,
    column: employeeTableOnboardingColumn,
  },
];
