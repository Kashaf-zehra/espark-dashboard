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

const MarkBreak = ({ icon }) => {
  const [time, setTime] = useState('');
  const [timerState, setTimerState] = useState({
    startTime: null,
    elapsedTime: 0,
    timerActive: false,
  });
  const [currentBreakTime, setCurrentBreakTime] = useState(null);

  const isValidBreakButton = () => {
    if (
      homeData?.today_activity?.check_in === '-' ||
      !homeData?.today_activity?.check_in
    ) {
      return false;
    } else if (
      homeData?.today_activity?.check_in !== '-' ||
      homeData?.today_activity?.check_in
    ) {
      if (
        homeData?.today_activity?.check_out !== '-' ||
        !homeData?.today_activity?.check_out
      ) {
        return false;
      } else if (
        homeData?.today_activity?.check_out === '-' ||
        homeData?.today_activity?.check_out
      ) {
        if (homeData?.today_activity?.resume !== '-') {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
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
        setCurrentBreakTime(dayjs().format('hh:mm:ss A'));
        dispatch(markBreak(time));
      } else {
        dispatch(markResume(time));
      }
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleToggleBreak = () => {
    if (
      homeData?.today_activity?.resume &&
      homeData?.today_activity?.resume !== '-'
    ) {
      return;
    } else {
      const data = {
        time: dayjs().format('hh:mm A'),
      };
      if (timerState.timerActive) {
        pauseTimer();
      } else {
        startTimer();
      }
      setTime(data?.time);
      mutate(data);
    }
  };
  const startTimer = () => {
    const startTime = new Date(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ` +
        currentBreakTime
    ).getTime();
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      // console.log({
      //   elapsedTime,
      //   currentTime,
      //   startTime,
      // });

      setTimerState((prevState) => ({
        ...prevState,
        elapsedTime: elapsedTime,
      }));
    }, 1000);
    setTimerState((prevState) => ({
      ...prevState,
      startTime: startTime,
      intervalId: intervalId,
      timerActive: true,
    }));
  };
  const pauseTimer = () => {
    clearInterval(timerState.intervalId);
    const now = new Date().getTime();
    const elapsed = now - timerState.startTime;
    setTimerState((prevState) => ({
      ...prevState,
      elapsedTime: prevState.elapsedTime + elapsed,
      timerActive: false,
    }));
  };
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    setCurrentBreakTime(homeData?.today_activity?.break);
  }, [homeData?.today_activity?.break]);

  useEffect(() => {
    if (
      homeData?.today_activity?.break !== '-' &&
      homeData?.today_activity?.resume === '-' &&
      currentBreakTime
    ) {
      startTimer();
      // startTime().then(() => {
      // });
    }
  }, [currentBreakTime]);

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
            cursor: !isValidBreakButton() !== '-' ? 'no-drop' : 'pointer',
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
          />
          {homeData?.today_activity?.break === '-' ||
          !homeData?.today_activity?.break
            ? PUNCH_IN?.markBreakin
            : PUNCH_IN?.markBreakout}
          {timerState.timerActive && (
            <span>&nbsp; {formatTime(timerState.elapsedTime)}</span>
          )}
        </Button>
      </Box>
    </Box>
  );
};
export default MarkBreak;
