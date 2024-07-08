import { a11yProps } from '@/src/utils/tabs';

export const paymentStatusTabs = [
  {
    label: 'Pending',
    prop: a11yProps(0),
  },
  {
    label: 'Processing',
    prop: a11yProps(1),
  },
  {
    label: 'Paid',
    prop: a11yProps(2),
  },
];
