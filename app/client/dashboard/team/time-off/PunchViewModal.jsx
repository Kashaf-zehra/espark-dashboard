import React, { useState } from 'react';
// import AppDropdown from '@/src/components/dashboard/appDropdown';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { Toast } from '@/src/components/Toast/Toast';
import { useDispatch } from 'react-redux';
import { updateTimeOffRequests } from '@/src/redux/slices/clientSlices/timeOffSlice';
import { api } from '@/src/services/apiService';
import { CLIENT_TIME_OFF } from '@/src/services/apiService/apiEndPoints';

const LeaveViewModal = ({ modalData, handleClose }) => {
  const [updatingLeaveRequest, setUpdatingLeaveRequest] = useState(null);
  const [isApprovedClicked, setIsApproveClicked] = useState(null);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(
        `${CLIENT_TIME_OFF}/?id=${data?.id}`,
        data?.data
      );
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      Toast('success', 'Request updated successfully');
      dispatch(updateTimeOffRequests(updatingLeaveRequest));
      setUpdatingLeaveRequest(null);
      handleClose?.();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });
  const handleClickDecline = () => {
    setUpdatingLeaveRequest({
      id: modalData.id,
      status: 'rejected',
    });
    mutate({
      id: modalData.id,
      data: { status: 'rejected' },
    });
  };
  const handleClickApprove = () => {
    setIsApproveClicked(true);
    setUpdatingLeaveRequest({
      id: modalData.id,
      status: 'completed',
    });
    mutate({
      id: modalData.id,
      data: { status: 'completed' },
    });
  };
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        // width: { xs: '90%', sm: '90%', md: '77.084%' },
        maxWidth: '1480px',
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '80%',
        overflowY: 'auto',
      }}
    >
      <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: 600,
          }}
        >
          Punch request view
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#F6F6F6',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Date
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '9px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  November 1, 2023
                </Typography>
                <Image
                  src={'/icons/CalendarOutline.svg'}
                  width={20}
                  height={20}
                  alt="Date"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '0 20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#FFF',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Punch time
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '9px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  08 :00 PM
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#F6F6F6',
              borderRadius: '5px',
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Punch type
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '9px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  Check out
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            padding: '0 20px',
          }}
        >
          <Grid
            container
            p={'5px 5px 5px 20px'}
            sx={{
              background: '#fff',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  color: '595959',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                }}
              >
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                sx={{
                  border: 'solid 1px #ccc',
                  p: '9px',
                  borderRadius: '5px',
                  background: '#f6f6f6',
                  minHeight: '100px',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                  }}
                >
                  {modalData?.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {modalData?.status === 'pending' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          <Button
            onClick={handleClickDecline}
            sx={{
              width: '120px',
              border: `1px solid ${isPending ? '#ccc' : '#029894'}`,

              background: isPending ? '#ccc' : '#FFF',
              '&:hover': {},
            }}
            disabled={isPending}
          >
            {isPending && !isApprovedClicked ? (
              <CircularProgress size={26} color="secondary" />
            ) : (
              'Decline'
            )}
          </Button>
          <Button
            onClick={handleClickApprove}
            sx={{
              ml: '20px',
              minWidth: '120px',
              background: isPending && '#ccc',
            }}
            disabled={isPending}
            variant="contained"
          >
            {isPending && isApprovedClicked ? (
              <CircularProgress size={26} color="secondary" />
            ) : (
              'Approve'
            )}
          </Button>
        </Box>
      ) : modalData?.status === 'completed' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          <Button
            sx={{ minWidth: '120px' }}
            onClick={handleClose}
            variant="outlined"
          >
            Approved
          </Button>
        </Box>
      ) : modalData?.status === 'rejected' ? (
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          sx={{ padding: '20px' }}
        >
          <Button
            sx={{ minWidth: '120px' }}
            onClick={handleClose}
            variant="outlined"
          >
            Declined
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default LeaveViewModal;
