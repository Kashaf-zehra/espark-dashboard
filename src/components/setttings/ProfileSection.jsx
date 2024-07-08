import * as React from 'react';
import Box from '@mui/material/Box';
import GeneralSettings from './GeneralSettings';

const ProfileSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <GeneralSettings />
    </Box>
  );
};
export default ProfileSection;
