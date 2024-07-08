import Sidebar from './Sidebar';
import { Drawer, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

export const SideNav = (props) => {
  const { empDetails, role } = useSelector((state) => state?.auth?.userData);
  const { data } = useSelector((state) => state?.client?.home);
  const { homeData } = useSelector((state) => state?.hr?.home);
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Sidebar
      // userName={empDetails?.employee_name || data?.username || homeData.user}
      userName={
        role === 'client'
          ? data?.username
          : role === 'employee'
            ? empDetails?.employee_name
            : homeData?.user
      }
    />
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            width: 280,
            marginTop: '44px',
            overflowX: 'hidden',
            overflowY: 'hidden',
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          marginTop: '57px',
          overflowX: 'hidden',
          overflowY: 'hidden',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
