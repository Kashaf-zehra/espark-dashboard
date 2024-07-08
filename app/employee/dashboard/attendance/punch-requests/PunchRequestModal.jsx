import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import PunchRequestForm from '@/app/employee/dashboard/attendance/punch-requests/PunchRequestForm';
import PunchRequestDataView from './PunchRequestFormView';

const PunchRequestModal = ({ createModal, modalData, handleClose }) => {
  useEffect(() => {
    console.log({ modalData });
  }, [modalData]);
  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        maxWidth: '1480px',
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '82%',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{ width: '100%', borderBottom: '1px solid #E4E4E4', p: 2, px: 3 }}
      >
        <Typography
          sx={{
            textAlign: { xs: 'center', sm: 'start' },
            fontSize: { xs: '23px', sm: '25px' },
            fontWeight: '600',
          }}
        >
          {createModal ? (
            <div>Create punch request</div>
          ) : (
            <div>Punch request view</div>
          )}
        </Typography>
      </Box>
      {createModal ? (
        <PunchRequestForm handleClose={handleClose} />
      ) : (
        <PunchRequestDataView
          modalData={modalData}
          handleClose={handleClose}
          isEmployee
        />
      )}
    </Box>
  );
};

export default PunchRequestModal;
