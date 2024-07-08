import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import EditModal from '@/src/components/employeeData/editModal';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ClientProfileData = ({
  handleOpenModal,
  showEditModal,
  handleCloseModal,
}) => {
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const router = useRouter();
  const clientInfoData = [
    [
      {
        title: 'Client ID',
        name: 'client_id',
      },
      {
        title: 'Address',
        name: 'address',
      },
    ],
    [
      {
        title: 'Country',
        name: 'country',
      },
      {
        title: 'Phone',
        name: 'phone_number',
      },
    ],
    [
      {
        title: 'Email',
        name: 'email',
      },
      {
        title: 'Join date',
        name: 'join_date',
      },
    ],
  ];
  const { currentClient } = useSelector((state) => state?.hr?.clients);
  return (
    <Box
      sx={{
        width: '100%',
        px: 2.5,
        py: { xs: 3, sm: 2 },
        borderRadius: '5px',
        background: '#FFF',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        '@media (max-width: 319px)': {
          px: 2,
          py: 2,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 5,
            alignItems: 'center',
            pr: { xs: 0, sm: 3 },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={currentClient?.image_path}
              sx={{
                width: { xs: '100px', md: '100px' },
                height: { xs: '100px', md: '100px' },
                borderRadius: '50%',
              }}
            />
            {(role === 'super_admin' ||
              (role !== 'super_admin' && client_perms?.[0].write)) && (
              <Box
                component="img"
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  cursor: 'pointer',
                }}
                src="/icons/EditIcon.svg"
                width={35}
                height={35}
                onClick={handleOpenModal}
              />
            )}
            {showEditModal && (
              <EditModal
                handleOpenModal={handleOpenModal}
                onClose={handleCloseModal}
                isClient
              />
            )}
          </Box>
          <Box>
            {currentClient?.first_name ? (
              <Box display={'flex'} flexDirection={'column'}>
                <Typography
                  sx={{
                    color: '#171717',
                    fontSize: {
                      xs: '18px',
                      sm: '20px',
                      md: '23px',
                      lg: '25px',
                    },
                    fontStyle: 'normal',
                    fontWeight: '600',
                    lineHeight: 'normal',
                    mb: { xs: '10px', md: '15px' },
                  }}
                >
                  {`${currentClient?.first_name} ${currentClient?.last_name}`}
                </Typography>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: { xs: '13px', md: '14px', xl: '16px' },
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                    textAlign: { xs: 'center', sm: 'start' },
                  }}
                >
                  {`${currentClient?.company_name}`}
                </Typography>
              </Box>
            ) : (
              <Stack spacing={1.5} sx={{ width: { xs: '100%', md: '200px' } }}>
                <Skeleton
                  variant="text"
                  sx={{ width: { xs: 170, sm: 200, md: 250 } }}
                />
                <Skeleton variant="text" width={130} />
              </Stack>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' },
            pr: { xs: 0, lg: 10 },
            pl: 0.5,
            pt: { xs: 2, lg: 2 },
            pb: { xs: 0, lg: 2 },
          }}
        >
          {clientInfoData?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 0, md: 0.5 },
                width: { xs: 'auto', sm: '300px' },
                alignItems: { xs: 'center', sm: 'start' },
              }}
            >
              {item?.map(({ title, name }, i) => (
                <Box key={i}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: { xs: '13px', md: '14px', xl: '16px' },
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: { xs: 2, md: 2 },
                      textAlign: { xs: 'center', sm: 'start' },
                    }}
                  >
                    {`${title}:  ${currentClient[name]}`}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {(role === 'super_admin' ||
            (role !== 'super_admin' && client_perms?.[0].write)) && (
            <Box
              component="img"
              sx={{
                cursor: 'pointer',
              }}
              src="/icons/EditIcon.svg"
              width={35}
              height={35}
              onClick={() => router.push(`/hr/dashboard/clients/edit-profile`)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClientProfileData;
