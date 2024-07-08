import { a11yProps } from '@/src/utils/tabs';
// import { invoicePaymentColumn, invoicePaymentData, otherPaymentColumn, otherPaymentData } from "../../tables/paymentData";
import {
  hiringRequestColumn,
  hiringRequestData,
  interviewScheduleColumn,
  interviewScheduleData,
  onboardingColumn,
  onBoardingData,
} from '../../tables/hr/hireOnBoard';
import {
  invoicePaymentColumn,
  invoicePaymentData,
  otherPaymentColumn,
  otherPaymentData,
} from '../../tables/hr/invoices';

export const clientProfileTabs = [
  {
    label: 'Hire & onboard',
    hasNestedTabs: true,
    prop: a11yProps(0),
    nestedTabs: [
      {
        prop: a11yProps(0),
        label: 'Hiring request',
        data: hiringRequestData,
        column: hiringRequestColumn,
      },
      {
        prop: a11yProps(1),
        label: 'Interview schedule',
        data: interviewScheduleData,
        column: interviewScheduleColumn,
      },
      {
        prop: a11yProps(2),
        label: 'Onboarding',
        data: onBoardingData,
        column: onboardingColumn,
      },
    ],
    isTable: true,
  },
  {
    label: 'Employees',
    hasNestedTabs: true,
    prop: a11yProps(1),
    nestedTabs: [
      {
        prop: a11yProps(0),
        label: 'All',
      },
      {
        prop: a11yProps(1),
        label: 'Active employees',
      },
      {
        prop: a11yProps(2),
        label: 'Terminated employees',
      },
    ],
    isTable: false,
  },
  {
    label: 'Employee invoices',
    hasNestedTabs: true,
    prop: a11yProps(3),
    nestedTabs: [
      {
        prop: a11yProps(0),
        label: 'Pending',
      },
      {
        prop: a11yProps(1),
        label: 'Processing',
      },
      {
        prop: a11yProps(2),
        label: 'Paid',
      },
    ],
    isTable: true,
    data: invoicePaymentData,
    column: invoicePaymentColumn,
  },
  {
    label: 'Other invoices',
    hasNestedTabs: true,
    prop: a11yProps(4),
    nestedTabs: [
      {
        prop: a11yProps(0),
        label: 'Pending',
      },
      {
        prop: a11yProps(1),
        label: 'Processing',
      },
      {
        prop: a11yProps(2),
        label: 'Paid',
      },
    ],
    isTable: true,
    data: otherPaymentData,
    column: otherPaymentColumn,
  },
];
