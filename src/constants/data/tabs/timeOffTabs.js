import { a11yProps } from '@/src/utils/tabs';

export const leaveRequestsStatusTab = [
  {
    label: 'All',
    prop: a11yProps(0),
    background: '#CDECF3',
    color: '#006C9C',
  },
  {
    label: 'Pending',
    prop: a11yProps(1),
    background: '#F6E9D0',
    color: '#CB8822',
  },
  {
    label: 'Completed',
    prop: a11yProps(2),
    background: '#D6EDE4',
    color: '#068987',
  },
  {
    label: 'Rejected',
    prop: a11yProps(3),
    background: '#FFD6D6',
    color: '#A72A45',
  },
];
export const checkInOutRequestsStatusTab = [
  {
    label: 'All',
    prop: a11yProps(0),
    background: '#CDECF3',
    color: '#006C9C',
  },
  {
    label: 'Pending',
    prop: a11yProps(1),
    background: '#F6E9D0',
    color: '#CB8822',
  },
  {
    label: 'Completed',
    prop: a11yProps(2),
    background: '#D6EDE4',
    color: '#068987',
  },
  {
    label: 'Rejected',
    prop: a11yProps(3),
    background: '#FFD6D6',
    color: '#A72A45',
  },
];
export const requestsStatusTab = [
  {
    label: 'All',
    prop: a11yProps(0),
    background: '#CDECF3',
    color: '#006C9C',
  },
  {
    label: 'Pending',
    prop: a11yProps(1),
    background: '#F6E9D0',
    color: '#CB8822',
  },
  {
    label: 'Completed',
    prop: a11yProps(2),
    background: '#D6EDE4',
    color: '#068987',
  },
  {
    label: 'Reject',
    prop: a11yProps(3),
    background: '#FFD6D6',
    color: '#A72A45',
  },
];

export const leaveRequestsTab = [
  {
    label: 'Leave Requests',
    prop: a11yProps(0),
    hasNestedTabs: true,
  },
  {
    label: 'Leave Balance',
    prop: a11yProps(1),
    hasNestedTabs: false,
  },
  {
    label: 'Clockin/out Requests',
    prop: a11yProps(2),
    hasNestedTabs: true,
  },
];
