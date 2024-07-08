import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import { Box, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { api } from '@/src/services/apiService';
import { EMP_HOME } from '@/src/services/apiService/apiEndPoints';
import { useState } from 'react';
import {
  markBreak,
  markResume,
} from '@/src/redux/slices/employeeSlices/empHomeSlice';
import { Toast } from '../../Toast/Toast';

function getTimeDifference(startTime, endTime) {
  const start = new Date(`01/01/2022 ${startTime}`).getTime();
  const end = new Date(`01/01/2022 ${endTime}`).getTime();
  let diff = Math.abs(end - start);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const MarkBreak = ({ icon }) => {
  const isValidBreakButton = () => {
    const { today_activity } = homeData;

    if (!today_activity || today_activity.check_in === '-') {
      return false;
    }

    if (today_activity.check_out !== '-' || today_activity.resume !== '-') {
      return false;
    }

    return true;
  };

  const dispatch = useDispatch();

  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const { homeData } = useSelector((state) => state?.emp?.home);

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      let url = `${EMP_HOME}/?workspace=${currentWorkSpace?.email}&break=${data.time}`;
      if (homeData?.today_activity?.break !== '-') {
        url = `${EMP_HOME}/?workspace=${currentWorkSpace?.email}&resume=${data.time}`;
      }
      return api.patchData(url);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      if (
        !homeData?.today_activity?.break ||
        homeData?.today_activity?.break === '-'
      ) {
        dispatch(markBreak(dayjs().format('hh:mm:ss A')));
      } else {
        dispatch(markResume(dayjs().format('hh:mm:ss A')));
      }
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  // Working on new login
  const [timer, setTimer] = useState('00:00:00');
  useEffect(() => {
    let interval;
    if (
      homeData?.today_activity?.break === '-' &&
      homeData?.today_activity?.resume === '-'
    ) {
      setTimer('00:00:00');
    } else if (
      homeData?.today_activity?.break !== '-' &&
      homeData?.today_activity?.resume === '-'
    ) {
      interval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString([], {
          hour12: false,
        });
        const timeDifference = getTimeDifference(
          homeData?.today_activity?.break,
          currentTime
        );
        setTimer(timeDifference);
      }, 1000);
    } else {
      const timeDifference = getTimeDifference(
        homeData?.today_activity?.break,
        homeData?.today_activity?.resume
      );
      setTimer(timeDifference);
    }

    return () => clearInterval(interval);
  }, [homeData?.today_activity?.break, homeData?.today_activity?.resume]);

  const handleToggleBreak = () => {
    if (
      homeData?.today_activity?.resume &&
      homeData?.today_activity?.resume !== '-'
    ) {
      return;
    } else {
      const data = {
        time: dayjs().format('hh:mm:ss A'),
      };
      mutate(data);
    }
  };

  return (
    <Box sx={{ py: { xs: '23px', md: 0 } }}>
      <Box
        sx={{
          height: '50px',
          mx: { xs: 3, sm: 3, lg: 3 },
          my: { xs: 0, md: '23px' },
          borderRadius: '5px',
          position: 'relative',
        }}
        display={'flex'}
      >
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: '10px',
            width: '100%',
            height: '50px',
            color: '#068987',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textTransform: 'math-auto',
            cursor: !isValidBreakButton() ? 'no-drop' : 'pointer',
            '&:hover': {
              color: '#068987',
              background: '#fff',
            },
          }}
          onClick={handleToggleBreak}
          // disabled={
          //   homeData?.today_activity?.check_in === '-' ||
          //   homeData?.today_activity?.check_out !== '-'
          // }
          disabled={!isValidBreakButton()}
        >
          <Image
            src={icon || ''}
            style={{ marginRight: '10px' }}
            width={20}
            height={20}
            alt="TeaIcon"
          />
          {homeData?.today_activity?.break === '-' ||
          !homeData?.today_activity?.break
            ? PUNCH_IN?.markBreakin
            : PUNCH_IN?.markBreakout}
          {(homeData?.today_activity?.break !== '-' ||
            !homeData?.today_activity?.break) &&
            homeData?.today_activity?.resume === '-' && (
              <span>&nbsp; {timer}</span>
            )}
        </Button>
      </Box>
    </Box>
  );
};
export default MarkBreak;
