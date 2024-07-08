'use client';
import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid } from '@mui/material';

const EmployeeCardSkeleton = ({ breakPoint }) => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={breakPoint ? 4 : 3}>
        <Stack
          spacing={1.5}
          sx={{
            width: '100%',
            minHeight: '200px',
            justifyContent: 'center',
            backgroundColor: '#F6F6F6',
            borderRadius: '5px',
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.30)',
            padding: '10px 22px 10px 22px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              width: '85%',
              top: 15,
              justifyContent: 'space-between',
              position: 'absolute',
              zIndex: 1,
            }}
          >
            <Skeleton variant="text" width={50} height={30} />
            <Skeleton variant="text" width={25} height={30} />
          </Stack>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.7,
              position: 'relative',
              zIndex: 0,
            }}
          >
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={150} />
          </Box>
        </Stack>
      </Grid>
    </>
  );
};

export default EmployeeCardSkeleton;
