import React from 'react';
import { Box, Button } from '@mui/material';

const PunchRequestButton = ({ onClose, closeBtn, createPunch }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '80px',
        }}
      >
        {createPunch && (
          <Button
            sx={{
              border: '1px solid #029894',
              background: '#FFF',
              width: { xs: '80px', md: '120px' },
              borderRadius: '5px',
            }}
            onClick={onClose}
          >
            Cancel
            {/* {cancelBtn} */}
          </Button>
        )}
        {createPunch && (
          <Button
            variant="contained"
            sx={{ width: { xs: '80px', md: '120px' }, borderRadius: '5px' }}
            onClick={onClose}
          >
            Save
            {/* {saveBtn} */}
          </Button>
        )}
        {!createPunch && (
          <Button
            sx={{
              border: '1px solid #029894',
              background: '#FFF',
              width: { xs: '80px', md: '120px' },
              borderRadius: '5px',
            }}
            onClick={onClose}
          >
            {closeBtn}
          </Button>
        )}
      </Box>
    </>
  );
};
export default PunchRequestButton;
