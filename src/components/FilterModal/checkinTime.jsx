import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const CheckinTime = ({ checkIn }) => {
  const fontSize = {
    '@media (min-width: 280px) and (max-width: 400px)': {
      fontSize: '8px',
    },
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          color: '#595959',
          marginBottom: '10px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {checkIn}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <TextField
          type="time"
          sx={{ width: { xs: '100%', md: '50%' } }}
          inputProps={{
            style: {
              height: '5px',
              ...fontSize,
            },
          }}
        ></TextField>
        <Box
          sx={{
            background: '#E4E4E4',
            width: '15%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
          }}
        >
          <Typography>-</Typography>
        </Box>
        <TextField
          type="time"
          sx={{ width: { xs: '100%', md: '50%' } }}
          inputProps={{
            style: {
              height: '5px',
              ...fontSize,
            },
          }}
        ></TextField>
      </Box>
    </Box>
  );
};
export default CheckinTime;
