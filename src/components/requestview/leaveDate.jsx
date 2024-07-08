import React from 'react';
import { Box, Typography } from '@mui/material';

import LeaveDatePicker from './leaveDatepicker';

const LeaveDate = ({ date, backgroundColor, isViewingClient }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: backgroundColor || '#fff',
        p: 1,
        gap: '10px',
      }}
    >
      <Typography sx={{ width: '80px' }}>
        {isViewingClient ? (
          date
        ) : (
          <>
            {date}
            <span
              style={{
                color: 'red',
                fontSize: '25px',
                marginLeft: '65px',
                marginTop: '-25px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              *
            </span>
          </>
        )}
      </Typography>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <LeaveDatePicker isViewingClient={isViewingClient} />
      </Box>
    </Box>
  );
};
export default LeaveDate;
