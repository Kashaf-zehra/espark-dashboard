import React, { useState } from 'react';
import { Box, Popper, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Image from 'next/image';

import ActionBarComponent from '../requestview/actionbarComponent';

const DatePicker = ({ title }) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);
  const currentDate = dayjs();
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          color: '#595959',
          marginBottom: '10px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {title}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className="custom-date-time-picker"
          open={isOpenDatePicker}
          defaultValue={currentDate}
          PopperComponent={(props) => (
            <Popper {...props} style={{ maxWidth: '100px' }} />
          )}
          slots={{
            openPickerIcon: () => (
              <Image
                src={'/icons/CalenderGray.svg'}
                width={30}
                height={30}
                alt="Date"
                onClick={() => setIsOpenDatePicker((ps) => !ps)}
              />
            ),
            actionBar: () => (
              <ActionBarComponent onClose={handleCloseDatePicker} />
            ),
          }}
          sx={{
            width: '100%',
            borderRadius: '50%',
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
export default DatePicker;
