import React from 'react';
import { Box, Typography } from '@mui/material';

const PunchHeading = ({ heading }) => {
  return (
    <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
        }}
      >
        {heading}
      </Typography>
    </Box>
  );
};
export default PunchHeading;
