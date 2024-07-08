import React from 'react';
import { Box, Typography } from '@mui/material';

const RequestHeading = ({ title }) => {
  return (
    <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
      <Typography
        sx={{
          fontSize: '25px',
          fontWeight: '600',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
export default RequestHeading;
