import { Box, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';

import ResponsiveNavbar from './ResponsiveNavbar';
import TopNavNavbar from '../global/topNavbar';
import { Active_User_Data } from '@/src/constants/data/userData';
import { SIDE_NAV_WIDTH } from '@/src/constants/sidebar';

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  return (
    <>
      <Box
        component="header"
        sx={{
          height: 'auto',
          backdropFilter: 'blur(6px)',
          backgroundColor: () => alpha('#068987', 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: 500,
        }}
      >
        {lgUp && <TopNavNavbar />}
        {!lgUp && (
          <ResponsiveNavbar
            userName={Active_User_Data?.userName}
            openSidebar={onNavOpen}
          />
        )}
      </Box>
    </>
  );
};
