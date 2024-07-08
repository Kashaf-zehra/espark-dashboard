import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { PUNCH_IN } from '@/src/constants/punchIn/createPunch';
import MarkCheckIn from './MarkCheckin';
import MarkCheckOut from './MarkCheckout';
import MarkBreak from './MarkBreakNew';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

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

const MarkClock = ({ data, isLoading }) => {
  const { title, clock_icon, break_out_icon } = data || {};
  const { homeData } = useSelector((state) => state?.emp?.home);
  const [timer, setTimer] = useState('00:00:00');
  const [timerPercentage, setTimerPercentage] = useState(0);
  useEffect(() => {
    let interval;
    if (
      homeData?.today_activity?.check_in === '-' &&
      homeData?.today_activity?.check_out === '-'
    ) {
      // If check_in is '-' or check_out is not set, return and do not update the timer
      setTimer('00:00:00');
      setTimerPercentage(0);
      return;
    } else if (
      homeData?.today_activity?.check_in !== '-' &&
      homeData?.today_activity?.check_out === '-'
    ) {
      // If check_in is set but check_out is not set, run the interval to update the timer
      interval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString([], {
          hour12: false,
        });
        const timeDifference = getTimeDifference(
          homeData?.today_activity?.check_in,
          currentTime
        );
        setTimer(timeDifference);

        const totalMilliseconds = 9 * 60 * 60 * 1000;
        const currentDateTime = new Date();
        const elapsedMilliseconds =
          new Date() -
          new Date(
            `${currentDateTime.getMonth() + 1}/${currentDateTime.getDate()}/${currentDateTime.getFullYear()} ${homeData?.today_activity?.check_in}`
          );
        let elapsedPercentage = (elapsedMilliseconds / totalMilliseconds) * 100;
        // Ensure the percentage does not exceed 100
        elapsedPercentage = Math.min(elapsedPercentage, 100);
        setTimerPercentage(+elapsedPercentage.toFixed(2));
      }, 1000);
    } else {
      // Calculate total time and setTimer and setTimerPercentage
      const totalMilliseconds = 9 * 60 * 60 * 1000;
      const currentDateTime = new Date();
      const checkInDateTime = new Date(
        `${currentDateTime.getMonth() + 1}/${currentDateTime.getDate()}/${currentDateTime.getFullYear()} ${homeData?.today_activity?.check_in}`
      );
      const checkOutDateTime = new Date(
        `${currentDateTime.getMonth() + 1}/${currentDateTime.getDate()}/${currentDateTime.getFullYear()} ${homeData?.today_activity?.check_out}`
      );

      const elapsedMilliseconds = checkOutDateTime - checkInDateTime;
      let elapsedPercentage = (elapsedMilliseconds / totalMilliseconds) * 100;
      // Ensure the percentage does not exceed 100
      elapsedPercentage = Math.min(elapsedPercentage, 100);
      setTimerPercentage(+elapsedPercentage.toFixed(2));

      // Set the timer based on the difference between check_in and check_out
      const timeDifference = getTimeDifference(
        homeData?.today_activity?.check_in,
        homeData?.today_activity?.check_out
      );
      setTimer(timeDifference);
    }

    return () => clearInterval(interval);
  }, [homeData?.today_activity?.check_in, homeData?.today_activity?.check_out]);
  const preetyTime = (time) => {
    if (dayjs(time).format('hh:mm A') === 'Invalid Date') {
      return time;
    } else {
      return dayjs(time).format('hh:mm A');
    }
  };
  function convertTimeFormat(timeString) {
    if (timeString === '-') {
      return '--:-- --';
    } else {
      const [time, ampm] = timeString.split(' ');
      // Split the time into hours and minutes
      const [hours, minutes] = time.split(':');
      // Return the formatted time string
      return `${hours}:${minutes} ${ampm}`;
    }
    // Split the time string into hours, minutes, and am/pm parts
  }
  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '430px' },
        borderRadius: '10px',
        background: '#FFF',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
      }}
    >
      <Box
        sx={{
          px: 4,
          py: 2.5,
          minHeight: '70px',
          borderRadius: '10px 10px 0px 0px',
          borderBottom: '1px solid #E4E4E4',
          background: '#FFF',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '20px', md: '23px', lg: '25px' },
            textAlign: { xs: 'center', sm: 'left' },
            fontWeight: 600,
            color: '#171717',
            fontStyle: 'normal',
            lineHeight: 'normal',
          }}
        >
          {title || ''}
        </Typography>
      </Box>
      {isLoading ? (
        <Stack
          p={5}
          height={'80%'}
          alignItems={'center'}
          justifyContent={'center'}
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
        <Box>
          <Box
            sx={{
              px: { xs: 3, sm: 3, lg: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              rowGap: { xs: 0.7, sm: 0 },
              pt: 4.2,
              pb: 3,
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            display={'flex'}
          >
            <Typography
              sx={{
                color: '#595959',
                fontSize: { xs: '17px', sm: '20px' },
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                maxWidth: '200px',
              }}
            >
              {PUNCH_IN?.checkIn}
            </Typography>

            <Box display={'flex'} alignItems={'center'}>
              <Image
                src={clock_icon || ''}
                width={25}
                height={25}
                alt="Clock"
              />
              <Typography
                sx={{
                  color: '#171717',
                  textAlign: 'center',
                  fontSize: { xs: '14px', sm: '16px' },
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  minWidth: '80px',
                  mx:
                    convertTimeFormat(homeData?.today_activity?.check_in) ===
                    '--:-- --'
                      ? '18px'
                      : '18px',
                }}
              >
                {convertTimeFormat(homeData?.today_activity?.check_in)}
              </Typography>
              <Typography
                sx={{
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: { xs: '13px', sm: '14px' },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                {`Exp: ${preetyTime(homeData?.punch_timings?.check_in) || ''}`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              px: { xs: 3, sm: 3, lg: 3 },
              width: '100%',
              flexDirection: { xs: 'column', sm: 'row' },
              rowGap: { xs: 0.7, sm: 0 },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            display={'flex'}
          >
            <Typography
              sx={{
                color: '#595959',
                fontSize: { xs: '17px', sm: '20px' },
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                maxWidth: '200px',
              }}
            >
              {PUNCH_IN?.checkOut}
            </Typography>
            <Box display={'flex'} alignItems={'center'}>
              <Image
                src={clock_icon || ''}
                width={25}
                height={25}
                alt="Clock"
              />
              <Typography
                sx={{
                  color: '#171717',
                  textAlign: 'center',
                  fontSize: { xs: '14px', sm: '16px' },
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                  minWidth: '80px',
                  mx:
                    convertTimeFormat(homeData?.today_activity?.check_out) ===
                    '--:-- --'
                      ? '18px'
                      : '18px',
                }}
              >
                {convertTimeFormat(homeData?.today_activity?.check_out)}
              </Typography>
              <Typography
                sx={{
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: { xs: '13px', sm: '14px' },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                {`Exp: ${preetyTime(homeData?.punch_timings?.check_out) || ''}`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ py: '23px' }}>
            <Box
              sx={{
                height: '40px',
                mx: { xs: 3, sm: 3, lg: 3 },
                border: 'solid 1px #E4E4E4',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
              }}
              display={'flex'}
            >
              <Box
                sx={{
                  width: `${timerPercentage}%`,
                  background: '#E6F4F4',
                  height: '100%',
                }}
              ></Box>
              <Box
                sx={{
                  width: `${100 - timerPercentage}%`,
                  background: '#F5F5F5',
                  height: '100%',
                }}
              ></Box>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 'calc(50% - 24px)',
                  top: 'calc(50% - 8px)',
                  color: '#595959',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                {/* {elapsedTimeString} */}
                {timer}
              </Typography>
            </Box>
          </Box>
          <Box
            gap={'20px'}
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              mx: { xs: 3, sm: 3, lg: 3 },
              borderRadius: '5px',
              position: 'relative',
            }}
            display={'flex'}
          >
            <MarkCheckIn />
            <MarkCheckOut />
          </Box>
          <MarkBreak icon={break_out_icon} />
        </Box>
      )}
    </Box>
  );
};

export default MarkClock;
