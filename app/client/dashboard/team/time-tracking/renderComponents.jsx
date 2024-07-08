import { Box, Typography } from '@mui/material';
import React from 'react';

export const renderTrackingStatus = ({
  statusIndex,
  label,
  background,
  shortForm,
}) => {
  return (
    <Box
      mr={'20px'}
      mb={'10px'}
      display={'flex'}
      alignItems={'center'}
      key={statusIndex}
    >
      <Box
        sx={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background,
          color: '#fff',
        }}
        display={'flex'}
        fontSize={'12px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {shortForm}
      </Box>
      <Typography variant="caption" marginX={'5px'} color={'#595959'}>
        {label}
      </Typography>
    </Box>
  );
};
