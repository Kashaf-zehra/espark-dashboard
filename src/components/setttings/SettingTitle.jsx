import { Box, Typography } from '@mui/material';
import React from 'react';

const SettingTitle = ({ Setting_Data }) => {
  const { title, description } = Setting_Data;

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          width: { xs: '85%', sm: '90%' },
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Typography variant="h3" component={'h2'} sx={{ color: '#171717' }}>
          {title && title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#595959' }} component={'p'}>
          {description && description}
        </Typography>
      </Box>
    </>
  );
};

export default SettingTitle;
