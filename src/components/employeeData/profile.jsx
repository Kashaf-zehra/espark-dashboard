import React from 'react';
import { Box, Typography } from '@mui/material';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import EditEmergencyModal from './emergencyEditModal';
import EditPersonalModal from './editPersonalData';
import PersonalInformation from './personalInformation';
import EmergencyContact from './emergencyContact';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';

const Profile = ({
  showEditProfilelModal,
  handleCloseModal,
  handleEmergencyModal,
  showEmergencyModal,
  handleEditProfileModal,
  data,
  isLoading,
}) => {
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);

  return (
    <Box
      display={'flex'}
      sx={{
        height: 'auto',
        width: '100%',
        flexDirection: 'column',
        gap: 5,
        '@media (min-width: 1440px)': {
          flexDirection: 'row',
          gap: '5%',
        },
      }}
    >
      <Box
        sx={{
          height: 'auto',
          width: '100%',
          '@media (min-width: 1440px)': {
            width: '47.5%',
          },
          borderRadius: '5px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: { xs: '13px', sm: '20px' },
          '@media(min-width:320px) and (max-width: 500px)': {
            paddingY: '13px',
            paddingX: '10px',
          },
          '@media(max-width:319px)': {
            paddingY: '12px',
            paddingX: '10px',
          },
        }}
      >
        {isLoading ? (
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component={'img'}
              src="/icons/no-record-found.svg"
              width={'auto'}
              height={'auto'}
              alt="arrow"
            />
          </Stack>
        ) : (
          <Box sx={{ width: '100%', height: 'auto', position: 'relative' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '17px', sm: '20px' },
                  fontWeight: 600,
                  '@media (max-width: 499px)': {
                    textAlign: 'center',
                  },
                  '@media(max-width:319px)': {
                    fontSize: '15px',
                  },
                }}
              >
                {employeeProfileData?.personalInformation}
              </Typography>

              {(role === 'super_admin' ||
                (role !== 'super_admin' && employee_perms?.[0].write)) && (
                <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                  <Box
                    component={'img'}
                    src={'/images/dashboard/hr/edit.svg'}
                    alt="edit"
                    onClick={handleEditProfileModal}
                    sx={{
                      width: { xs: 25, sm: 30, md: 35 },
                      height: { xs: 25, sm: 30, md: 35 },
                      cursor: 'pointer',
                      '@media(max-width:319px)': {
                        width: 22,
                        height: 22,
                      },
                    }}
                  />
                </Box>
              )}
              {showEditProfilelModal && (
                <EditPersonalModal
                  handleEditProfileModal={handleEditProfileModal}
                  onClose={handleCloseModal}
                  data={data}
                />
              )}
            </Box>
            <Box
              sx={{
                width: '100%',
                mt: { xs: 0, sm: 2 },
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: 2, sm: 0 },
              }}
            >
              <PersonalInformation data={data} />
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: '100%',
          '@media (min-width: 1440px)': {
            width: '47.5%',
          },
          borderRadius: '5px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        {isLoading ? (
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component={'img'}
              src="/icons/no-record-found.svg"
              width={'auto'}
              height={'auto'}
              alt="arrow"
            />
          </Stack>
        ) : (
          <Box sx={{ width: '100%', position: 'relative' }}>
            <Box
              sx={{
                ml: { xs: 2.5, lg: 3, xl: 4.5 },
                '@media (max-width: 499px)': { ml: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '17px', sm: '20px' },
                  fontWeight: 600,
                  '@media (max-width: 499px)': {
                    textAlign: 'center',
                  },
                  '@media(max-width:319px)': {
                    fontSize: '15px',
                  },
                }}
              >
                {employeeProfileData?.emergencyContact}
              </Typography>
              {(role === 'super_admin' ||
                (role !== 'super_admin' && employee_perms?.[0].write)) && (
                <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                  <Box
                    component={'img'}
                    src={'/images/dashboard/hr/edit.svg'}
                    width={35}
                    height={35}
                    alt="edit"
                    onClick={handleEmergencyModal}
                    sx={{
                      width: { xs: 25, sm: 30, md: 35 },
                      height: { xs: 25, sm: 30, md: 35 },
                      cursor: 'pointer',
                      '@media(max-width:319px)': {
                        width: 22,
                        height: 22,
                      },
                    }}
                  />
                </Box>
              )}
              {showEmergencyModal && (
                <EditEmergencyModal
                  handleEmergencyModal={handleEmergencyModal}
                  onClose={handleCloseModal}
                  data={data}
                />
              )}
            </Box>
            <EmergencyContact data={data} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default Profile;
