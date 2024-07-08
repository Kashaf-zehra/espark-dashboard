import React from 'react';
import { Box, Button } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

const Submit = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            fontSize: '16px',
            // width: '88%',
            padding: '10px',
            fontWeight: 400,
            background: '#fff',
            color: '#029E9C',
            border: '1px solid #029E9C',
            '&:hover': {
              background: '#029E9C',
              color: '#fff',
            },
          }}
        >
          {HIRING_FORM_DATA?.submit}
        </Button>
      </Box>
    </>
  );
};
export default Submit;
