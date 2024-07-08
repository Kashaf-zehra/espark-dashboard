import { a11yProps } from '@/src/utils/tabs';
import {
  contractSignedColumn,
  contractSignedEmployeeColumn,
  contractSignedEmployeeData,
  contractSignedNestClientColumn,
  contractSignedNestClientData,
  contractSignedNestEmployeeColumn,
  contractSignedNestEmployeeData,
  contractSignedOffshoreColumn,
  contractSignedOffshoreData,
} from '../tables/contractSigned';

import { contractSignedData } from '../tables/hr/contractSigned';

export const contractSignedTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    data: contractSignedData,
    columns: contractSignedColumn,
  },
  {
    label: 'Employee contracts',
    prop: a11yProps(1),
    data: contractSignedEmployeeData,
    columns: contractSignedEmployeeColumn,
  },
];
export const contractHrSignedTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    nested: [
      {
        label: 'Clients',
        prop: a11yProps(0),
        data: contractSignedNestClientData,
        columns: contractSignedNestClientColumn,
      },
      {
        label: 'Employees',
        prop: a11yProps(1),
        data: contractSignedNestEmployeeData,
        columns: contractSignedNestEmployeeColumn,
      },
    ],
  },
  {
    label: 'Offshore contracts',
    prop: a11yProps(1),
    data: contractSignedOffshoreData,
    columns: contractSignedOffshoreColumn,
  },
];

export const contractSignedEmployeeTabs = [
  {
    label: 'Company contracts',
    prop: a11yProps(0),
    data: contractSignedEmployeeData,
    columns: contractSignedEmployeeColumn,
  },
  {
    label: 'Client contracts',
    prop: a11yProps(1),
    data: contractSignedData,
    columns: contractSignedColumn,
  },
];
