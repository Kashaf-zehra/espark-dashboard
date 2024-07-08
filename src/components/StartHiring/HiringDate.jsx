import React from 'react';
import { Box, Grid } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import DatePickerBox from './DatePicker';

const HiringDate = () => {
  return (
    <Box>
      <Grid
        container
        gap={'20px'}
        sx={{
          flexWrap: { xs: 'wrap', lg: 'nowrap' },
        }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            mb: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <DatePickerBox
              label={HIRING_FORM_DATA?.selectStartDate}
              dateKey="startDate"
              placeholder={'Select Start Date'}
            />
            {/* <Typography>{HIRING_FORM_DATA["startDate"]}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="custom-date-time-picker"
                  open={isOpenDatePicker}
                  slots={{
                    openPickerIcon: () => (
                      <Image
                        src={'/images/hiring/calender.svg'}
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
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              mb: '10px',
            }}
          >
            <DatePickerBox
              label={HIRING_FORM_DATA?.selectEndDate}
              dateKey="endDate"
              placeholder={'Select End Date'}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HiringDate;
