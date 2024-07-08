import React from 'react';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import CalendarIcon from '../StartHiring/CalenderIcon';

const DatePicker = ({ placeholder }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box style={{ width: '100%' }}>
        <DesktopDatePicker
          className="date-picker-component"
          sx={{
            width: '100%',
            borderRadius: '50%',
            '& .MuiInputBase-input': {
              height: '7px',
            },
          }}
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          slotProps={{
            textField: {
              placeholder: placeholder,
            },
          }}
          PopperProps={{
            style: {
              '& .MuiCalendarOrClockPicker-root': {
                width: '590px',
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
export default DatePicker;
