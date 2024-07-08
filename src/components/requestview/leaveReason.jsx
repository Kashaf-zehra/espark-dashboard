import React from 'react';
import { TextField } from '@mui/material';

const LeaveReason = () => {
  return (
    <TextField
      placeholder=""
      multiline
      rows={2}
      maxRows={4}
      sx={{
        width: '600px',
        borderRadius: '5px',
        border: '1px solid #E4E4E4',
      }}
    />
  );
};
export default LeaveReason;
