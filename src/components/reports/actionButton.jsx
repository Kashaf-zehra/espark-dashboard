import React from 'react';
import { Box, Button } from '@mui/material';

import { REPORT_DATA } from '@/src/constants/report';

const ActionButtonComponent = ({ handleClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        width: '100%',
        position: 'absolute',
        bottom: 30,
        zIndex: 1,
      }}
    >
      <Button
        sx={{
          borderRadius: '5px',
          border: '1px solid #029894',
          background: '#FFF',
          width: '120px',
        }}
        onClick={handleClose}
      >
        {REPORT_DATA?.close}
      </Button>
      <Button variant="contained" sx={{ width: '120px' }}>
        {REPORT_DATA?.download}
      </Button>
    </Box>
  );
};
export default ActionButtonComponent;
