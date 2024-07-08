import React from 'react';
import { Box, Typography } from '@mui/material';

const LeaveCount = ({ countLabel, totalNo, backgroundColor, component }) => {
  return (
    <Box
      sx={{
        background: backgroundColor || '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1.5,
        gap: { xs: '15px', md: '0px' },
        '@media (min-width: 900px) and (max-width: 1530px)': {
          gap: '15px',
        },
      }}
    >
      <Typography>{countLabel}</Typography>
      {totalNo ? (
        <Box
          sx={{
            borderRadius: '5px',
            border: '1px solid #E4E4E4',
            width: '600px',
            p: 1.5,
          }}
        >
          <Typography>{totalNo}</Typography>
        </Box>
      ) : null}
      {component}
    </Box>
  );
};
export default LeaveCount;
