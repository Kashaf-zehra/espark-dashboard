import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { markCheckout } from '@/src/redux/slices/employeeSlices/empHomeSlice';
import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '../../Toast/Toast';
import AppConfirmationMadal from '../../modals/AppConfirmationMadal';

const MarkCheckOut = () => {
  const dispatch = useDispatch();
  const [isOpenWarnignModal, setIsOpenWarningModal] = useState(false);

  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  // const [time, setTime] = useState('');
  const { homeData } = useSelector((state) => state?.emp?.home);

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const url = `${EMP_HOME}/?workspace=${currentWorkSpace?.email}&check_out=${data.time}`;
      return api.patchData(url);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data updated successfully');
      console.log({ data });
      dispatch(markCheckout(dayjs().format('hh:mm:ss A')));
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleCheckout = () => {
    const data = {
      time: dayjs().format('hh:mm:ss A'),
    };
    // setTime(data?.time);
    mutate(data);
    console.log({ data });
    setIsOpenWarningModal(false);
  };
  const canCheckout = () => {
    // Case 1: User has not checked in
    if (
      homeData?.today_activity?.check_in === '-' ||
      !homeData?.today_activity?.check_in
    ) {
      return false;
    }

    // Case 2: User has already checked out
    if (
      homeData?.today_activity?.check_out !== '-' ||
      !homeData?.today_activity?.check_out
    ) {
      return false;
    }

    // Case 3: User has checked in but has not resumed after break
    if (
      homeData?.today_activity?.break !== '-' &&
      (homeData?.today_activity?.resume === '-' ||
        !homeData?.today_activity?.resume)
    ) {
      return false;
    }

    // Case 4: User has checked in and hasn't taken a break
    return true;
  };
  return (
    <Grid item xs={12} md={6} lg={6} xl={6}>
      <AppConfirmationMadal
        isOpen={isOpenWarnignModal}
        title={'Warning'}
        handleClose={() => setIsOpenWarningModal(false)}
        handleConfirm={handleCheckout}
        bodyText={'Are you sure you want to perform this action?'}
        cancelButtonText={'No'}
        confirmButtonText={'Yes'}
      />
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: '10px',
          width: '100%',
          height: '50px',
          color:
            homeData?.today_activity?.check_out !== '-' ? '#B3B3B3' : '#FFF',
          background: !canCheckout() ? '#E4E4E4' : '#068987',
          cursor:
            homeData?.today_activity?.check_out !== '-' ? 'no-drop' : 'pointer',
          '&:hover': {
            color:
              homeData?.today_activity?.check_out !== '-' ? '#B3B3B3' : '#FFF',
            background:
              homeData?.today_activity?.check_out !== '-'
                ? '#E4E4E4'
                : '#068987',
          },
        }}
        disabled={!canCheckout()}
        onClick={() => setIsOpenWarningModal(true)}
      >
        <Typography
          sx={{
            color: '#FFF',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'math-auto',
          }}
        >
          {PUNCH_IN?.markCheckOut}
        </Typography>
      </Button>
    </Grid>
  );
};

export default MarkCheckOut;
