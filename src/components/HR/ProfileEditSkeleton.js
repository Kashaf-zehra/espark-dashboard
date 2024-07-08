'use client';
import React from 'react';
import { Stack } from '@mui/material';
import { Box, Skeleton } from '@mui/material';

const ProfileEditSkeleton = ({ isClient }) => {
  return (
    <Stack
      sx={{
        borderRadius: '5px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        marginBottom: '40px',
        px: 5,
        py: 4,
      }}
    >
      {!isClient && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 4 },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="circular" width={100} height={100} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              width: '100%',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'space-between' },
              rowGap: 2,
            }}
          >
            <Stack
              spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'start' },
              }}
            >
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="text" width={160} height={20} />
              <Skeleton variant="text" width={130} height={20} />
            </Stack>
            <Stack
              spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: { xs: '100%', md: 'auto' },
              }}
            >
              <Skeleton variant="rounded" sx={{ width: 200, height: 30 }} />
              <Skeleton variant="rounded" sx={{ width: 200, height: 30 }} />
            </Stack>
          </Box>
        </Box>
      )}

      {isClient && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column' },
            gap: { xs: 2, md: 4 },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: { xs: 'space-between' },
              rowGap: 2,
              '@media(max-width: 500px)': {
                alignItems: 'center',
                gap: 3,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 5,
                alignItems: 'center',
                pr: { xs: 0, md: 13.3 },
                '@media(max-width: 500px)': {
                  flexDirection: 'column',
                  gap: 4,
                },
              }}
            >
              <Skeleton variant="circular" width={100} height={100} />
              <Stack
                spacing={1}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  '@media(max-width: 500px)': {
                    alignItems: 'center',
                  },
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{ width: { xs: 170, sm: 200, md: 250 } }}
                  height={20}
                />
                <Skeleton variant="text" width={130} height={20} />
              </Stack>
            </Box>

            <Box
              sx={{
                display: 'flex',
                width: { xs: 'auto', md: 'auto' },
                columnGap: 10,
                rowGap: 2,
                flexWrap: 'wrap',
                pr: { xs: 0, sm: 10.5, md: 15.5 },
              }}
            >
              <Stack spacing={2.5} sx={{ width: { xs: '100%', sm: '200px' } }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: '100%' }, height: 12 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: '100%' }, height: 12 }}
                />
              </Stack>
              <Stack spacing={2.5} sx={{ width: { xs: '100%', sm: '200px' } }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: '100%' }, height: 12 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: '100%' }, height: 12 }}
                />
              </Stack>
              <Stack spacing={2.5} sx={{ width: { xs: '100%', sm: '200px' } }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: '100%' }, height: 12 }}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ width: { xs: '100%', md: '100%' }, height: 12 }}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default ProfileEditSkeleton;
