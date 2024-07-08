import React from 'react';
import { Box, Typography } from '@mui/material';

import { ATTENDANCE_DATA, EMPLOYEE_DATA } from '@/src/constants/attendanceView';
import { leaveRequestsData } from '@/src/constants/data/tables/timeOffRequest';

const EmployeeId = () => {
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
        <Typography>{ATTENDANCE_DATA?.employeeId}:</Typography>
        <Typography>{leaveRequestsData[0]?.employeeId}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          p: 1,
        }}
      >
        <Typography>{ATTENDANCE_DATA?.company}:</Typography>
        <Typography>{EMPLOYEE_DATA?.companyName}</Typography>
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
        <Typography>{ATTENDANCE_DATA?.branch}:</Typography>
        <Typography>{EMPLOYEE_DATA?.branchName}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          p: 1,
        }}
      >
        <Typography>{ATTENDANCE_DATA?.jobTitle}:</Typography>
        {/* <Typography>{EMPLOYEE_DATA?.jobTitleName}</Typography> */}
      </Box>
    </>
  );
};
export default EmployeeId;
