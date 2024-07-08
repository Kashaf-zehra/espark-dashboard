import React from 'react';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';

const ReasonDescription = ({ disabled }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
      }}
    >
      <Typography sx={{ width: '160px' }}>{PUNCH_IN?.description}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <TextField
          placeholder=""
          multiline
          rows={2}
          maxRows={4}
          disabled={disabled}
          sx={{
            width: '80%',
            borderRadius: '5px',
            border: '1px solid #E4E4E4',
          }}
        />
      </Box>
    </Box>
  );
};
export default ReasonDescription;
