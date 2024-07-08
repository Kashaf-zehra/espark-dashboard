import React from 'react';
import { Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import CalendarIcon from './CalenderIcon';

const DatePickerBox = ({ dateKey, placeholder }) => {
  return (
    <>
      <Typography>{HIRING_FORM_DATA[dateKey]}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className="date-picker-component"
          slots={{
            openPickerIcon: CalendarIcon,
          }}
          placeholder={placeholder}
          slotProps={{
            textField: {
              placeholder: placeholder,
              sx: {
                '& input': {
                  color: '#88888',
                  padding: '9.95px 10px', // Set the desired font color for the placeholder
                },
              },
            },
          }}
          sx={{
            width: '100%',
            height: '40px',
            '@media (min-width: 900px) and (max-width: 1400px)': {
              width: '100%',
            },
            // '& .MuiInputLabel-root': {
            //   color: '#88888',
            // },
          }}
        />
      </LocalizationProvider>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="custom-date-time-picker"
                  open={isOpenDatePicker}
                  slots={{
                    openPickerIcon: () => (
                      <Image
                        src={'/icons/CalendarOutline.svg'}
                        width={20}
                        height={20}
                        alt="Date"
                        onClick={() => setIsOpenDatePicker((ps) => !ps)}
                      />
                    ),
                    actionBar: () => (
                      <ActionBarComponent onClose={handleCloseDatePicker} />
                    ),
                  }}
                  sx={{ width: '100%', borderRadius: '50%' }}
                  defaultValue={dayjs('2022-04-17')}
                />
              </LocalizationProvider> */}
    </>
  );
};

export default DatePickerBox;
