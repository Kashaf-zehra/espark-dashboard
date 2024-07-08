import React from 'react';
import { Box, Typography } from '@mui/material';

import {
  emergencyContact,
  employeeProfileData,
} from '@/src/constants/employeeProfile';

const EmergencyContact = ({ data }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      padding={2}
      paddingY={2.5}
      gap={0.5}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        sx={{
          borderRadius: '5px',
          border: '1px solid #E4E4E4',
          width: '100%',
          maxWidth: '590px',
          '@media(max-Width: 1439px)': {
            maxWidth: '100%',
          },
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E4E4E4', padding: '10px' }}>
          <Typography
            textAlign={'center'}
            fontSize={{ xs: '14px', md: '16px' }}
          >
            {employeeProfileData?.primary}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            py: '6px',
            px: '12px',
            gap: { xs: '10px', md: '40px' },
            justifyContent: 'center',
            '@media (max-width: 499px)': {
              px: 0,
              py: '0px',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '4px',
              flexDirection: 'column',
            }}
          >
            {emergencyContact?.map((item, index) => (
              <Typography
                key={index}
                component={'span'}
                sx={{
                  display: 'flex',
                  gap: { xs: 3, sm: 3, md: 5 },
                  mb: 0.5,
                  '@media (max-width: 499px)': {
                    borderTop: index === 0 ? null : '1px solid #E4E4E4',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 0.5,
                    pt: 1.5,
                    mb: 1,
                  },
                }}
              >
                <Typography
                  key={index}
                  sx={{
                    width: { xs: '120px', sm: '120px' },
                    fontSize: {
                      xs: '12px',
                      sm: '13px',
                      md: '15px',
                      lg: '15px',
                      xl: '16px',
                    },
                    fontWeight: 400,
                    '@media (max-width: 499px)': {
                      width: 'auto',
                    },
                  }}
                >
                  {item?.label}
                </Typography>
                <Typography
                  key={index}
                  sx={{
                    fontSize: {
                      xs: '12px',
                      sm: '13px',
                      md: '15px',
                      lg: '15px',
                      xl: '16px',
                    },
                    fontWeight: 400,
                  }}
                >
                  {data?.emergency_contact?.primary[item?.name]}
                </Typography>
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: '5px',
          border: '1px solid #E4E4E4',
          width: '100%',
          maxWidth: '590px',
          '@media(max-Width: 1439px)': {
            maxWidth: '100%',
          },
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E4E4E4', padding: '10px' }}>
          <Typography
            textAlign={'center'}
            fontSize={{ xs: '14px', md: '16px' }}
          >
            {employeeProfileData?.secondary}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            py: '6px',
            px: '12px',
            gap: { xs: '10px', md: '40px' },
            justifyContent: 'center',
            '@media (max-width: 499px)': {
              px: 0,
              py: '0px',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              gap: '4px',
              flexDirection: 'column',
            }}
          >
            {emergencyContact?.map((contactData, index) => (
              <Typography
                key={index}
                component={'span'}
                sx={{
                  display: 'flex',
                  gap: { xs: 3, sm: 3, md: 5 },
                  mb: 0.5,
                  '@media (max-width: 499px)': {
                    borderTop: index === 0 ? null : '1px solid #E4E4E4',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 0.5,
                    pt: 1.5,
                    mb: 1,
                  },
                }}
              >
                <Typography
                  key={index}
                  sx={{
                    width: { xs: '120px', sm: '120px' },
                    fontSize: {
                      xs: '12px',
                      sm: '13px',
                      md: '15px',
                      lg: '15px',
                      xl: '16px',
                    },
                    fontWeight: 400,
                    '@media (max-width: 499px)': {
                      width: 'auto',
                    },
                  }}
                >
                  {contactData?.label}
                </Typography>
                <Typography
                  key={index}
                  sx={{
                    fontSize: {
                      xs: '12px',
                      sm: '13px',
                      md: '15px',
                      lg: '15px',
                      xl: '16px',
                    },
                    fontWeight: 400,
                  }}
                >
                  {data?.emergency_contact?.secondary[contactData?.name]}
                </Typography>
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default EmergencyContact;
