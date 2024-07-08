'use client';
import React from 'react';
import { Box } from '@mui/material';

import ProfileSection from './ProfileSection';
import SettingTitle from './SettingTitle';
import {
  Profile_Edit_Section,
  Setting_Data,
  User_Detail,
} from '@/src/constants/profileEditData';
import ChangePassword from './ChangePassword';

const EditProfile = () => {
  return (
    <>
      <Box
        sx={{
          mx: 'auto',
          minWidth: 'auto',
          maxWidth: { xs: 'auto', md: '750px' },
          height: { xs: '1100px', md: '900px' },
          borderRadius: '10px',
          border: '1px solid #E4E4E4',
          background: '#fff',
          p: 4,
          '@media (min-width: 790px) and (max-width: 899px)': {
            maxWidth: '750px',
          },
          '@media (max-width: 380px)': {
            padding: 2,
          },
        }}
      >
        <SettingTitle Setting_Data={Setting_Data} />
        <Box sx={{ mt: 5 }}>
          <ProfileSection
            Profile_Edit_Section={Profile_Edit_Section}
            User_Detail={User_Detail}
          />
          <ChangePassword />
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
