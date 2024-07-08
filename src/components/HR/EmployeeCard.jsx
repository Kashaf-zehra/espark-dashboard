import React from 'react';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const EmployeeCard = ({
  eachItem,
  breakPoint,
  handleClick,
  anchorEl,
  open,
  handleClose,
  handleOpenRemove,
  handleOpenActive,
}) => {
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const router = useRouter();
  const isActive =
    eachItem?.status?.toLowerCase() === 'active' || eachItem?.active;
  const isTerminated = eachItem?.status?.toLowerCase() === 'terminate';
  let statusColor;
  let statusText;
  if (isActive) {
    statusColor = '#068987';
    statusText = 'Active';
  } else if (isTerminated) {
    statusColor = '#068987';
    statusText = 'Terminated';
  } else {
    statusColor = '#F00';
    statusText = 'Inactive';
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={breakPoint ? 4 : 3}>
      <Box
        sx={{
          p: 2,
          minWidth: '240px',
          maxWidth: { xs: '100%', md: '320px' },
          minHeight: '200px',
          position: 'relative',
          backgroundColor: '#F6F6F6',
          borderRadius: '5px',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.30)',
          cursor: 'pointer',
        }}
        onClick={() =>
          router.push(`/hr/dashboard/employees/${eachItem?.emp_pk}`)
        }
      >
        <Box sx={{ width: '100%', position: 'absolute' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                component={'span'}
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: statusColor,
                }}
              ></Typography>
              <Typography
                sx={{
                  color: statusColor,
                  fontSize: '12px',
                }}
              >
                {statusText}
              </Typography>
            </Box>
            <Box>
              <>
                {(role === 'super_admin' ||
                  (role !== 'super_admin' && client_perms?.[0]?.write)) && (
                  <Box sx={{ width: '30px', position: 'absolute', right: 16 }}>
                    <Image
                      width={24}
                      height={24}
                      src={`/icons/ellipse.svg`}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => handleClick(e, eachItem.id)}
                      alt="ellipse"
                    />
                    <>
                      <Menu
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        // open={open}
                        open={eachItem.id === open}
                        onClose={handleClose}
                        sx={{ mt: 1 }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        {eachItem.status === 'active' ? (
                          <MenuItem
                            onClick={(e) => handleOpenRemove(e, eachItem.id)}
                          >
                            Terminate
                          </MenuItem>
                        ) : (
                          <MenuItem
                            onClick={(e) => handleOpenActive(e, eachItem.id)}
                          >
                            Active
                          </MenuItem>
                        )}
                      </Menu>
                    </>
                  </Box>
                )}
              </>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Avatar
            sx={{
              height: '100px',
              width: '100px',
              borderRadius: '50%',
              padding: '5px',
            }}
            src={eachItem?.image}
          />
          <Typography
            sx={{
              color: '#171717',
              fontSize: '16px',
              fontWeight: '400',
              textAlign: 'center',
              textWrap: 'nowrap',
            }}
          >
            {eachItem?.name}
          </Typography>
          <Typography
            sx={{
              color: '#595959',
              fontSize: '16px',
              textAlign: 'center',
              textWrap: 'nowrap',
            }}
          >
            {eachItem?.job_title}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default EmployeeCard;
