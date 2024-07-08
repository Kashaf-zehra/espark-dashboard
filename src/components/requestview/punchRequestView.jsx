import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LeaveRequestButtons from './leaveRequestButton';
import Image from 'next/image';

const PunchRequest = ({
  modalType,
  rowType,
  onClose,
  isViewingClient,
  isViewingEmployee,
  createLeaveRequest,
  createPunchRequest,
  viewPunchRequest,
}) => {
  return (
    <Box sx={{ p: 3.5 }}>
      <Grid
        container
        sx={{
          background: '#f6f6f6',
          p: '15px 5px 15px 15px',
          borderRadius: '5px',
        }}
      >
        <Grid item sx={{}} md={6} xs={12} alignItems="center" display={'flex'}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '19px',
              letterSpacing: '0em',
              textAlign: 'left',
            }}
          >
            Date <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
        </Grid>
        <Grid item sx={{}} md={6} xs={12}>
          <Box
            sx={{
              border: 'solid 1px #E4E4E4',
              p: '10px 15px',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              November 1, 2023
            </Typography>
            <Image src={'/icons/CalendarOutline.svg'} width={20} height={20} />
          </Box>
        </Grid>
      </Grid>
      {createPunchRequest && (
        <Grid
          container
          sx={{
            p: '15px 5px 15px 15px',
            borderRadius: '5px',
          }}
        >
          <Grid
            item
            sx={{}}
            md={6}
            xs={12}
            alignItems="center"
            display={'flex'}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              Expected check in
            </Typography>
          </Grid>
          <Grid item sx={{}} md={6} xs={12}>
            <Box
              sx={{
                border: 'solid 1px #E4E4E4',
                p: '10px 15px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '19px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}
              >
                --:-- --
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      {createPunchRequest && (
        <Grid
          container
          sx={{
            background: '#f6f6f6',
            p: '15px 5px 15px 15px',
            borderRadius: '5px',
          }}
        >
          <Grid
            item
            sx={{}}
            md={6}
            xs={12}
            alignItems="center"
            display={'flex'}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              Expected check out
            </Typography>
          </Grid>
          <Grid item sx={{}} md={6} xs={12}>
            <Box
              sx={{
                border: 'solid 1px #E4E4E4',
                p: '10px 15px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '19px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}
              >
                --:-- --
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        sx={{
          p: '15px 5px 15px 15px',
          borderRadius: '5px',
        }}
      >
        <Grid item sx={{}} md={6} xs={12} alignItems="center" display={'flex'}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '19px',
              letterSpacing: '0em',
              textAlign: 'left',
            }}
          >
            Punch Type <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
        </Grid>
        <Grid item sx={{}} md={6} xs={12}>
          <Box
            sx={{
              border: 'solid 1px #E4E4E4',
              p: '10px 15px',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              {createPunchRequest ? 'Select Punch Type' : 'Check out'}
            </Typography>
            {createPunchRequest && (
              <Image src={'/icons/Dropdown.svg'} width={20} height={20} />
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          background: '#f6f6f6',
          p: '15px 5px 15px 15px',
          borderRadius: '5px',
        }}
      >
        <Grid item sx={{}} md={6} xs={12} alignItems="center" display={'flex'}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '19px',
              letterSpacing: '0em',
              textAlign: 'left',
            }}
          >
            Punch Time <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
        </Grid>
        <Grid item sx={{}} md={6} xs={12}>
          <Box
            sx={{
              border: 'solid 1px #E4E4E4',
              p: '10px 15px',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              --:-- --
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          p: '15px 5px 15px 15px',
          borderRadius: '5px',
        }}
      >
        <Grid item sx={{}} md={6} xs={12} display={'flex'}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '19px',
              letterSpacing: '0em',
              textAlign: 'left',
              pt: '15px',
            }}
          >
            Description
          </Typography>
        </Grid>
        <Grid item sx={{}} md={6} xs={12}>
          <Box
            sx={{
              border: 'solid 1px #E4E4E4',
              p: '10px 15px',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',

              backgroundColor: '#f6f6f6',
              minHeight: '150px',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: '19px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              Write you description
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <LeaveRequestButtons
        modalType={modalType}
        isViewingClient={isViewingClient}
        isViewingEmployee={isViewingEmployee}
        rowType={rowType}
        onClose={onClose}
        createLeaveRequest={createLeaveRequest}
        createPunchRequest={createPunchRequest}
        viewPunchRequest={viewPunchRequest}
      />
    </Box>
  );
};
export default PunchRequest;
