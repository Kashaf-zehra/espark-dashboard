import React from 'react';

import { Box, Typography } from '@mui/material';

import SidebarUserAvatar from './SidebarUserAvatar';
import SidebarProfileMenu from './sidebarProfileMenu';
import SidebarGlobalIcon from './SidebarGlobalIcon';
import { useSelector } from 'react-redux';

const SidebarActiveUser = ({ userName }) => {
  const { userData } = useSelector((state) => state?.auth);
  const { data } = useSelector((state) => state?.client?.home);
  const { homeData } = useSelector((state) => state?.hr?.home);

  const emp = useSelector((state) => state?.emp.home);
  let companyImage = '';

  if (homeData?.user == 'superAdmin') {
    companyImage = homeData.company_image;
  }
  if (userData?.role == 'employee') {
    companyImage = emp.homeData.company_image;
  }
  if (userData?.role == 'client') {
    companyImage = data?.company_image;
  }

  return (
    <>
      <Box
        // component={'button'}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          py: 1.5,
          px: 1.2,
        }}
      >
        <SidebarGlobalIcon company_img={companyImage} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '188px',
          }}
        >
          <SidebarUserAvatar
            userName={userName}
            userImage={
              userData?.role === 'employee'
                ? userData?.empDetails?.image
                : userData?.role === 'client'
                  ? data?.client_image
                  : homeData?.user_image?.[0]
            }
          />
          <Typography
            variant="body1"
            sx={{
              width: '130px',
              ml: 2,
              color: '#595959',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textAlign: 'left',
            }}
          >
            {userName}
          </Typography>
        </Box>
        <SidebarProfileMenu />
      </Box>
    </>
  );
};

export default SidebarActiveUser;
