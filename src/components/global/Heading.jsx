import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const Heading = ({
  title,
  description,
  containerStyles,
  isLoading,
  commonStyles,
}) => {
  return isLoading ? (
    <Stack
      sx={{
        ...containerStyles,
        width: { xs: '100%', md: '100%' },
      }}
    >
      <Skeleton
        variant="text"
        height={30}
        sx={{ background: '#F6F6F6', width: { xs: '40%', md: '10%' } }}
      />
      <Skeleton
        variant="text"
        height={40}
        sx={{ background: '#F6F6F6', width: { xs: '40%', md: '25%' } }}
      />
    </Stack>
  ) : (
    <Box
      sx={{
        ...containerStyles,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '25px', md: '30px' },
          fontWeight: 600,
          color: '#171717',
          fontStyle: 'normal',
          lineHeight: 'normal',
          mb: '20px',
        }}
      >
        {title}
      </Typography>
      {/* <br /> */}
      <Typography
        sx={{
          fontSize: { xs: '16px', md: '14px' },
          fontWeight: 400,
          color: '#595959',
          fontStyle: 'normal',
          lineHeight: 'normal',
          textAlign: 'center',
          '@media (min-width: 300px) and (max-width: 330px)': {
            ...commonStyles,
          },
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default Heading;
