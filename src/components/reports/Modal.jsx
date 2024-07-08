import React from 'react';
import { Box, Modal } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ActionButtonComponent from './actionButton';

const DatePickerModal = ({ open, handleClose }) => {
  const minDate = dayjs().year(1900).month(0).date(1);
  const maxDate = dayjs();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: { xs: 'auto', sm: '380px' },
          background: '#fff',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            background: 'gray',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              openTo="month"
              sx={{ borderRadius: '10px', height: '500px', display: 'block' }}
              views={['year', 'month', 'day']}
              slots={{
                actionBar: () => (
                  <ActionButtonComponent handleClose={handleClose} />
                ),
              }}
              slotProps={{
                actionBar: {
                  actions: [],
                },
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Modal>
  );
};
export default DatePickerModal;
