import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import HiringDate from './HiringDate';
import GenderInput from './GenderInput';
import JobTitle from './JobTitle';
import CountryDropdown from './SelectCountry';
import Submit from './SubmitButton';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

const HiringForm = () => {
  const [open, setOpen] = useState(false);
  const showRoleType = true;

  const SelectOpen = () => {
    setOpen(true);
  };
  const SelectClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid item xs={12} sm={10} md={10} lg={8}>
        <Box
          sx={{
            width: '100%',
            height: { xs: 'auto', md: '900px' },
            borderRadius: '10px',
            border: '1px solid #E4E4E4',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            padding: { xs: '20px', sm: '20px', md: '20px 60px' },
            gap: '30px',

            '@media (min-width: 960px) and (max-width: 1590px)': {
              width: '120%',
            },
            '@media (min-width: 900px) and (max-width: 1440px)': {
              height: '1200px',
            },
          }}
        >
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                color: '#595959',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                width: '40px',
                p: '8px 0',
              }}
            >
              {HIRING_FORM_DATA?.hire}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              padding: { xs: '10px', md: '0px' },
              display: 'flex',
              gap: '20px',
              flexDirection: 'column',
            }}
          >
            <Box>
              <JobTitle
                title={HIRING_FORM_DATA?.jobTitle}
                gap={'20px'}
                open={open}
                SelectOpen={SelectOpen}
                SelectClose={SelectClose}
                showRoleType={showRoleType}
              />
            </Box>
            <GenderInput
              open={open}
              SelectOpen={SelectOpen}
              SelectClose={SelectClose}
            />
            <HiringDate />
            <CountryDropdown
              SelectOpen={SelectOpen}
              SelectClose={SelectClose}
            />
            <Submit />
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default HiringForm;
