import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { LEAVE_DATA } from '@/src/constants/requestviewModal';

const LeaveDay = ({ employeeId, employeeName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '70px',
      }}
    >
      <Box
        sx={{
          border: '1px solid #E4E4E4',
          display: 'flex',
          gap: { xs: '0px', md: '10px' },
          justifyContent: 'center',
          alignItems: 'center',
          width: '300px',
          padding: { xs: '5px', md: '10px' },
        }}
      >
        <Image
          src="/images/leave-request/ellipse.svg"
          width={50}
          height={50}
          alt="ellipse"
        />
        <Box
          sx={{
            gap: { xs: '5px', md: '10px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '10px', md: '16px' },
              '@media (min-width: 900px) and (max-width: 1300px)': {
                fontSize: '12px',
              },
            }}
          >
            {employeeName}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '10px', md: '16px' },
              '@media (min-width: 900px) and (max-width: 1300px)': {
                fontSize: '12px',
              },
            }}
          >
            {employeeId}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          border: '1px solid #E4E4E4',
          display: 'flex',
          alignItems: 'center',
          width: '700px',
        }}
      >
        <Box
          sx={{
            width: '110px',
            height: '50px',
            border: '1px solid #E4E4E4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10px',
          }}
        >
          <Box>
            <Typography>{LEAVE_DATA?.day}</Typography>
          </Box>
          <Box
            sx={{
              width: '110px',
              background: '#F6F6F6',
              border: '1px solid #F6F6F6',
              p: 0.5,
            }}
          >
            <Typography sx={{ fontSize: '10px', textAlign: 'center' }}>
              {LEAVE_DATA?.timeFromto}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default LeaveDay;
