'use client';
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import SidebarAccordion from './SidebarAccordion';
import {
  Client_Routes,
  Employee_Routes,
  Hr_Routes,
  WORK_SPACE_ICON,
  WORK_SPACE_TITLE,
} from '@/src/constants/sidebar';
import SidebarLogo from './sidebarLogo';
import SidebarActiveUser from './SidebarActiveUser';
import ProfilePopper from '../popover/ProfilePopper';
import { usePathname } from 'next/navigation';
import WorkSpacePopper from '../popover/WorkSpacePopper';
import SidebarWorkSpace from './SidebarWorkSpace';
import { useSelector } from 'react-redux';

const Sidebar = ({ userName }) => {
  const theme = useTheme();
  const pathName = usePathname();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const employee = pathName.includes('/employee/dashboard');
  const { role } = useSelector((state) => state?.auth?.userData);
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [workspace, setWorkspace] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const accordionStyles = {
    paddingTop: windowHeight < 300 ? 0 : '35px',
    paddingBottom: windowHeight < 300 ? 0 : '35px',
  };
  const { employee_perms, client_perms, invoices_perms, policies_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const employeePerms = {
    employee_perms,
    client_perms,
    invoices_perms,
    policies_perms,
  };

  const filteredRoutes = (routes) => {
    return routes.filter((route) => {
      // Check for employee permissions
      if (
        route.text === 'Employees' &&
        !employeePerms?.employee_perms?.[0]?.read
      ) {
        return false; // Exclude 'Employees' route if read permission is false
      }

      // Check for other permissions (assuming properties exist in employeePerms)
      const clientPerms = employeePerms?.client_perms?.[0]; // Assuming client permissions exist
      if (route.text === 'Clients' && !clientPerms?.read) {
        return false; // Exclude 'Clients' route if read permission is false
      }

      const invoicePerms = employeePerms.invoices_perms?.[0]; // Assuming invoice permissions exist
      if (route.text === 'Invoices' && !invoicePerms?.read) {
        return false; // Exclude 'Invoices' route if read permission is false
      }

      const policyPerms = employeePerms.policies_perms?.[0]; // Assuming policy permissions exist
      if (route.text === 'Policies' && !policyPerms?.read) {
        return false; // Exclude 'Policies' route if read permission is false
      }

      // Include the route if no permission check fails
      return true;
    });
  };

  // const { employee_perms, client_perms, invoices_perms, policies_perms } =
  //   useSelector((state) => state?.hr?.home?.homeData || {});

  // const employeePerms = {
  //   employee_perms,
  //   client_perms,
  //   invoices_perms,
  //   policies_perms,
  // };

  // const filteredRoutes = (routes) => {
  //   return routes.filter((route) => {
  //     // Check for employee permissions
  //     if (
  //       route.text === 'Employees' &&
  //       !employeePerms?.employee_perms?.[0]?.read
  //     ) {
  //       return false; // Exclude 'Employees' route if read permission is false
  //     }

  //     // Check for other permissions (assuming properties exist in employeePerms)
  //     const clientPerms = employeePerms?.client_perms?.[0]; // Assuming client permissions exist
  //     if (route.text === 'Clients' && !clientPerms?.read) {
  //       return false; // Exclude 'Clients' route if read permission is false
  //     }

  //     const invoicePerms = employeePerms.invoices_perms?.[0]; // Assuming invoice permissions exist
  //     if (route.text === 'Invoices' && !invoicePerms?.read) {
  //       return false; // Exclude 'Invoices' route if read permission is false
  //     }

  //     const policyPerms = employeePerms.policies_perms?.[0]; // Assuming policy permissions exist
  //     if (route.text === 'Policies' && !policyPerms?.read) {
  //       return false; // Exclude 'Policies' route if read permission is false
  //     }

  //     // Include the route if no permission check fails
  //     return true;
  //   });
  // };

  const renderLinks = () => {
    const client = pathName.includes('/client/dashboard');
    const employee = pathName.includes('/employee/dashboard');
    const hr = pathName.includes('/hr/dashboard');
    if (client) {
      return Client_Routes;
    } else if (employee) {
      return Employee_Routes;
    } else if (hr) {
      if (role === 'super_admin') {
        return Hr_Routes;
      } else {
        const withoutSettings = Hr_Routes.filter(
          ({ text }) => text !== 'Settings'
        );
        return filteredRoutes(withoutSettings);
      }
    } else {
      null;
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '280px',
          display: 'flex',
          height: `calc(100% - ${isSmallScreen ? '15px' : employee ? '42px' : '0px'})`,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E7E7E7',
            width: '100%',
          }}
        >
          {isSmallScreen ? (
            <>
              <SidebarActiveUser userName={userName} />
            </>
          ) : (
            <>
              <ProfilePopper
                profileMenu={profileMenu}
                setProfileMenu={setProfileMenu}
                notification={notification}
                setNotification={setNotification}
                setWorkspace={setWorkspace}
                button={<SidebarActiveUser userName={userName} />}
              />
            </>
          )}
        </Box>

        {employee && (
          <Box
            sx={{
              borderBottom: '1px solid #E7E7E7',
              position: 'relative',
              width: '100%',
            }}
          >
            <>
              <WorkSpacePopper
                workspace={workspace}
                setWorkspace={setWorkspace}
                setProfileMenu={setProfileMenu}
                setNotification={setNotification}
                button={
                  <SidebarWorkSpace
                    title={WORK_SPACE_TITLE}
                    image={WORK_SPACE_ICON}
                  />
                }
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  '@media (min-width: 900px) and (max-width: 1200px)': {
                    display: 'none',
                  },
                }}
              />
            </>
          </Box>
        )}
        <Box
          id={'accrodion'}
          component={'div'}
          sx={{
            px: '12px',
            top: 0,
            height: 'calc(100% - 180px)',
            ...accordionStyles,
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <Box>
            <SidebarAccordion sidebarLinks={renderLinks()} />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#068987',
          }}
        >
          <SidebarLogo />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
