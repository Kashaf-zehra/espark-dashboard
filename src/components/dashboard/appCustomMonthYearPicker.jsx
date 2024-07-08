import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const AppCustomMonthYearPicker = ({ setTimeTracking }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const componentRef = useRef(null);

  const handleYearChange = (increment) => {
    const newYear = currentYear + increment;
    const currYear = new Date().getFullYear();
    if (newYear > currYear || newYear < 1970) return;
    setSelectedDate(new Date(newYear, currentMonth, 1));
  };

  const handleMonthChange = (newMonth) => {
    console.log({
      newMonth,
      currentYear,
      date: new Date(currentYear, newMonth, 1),
    });
    setSelectedDate(new Date(currentYear, newMonth, 1));
    setTimeTracking({
      month: months[newMonth],
      year: currentYear,
    });
    setIsOpenCalendar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOpenCalendar(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Grid sx={{ position: 'relative' }} item xs={12} md={6}>
      <Box
        ref={componentRef}
        sx={{
          border: 'solid 1px #ccc',
          borderRadius: '5px',
          position: 'relative',
          width: '221px',
          padding: '3px',
        }}
      >
        <Box
          display={'flex'}
          justifyContent="flex-start"
          minWidth={'250px'}
          alignItems="center"
          borderRadius="5px"
          py={'5px'}
          px={'15px'}
          sx={{ cursor: 'pointer', marginLeft: '13px' }}
          onClick={() => setIsOpenCalendar((ps) => !ps)}
        >
          <Image
            src={'/icons/Calendar.svg'}
            alt="Calendar"
            width={25}
            height={25}
          />
          <Typography ml={'14px'} mt={0} color={'#595959'}>
            {`${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
          </Typography>
        </Box>
        {isOpenCalendar && (
          <Box
            sx={{
              border: 'solid 1px #ccc',
              background: '#fff',
              marginTop: '10px',
              width: '100%',
              position: 'absolute',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px 2px #ccc',
            }}
          >
            <Box
              display={'flex'}
              mt="10px"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                onClick={() => handleYearChange(-1)}
                src={'/icons/Back.svg'}
                width={12}
                height={12}
                alt="Back"
              />
              <Typography mx={'15px'}>{currentYear}</Typography>
              <Image
                onClick={() => handleYearChange(1)}
                src={'/icons/Next.svg'}
                width={12}
                height={12}
                alt="Next"
              />
            </Box>
            <Box display={'flex'} alignItems="center" flexWrap={'wrap'}>
              {months?.map((item, i) => (
                <Box
                  onClick={() => handleMonthChange(i)}
                  key={i}
                  sx={{
                    width: '33.33%',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    py={'5px'}
                    textAlign="center"
                    sx={{
                      margin: '5px 10px',
                      background:
                        item.substring(0, 3) ===
                          months[selectedDate.getMonth()].substring(0, 3) &&
                        '#029E9C',
                      color:
                        item.substring(0, 3) ===
                          months[selectedDate.getMonth()].substring(0, 3) &&
                        '#fff',
                    }}
                  >
                    {item.substring(0, 3)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default AppCustomMonthYearPicker;
