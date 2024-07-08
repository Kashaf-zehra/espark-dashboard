import React from 'react';
import { Box, Typography } from '@mui/material';

import { ATTENDANCE_DATA } from '@/src/constants/attendanceView';

const EmployeeName = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          background: '#F6F6F6',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Typography>{ATTENDANCE_DATA?.name}:</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          p: 1,
        }}
      >
        <Typography>{ATTENDANCE_DATA?.location}:</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          p: 1,
          background: '#F6F6F6',
        }}
      >
        <Typography>{ATTENDANCE_DATA?.department} :</Typography>
        {/* <Typography>{EMPLOYEE_DATA?.department}</Typography> */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          p: 1,
        }}
      >
        <Typography>{ATTENDANCE_DATA?.joiningDate}:</Typography>
        {/* <Typography>{EMPLOYEE_DATA?.joiningDate}</Typography> */}
      </Box>
    </>
  );
};
export default EmployeeName;
