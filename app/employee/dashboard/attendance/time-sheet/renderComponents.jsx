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
      display={'flex'}
      alignItems={'center'}
      padding={'6px'}
      key={statusIndex}
      width={'auto'}
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
        fontSize={'14px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {shortForm}
      </Box>
      <Typography
        variant="caption"
        fontSize={'14px'}
        ml={'5px'}
        sx={{
          width: 'calc(100% - 30px)',
          whiteSpace: 'nowrap',
          color: '#595959',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
