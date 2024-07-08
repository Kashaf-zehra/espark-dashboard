import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import StatusBox from './StatusBox';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
import { Summary_Slider_Breakpoints } from '@/src/constants/employeeDashboard';

const SummarySlider = ({ summaryBoxes, isLoading }) => {
  const { attendance_summary } =
    useSelector((state) => state?.emp?.home?.homeData) || {};

  return (
    <>
      <Swiper
        breakpoints={Summary_Slider_Breakpoints}
        freeMode={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {summaryBoxes?.map((item, index) => (
          <SwiperSlide key={index}>
            {isLoading ? (
              <Stack
                direction={'row'}
                sx={{
                  width: { xs: '100%', md: '100%' },
                  height: '110px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  background: 'rgb(249 250 251)',
                  '@media (min-width: 900px) and (max-width: 1290px)': {
                    height: '110px',
                  },
                }}
              >
                <Stack spacing={1.2} sx={{ justifyContent: 'center', pl: 3 }}>
                  <Stack spacing={0.5}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '0.2rem' }}
                      width={'27px'}
                    />
                    <Skeleton variant="text" width={90} height={30} />
                  </Stack>
                  <Skeleton variant="text" width={22} height={30} />
                </Stack>
                <Stack sx={{ justifyContent: 'center', pr: 3 }}>
                  <Box
                    sx={{
                      width: '15px',
                      height: '15px',
                    }}
                  >
                    <Box
                      component={'img'}
                      src="/icons/arrow-right.svg"
                      width={'auto'}
                      height={'auto'}
                      alt="arrow"
                    />
                  </Box>
                </Stack>
              </Stack>
            ) : (
              <StatusBox
                isLoading={isLoading}
                title={item?.title}
                count={item?.count}
                horizontalLineColor={item?.horizontalLineColor}
                backgroundColor={item?.backgroundColor}
                image={item?.image}
                value={attendance_summary?.[item?.name]}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SummarySlider;
