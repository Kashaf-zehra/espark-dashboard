import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const EmployeeRequestDetailRow = ({ darkBack, label, value }) => {
  return (
    <Box>
      <Box
        sx={{
          padding: '0 20px 10px',
        }}
      >
        <Grid
          container
          p={'5px 5px 5px 20px'}
          sx={{
            background: darkBack ? '#F6F6F6' : '#FFF',
            borderRadius: '5px',
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '10px', md: '0px' },
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                color: '#171717',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                border: 'solid 1px #ccc',
                p: '9px',
                borderRadius: '5px',
                background: '#f6f6f6',
              }}
            >
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                {value}
              </Typography>
              {label === 'Date:' && (
                <Image
                  src={'/icons/CalendarOutline.svg'}
                  width={20}
                  height={20}
                  alt="Date"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmployeeRequestDetailRow;
