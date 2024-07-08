import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import EmployeeId from './employeeDetails';
import EmployeeName from './employeeName';

const EmployeeData = () => {
  return (
    <>
      <Box>
        <Image src="/images/attendance/avatar.svg" width={176} height={176} />
      </Box>
      <Box sx={{ width: '40%' }}>
        <EmployeeId />
      </Box>
      <Box sx={{ width: '40%' }}>
        <EmployeeName />
      </Box>
      <br />
    </>
  );
};
export default EmployeeData;
