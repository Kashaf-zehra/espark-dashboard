import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import { api } from '@/src/services/apiService';
import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { Button, Grid, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import dayjs from 'dayjs';
import { Toast } from '../../Toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { marKCheckin } from '@/src/redux/slices/employeeSlices/empHomeSlice';

const MarkCheckIn = () => {
  const dispatch = useDispatch();
  // const [time, setTime] = useState(null);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const { homeData } = useSelector((state) => state?.emp?.home);
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const url = `${EMP_HOME}/?workspace=${currentWorkSpace?.email}&check_in=${data.check_in}`;
      return api.patchData(url);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      Toast('success', 'Data updated successfully');
      dispatch(
        marKCheckin({
          check_in: dayjs().format('hh:mm:ss A'),
        })
      );
      // setTime(null);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleCheckIn = () => {
    if (homeData?.today_activity?.check_in !== '-') {
      return;
    } else {
      const data = {
        // check_in: dayjs().format('hh:mm A'),
        check_in: dayjs().format('hh:mm:ss A'),
        check_in_timer: dayjs().format('hh:mm:ss A'),
      };
      // setTime(data);
      // setTime(data?.check_in);
      mutate(data);
    }
  };
  // const canCheckIn = (homeData) => {
  //   // Case 1: User has already checked out
  //   if (
  //     homeData?.today_activity?.check_out !== '-' ||
  //     !homeData?.today_activity?.check_out
  //   ) {
  //     return false;
  //   }

  //   // Case 2: User has already checked in
  //   if (
  //     homeData?.today_activity?.check_in !== '-' ||
  //     !homeData?.today_activity?.check_in
  //   ) {
  //     return false;
  //   }

  //   // Otherwise, user can check in
  //   return true;
  // };
  return (
    <Grid item xs={12} md={6} lg={6} xl={6}>
      <Button
        sx={{
          border: '1px solid #E4E4E4',
          display: 'flex',
          backgroundColor: `${
            homeData?.today_activity?.check_in !== '-' && '#dddd'
          }`,
          justifyContent: 'center',
          alignItems: 'center',
          p: '10px',
          width: '100%',
          height: '50px',
          cursor:
            homeData?.today_activity?.check_in !== '-' ? 'no-drop' : 'pointer',
          '&:hover': {
            color: '#068987',
            background: '#fff',
          },
        }}
        // disabled={homeData?.today_activity?.check_in !== '-' ? true : false}
        // disabled={homeData?.today_activity?.check_in}
        disabled={homeData?.today_activity?.check_in !== '-'}
        onClick={handleCheckIn}
      >
        <Typography
          sx={{
            color: '#595959',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'math-auto',
          }}
        >
          {PUNCH_IN?.markCheckIn}
        </Typography>
      </Button>
    </Grid>
  );
};

export default MarkCheckIn;
