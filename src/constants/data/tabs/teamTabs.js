import { a11yProps } from '@/src/utils/tabs';
import { teamMembersColumn, teamMembersData } from '../tables/teamMembers';

export const teamTabs = [
  {
    label: 'All',
    prop: a11yProps(0),
    data: teamMembersData,
    column: teamMembersColumn,
  },
  {
    label: 'Active',
    prop: a11yProps(1),
    data: teamMembersData,
    column: teamMembersColumn,
  },
  {
    label: 'Onboard',
    prop: a11yProps(2),
    data: teamMembersData,
    column: teamMembersColumn,
  },
  {
    label: 'Terminated',
    prop: a11yProps(3),
    data: teamMembersData,
    column: teamMembersColumn,
  },
];
