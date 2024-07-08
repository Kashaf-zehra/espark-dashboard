import React from 'react';
import { Box, Button } from '@mui/material';

import { REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const ActionBarComponent = ({ onClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        paddingTop: '12px',
        position: 'absolute',
        bottom: 3,
        width: '100%',
        zIndex: 1,
      }}
    >
      <Button
        sx={{
          borderRadius: '5px',
          border: '1px solid #029894',
          background: '#FFF',
          width: '100px',
        }}
        onClick={onClose}
      >
        {REQUESTVIEW_DATA?.close}
      </Button>
      <Button variant="contained" sx={{ width: '100px' }} onClick={onClose}>
        {REQUESTVIEW_DATA?.set}
      </Button>
    </Box>
  );
};
export default ActionBarComponent;
