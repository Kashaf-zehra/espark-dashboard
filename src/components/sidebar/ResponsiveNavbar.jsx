import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

import SidebarUserAvatar from './SidebarUserAvatar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SidebarGlobalIcon from './SidebarGlobalIcon';
import ProfilePopper from '../popover/ProfilePopper';
import WorkSpacePopper from '../popover/WorkSpacePopper';
import { WORK_SPACE_ICON } from '@/src/constants/sidebar';
import WorkSpaceIcon from './WorkSpaceIcon';
import { useSelector } from 'react-redux';

export default function ResponsiveNavbar({ openSidebar }) {
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [workspace, setWorkspace] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

  const pathName = usePathname();
  const employee = pathName.includes('/employee/dashboard');
  const { empDetails, role } = useSelector((state) => state?.auth?.userData);
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
    companyImage = data.company_image;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'flex', lg: 'none', xl: 'none' },
      }}
    >
      <AppBar position="fixed">
        <Box
          sx={{
            width: '100%',
            p: 1.2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <MenuOpenIcon
            onClick={openSidebar}
            sx={{
              color: 'white',
              fontSize: '37px',
              display: {
                xs: 'flex',
                sm: 'flex',
                md: 'flex',
                lg: 'none',
                xl: 'none',
              },
            }}
          />

          <Box
            sx={{
              display: { xs: 'flex', md: 'none ' },
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
              '@media (min-width: 900px) and (max-width: 1200px)': {
                display: 'flex',
              },
            }}
          >
            {employee && (
              <Box
                sx={{
                  width: '33px',
                  height: '32px',
                }}
              >
                <WorkSpacePopper
                  workspace={workspace}
                  setWorkspace={setWorkspace}
                  setProfileMenu={setProfileMenu}
                  setNotification={setNotification}
                  button={<WorkSpaceIcon image={WORK_SPACE_ICON} />}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    '@media (min-width: 900px) and (max-width: 1200px)': {
                      display: 'flex',
                    },
                  }}
                />
              </Box>
            )}
            <Box sx={{ display: 'flex' }}>
              <SidebarGlobalIcon company_img={companyImage} />
              <ProfilePopper
                profileMenu={profileMenu}
                setProfileMenu={setProfileMenu}
                setWorkspace={setWorkspace}
                notification={notification}
                setNotification={setNotification}
                button={
                  <SidebarUserAvatar
                    userImage={
                      userData?.role === 'employee'
                        ? userData?.empDetails?.image
                        : userData?.role === 'client'
                          ? data?.client_image
                          : homeData?.user_image?.[0]
                    }
                    userName={
                      role === 'client'
                        ? data?.username
                        : role === 'employee'
                          ? empDetails?.employee_name
                          : homeData?.user
                    }
                  />
                }
              />
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
