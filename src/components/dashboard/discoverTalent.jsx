import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';

import { DASHBOARD_DATA } from '@/src/constants/dashboard';

const DiscoverTalentPlatform = ({ isLoading }) => {
  return isLoading ? (
    <Stack
      width={'100%'}
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '5px',
        background: '#fff',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.30)',
        flexDirection: { xs: 'column', md: 'row' },
        padding: { xs: '15px', md: '10px' },
      }}
    >
      <Stack
        sx={{
          maxWidth: '700px',
          '@media (min-width: 900px) and (max-width: 1350px)': {
            marginLeft: '30px',
          },
        }}
      >
        <Skeleton
          variant="text"
          sx={{
            fontSize: {
              xs: '25px',
              md: '2.2rem',
            },
            '@media (min-width: 900px) and (max-width: 1350px)': {
              fontSize: '28px',
            },
            width: { xs: '200px', md: '500px' },
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            fontSize: { xs: '20px', md: '5.5rem' },
            fontWeight: 400,
            color: '#595959',
            '@media (min-width: 900px) and (max-width: 1350px)': {
              fontSize: '20px',
            },
            width: { xs: '200px', md: '500px' },
          }}
        />
      </Stack>
      <Skeleton
        variant="circular"
        sx={{
          width: '200px',
          height: '200px',
        }}
      />
    </Stack>
  ) : (
    <Box
      sx={{
        display: 'flex',
        background: '#E6F5F4',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '5px',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        padding: { xs: '15px', md: '10px' },
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '700px',
          '@media (min-width: 900px) and (max-width: 1350px)': {
            marginLeft: '30px',
          },
        }}
      >
        <Typography
          sx={{
            color: '#068987',
            fontSize: { xs: '25px', md: '35px' },
            fontWeight: 700,
            '@media (min-width: 900px) and (max-width: 1350px)': {
              fontSize: '28px',
            },
          }}
        >
          {DASHBOARD_DATA.talentPlatform}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '20px', md: '25px' },
            fontWeight: 400,
            color: '#595959',
            '@media (min-width: 900px) and (max-width: 1350px)': {
              fontSize: '20px',
            },
          }}
        >
          {DASHBOARD_DATA.employeeData}
        </Typography>
      </Box>
      <Image
        src="/images/dashboard/rocket.svg"
        width={232}
        height={232}
        alt="rocket"
      />
    </Box>
  );
};
export default DiscoverTalentPlatform;
