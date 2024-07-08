import React from 'react';
import { Box, Typography } from '@mui/material';

import SummarySlider from './SummarySlider';
import { Summary_Boxes } from '@/src/constants/employeeDashboard';

const AttendanceSummary = ({ title, isLoading }) => {
  return (
    <>
      <Box
        sx={{
          height: 'auto',
          borderRadius: '10px',
          background: '#FFF',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 2.5,
            height: '70px',
            borderRadius: '10px 10px 0px 0px',
            borderBottom: '1px solid #E4E4E4',
            background: '#FFF',
            '@media(max-width: 319px)': {
              height: 'auto',
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '20px', md: '23px', lg: '25px' },
              fontWeight: 600,
              textAlign: { xs: 'center', sm: 'left' },
              color: '#171717',
            }}
          >
            {title || ''}
          </Typography>
        </Box>
        <Box
          sx={{
            px: { xs: 3, md: '25px' },
            py: { xs: 3, md: '25px' },
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SummarySlider summaryBoxes={Summary_Boxes} isLoading={isLoading} />
        </Box>
      </Box>
    </>
  );
};

export default AttendanceSummary;
