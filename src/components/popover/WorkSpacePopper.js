'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Button, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { addCurrentWorkSpace } from '@/src/redux/slices/employeeSlices/empHomeSlice';
import { useRouter } from 'next/navigation';
export default function WorkSpacePopper({
  button,
  workspace,
  setWorkspace,
  setProfileMenu,
  setNotification,
  sx,
}) {
  const { workspaces } = useSelector((state) => state?.emp?.home?.homeData);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const dispatch = useDispatch();
  const router = useRouter();
  const workspacePopupRef = React.useRef(null);

  const handleClick = (event) => {
    setWorkspace(event?.currentTarget);
    setProfileMenu(null);
    setNotification(null);
  };

  const open = Boolean(workspace);
  const id = open ? 'simple-popper' : undefined;

  const handleClickOutside = (event) => {
    if (
      workspacePopupRef?.current &&
      !workspacePopupRef?.current?.contains(event.target)
    ) {
      setWorkspace(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setWorkspace(null);
  };
  const handleWorkSpace = (val) => {
    dispatch(addCurrentWorkSpace(val));
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <Button
        disableRipple
        aria-describedby={id}
        onClick={handleClick}
        onMouseEnter={handleClick}
        sx={{
          width: '100%',
          height: '100%',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          ...(sx && sx),
        }}
      >
        {button}
      </Button>
      <Popper
        id={id}
        open={open}
        ref={workspacePopupRef}
        onMouseLeave={handleClose}
        anchorEl={workspace}
        placement={'right-start'}
        sx={{
          position: 'relative',
          zIndex: 505,
        }}
      >
        <Box
          sx={{
            borderRadius: '5px',
            border: '1px solid #068987',
            background: '#fff',
            boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            width: '220px',
            minHeight: 'auto',
            maxHeight: '200px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            overflow: 'auto',
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray',
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#fff',
              borderRadius: '5px',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'gray',
            '&::-webkit-scrollbar': {
              display: workspaces?.length > 1 ? 'none' : 'scroll',
              width: '5px',
            },
            position: 'fixed',
            marginLeft: { xs: 'auto', lg: 0.8 },
            right: { xs: '30px', lg: 'auto' },
            marginRight: { xs: 0, lg: 0 },
            marginTop: { xs: 8, lg: 1 },
          }}
        >
          {/* <Box
          sx={{
            borderRadius: '5px',
            border: '1px solid #068987',
            background: '#fff',
            boxShadow: '0px 0px 80px 0px rgba(0, 0, 0, 0.20)',
            display: 'flex',
            width: '220px',

            // minHeight: 'auto',
            maxHeight: '200px',
            height: 'auto',

            maxHeight: workspaces.length > 1 ? '180px' : '230px',
            overflowY: workspaces.length > 1 ? 'auto' : 'scroll',
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray',
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#fff',
              borderRadius: '5px',
              // height: '4px',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'gray',
            '&::-webkit-scrollbar': {
              display: workspaces.length > 1 ? 'none' : 'scroll',
              width: '5px',
            },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'fixed',
            marginLeft: { xs: 'auto', lg: 0.8 },
            right: { xs: '30px', lg: 'auto' },
            marginRight: { xs: 0, lg: 0 },
            marginTop: { xs: 8, lg: 1 },
            '@media(max-width:1200px)': {
              marginRight: -9,
            },
            '@media(min-width:900px)-@media(max-width:1200px)': {
              marginRight: -9,
            },
          }}
        > */}
          {workspaces?.map((item, i) => (
            <MenuItem
              key={i}
              onClick={() => handleWorkSpace(item)}
              sx={{
                width: '100%',
                py: 1.1,
                p: 1.5,
                // background: 'transparent',
                backgroundColor:
                  currentWorkSpace?.email === item.email
                    ? '#CDECF3'
                    : 'transparent',
                // boxShadow: 'inset 0px -1px 0px ',
                borderBottom: '1px solid #E4E4E4',

                '&: hover': {
                  backgroundColor: '#CDECF3',
                  border: '1px solid #068987',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: 1.1,
                  justifyContent: 'center',
                }}
              >
                {item?.icon && (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Image width={20} height={20} src={item?.icon} alt="icon" />
                  </Box>
                )}

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    color: '#595959',
                    '&: hover': {
                      color: '#068987',
                    },
                  }}
                >
                  {item?.company_name}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Popper>
    </div>
  );
}
