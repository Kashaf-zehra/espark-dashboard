import React from 'react';
import { Box, Typography } from '@mui/material';

import { ATTENDANCE_DATA } from '@/src/constants/attendanceView';

const AttendanceHeading = () => {
  return (
    <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
        }}
      >
        {ATTENDANCE_DATA.attendanceView}
      </Typography>
    </Box>
  );
};
export default AttendanceHeading;
