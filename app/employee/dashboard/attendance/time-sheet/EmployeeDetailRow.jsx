import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const EmployeeDetailRow = ({ fontSize, darkBack, label, value }) => {
  return (
    <Box
      sx={{
        background: darkBack ? '#F6F6F6' : '#fff',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '550px',
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography
            sx={{
              color: '#171717',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              ...fontSize,
            }}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              color: '#595959',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              ...fontSize,
            }}
          >
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDetailRow;
