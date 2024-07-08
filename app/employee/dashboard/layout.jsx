'use client';
import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';

import { SideNav } from '@/src/components/sidebar/SideNavLayout';
import { TopNav } from '@/src/components/sidebar/TopNavLayout';
import { BODY_WIDTH, SIDE_NAV_WIDTH } from '@/src/constants/sidebar';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));
const LayoutBodyRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: BODY_WIDTH,
  },
}));
const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

const Layout = ({ children }) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(true);
  const [child, setChild] = useState(false);

  const handlePathnameChange = useCallback(() => {
    setOpenNav(false);
  }, []);

  useEffect(() => {
    handlePathnameChange();
  }, [pathname, handlePathnameChange]);

  useEffect(() => {
    setChild(!child);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutBodyRoot>
          <LayoutContainer>
            <Box
              sx={{
                '@media (max-width: 400px)': {
                  px: '20px',
                },
                px: {
                  xs: '30px',
                  sm: '30px',
                  md: '50px',
                  lg: '40px',
                  xl: '80px',
                },
                pt: {
                  xs: '100px',
                  sm: '100px',
                  md: '100px',
                  lg: '40px',
                  xl: '63px',
                },
                pb: {
                  xs: '40px',
                  sm: '40px',
                  md: '40px',
                  lg: '40px',
                  xl: '63px',
                },
              }}
            >
              {child && children}
            </Box>
          </LayoutContainer>
        </LayoutBodyRoot>
      </LayoutRoot>
    </>
  );
};

export default Layout;
