import React from 'react';
import { Box, Typography } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import LeaveDay from './leaveDay';

const LeaveDuration = ({ employeeId, employeeName, fromTo }) => {
  return (
    <Box
      sx={{
        marginTop: '14px',
        marginBottom: '14px',
        border: '1px solid #E4E4E4',
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            background: '#F6F6F6',
            border: '1px solid #E4E4E4',
            p: 1.5,
            width: '260px',
          }}
        >
          <Typography>{fromTo}</Typography>
        </Box>
        <Box
          sx={{
            background: '#F6F6F6',
            border: '1px solid #E4E4E4',
            p: 1.5,
            width: '700px',
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>
            {REQUESTVIEW_DATA.leaveweek}
          </Typography>
        </Box>
      </Box>
      <LeaveDay employeeId={employeeId} employeeName={employeeName} />
    </Box>
  );
};
export default LeaveDuration;
