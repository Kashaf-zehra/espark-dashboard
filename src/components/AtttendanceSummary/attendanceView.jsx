import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { ATTENDANCE_DATA } from '@/src/constants/attendanceView';
import AttendanceDatePicker from './attendanceDatePicker';
import EmployeeData from './employeeData';

const AttendanceView = ({ onClose }) => {
  return (
    <>
      <Box
        sx={{
          p: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '230px',
            gap: { xs: '10px', md: '30px' },
          }}
        >
          <EmployeeData />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#F6F6F6',
            p: 1,
          }}
        >
          <Typography>{ATTENDANCE_DATA?.date}</Typography>

          <Box
            sx={{
              width: '75%',
              '@media (min-width: 900px) and (max-width: 1860px)': {
                width: '72%',
              },
            }}
          >
            <AttendanceDatePicker />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Typography sx={{ width: '130px' }}>
            {ATTENDANCE_DATA?.expectedCheckIn}
          </Typography>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '95%' }}
          >
            <TextField sx={{ width: '87%' }} type="time" />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            background: '#F6F6F6',
          }}
        >
          <Typography sx={{ width: '100px' }}>
            {ATTENDANCE_DATA?.checkInTime}
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '95%' }}
          >
            <TextField sx={{ width: '84%' }} placeholder="-" />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
          }}
        >
          <Typography sx={{ width: '140px' }}>
            {ATTENDANCE_DATA?.expectedCheckOut}
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '95%' }}
          >
            <TextField type="time" sx={{ width: '88%' }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            background: '#F6F6F6',
          }}
        >
          <Typography sx={{ width: '100px' }}>
            {ATTENDANCE_DATA?.checkTimeout}
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '95%' }}
          >
            <TextField sx={{ width: '84%' }} placeholder="-" />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px',
          }}
        >
          <Button
            variant="primary"
            sx={{
              width: '120px',
            }}
            onClick={onClose}
          >
            {ATTENDANCE_DATA?.close}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default AttendanceView;
