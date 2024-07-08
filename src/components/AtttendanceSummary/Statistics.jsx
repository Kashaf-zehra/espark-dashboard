import { Statistics_Data } from '@/src/constants/employeeDashboard';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';

const Statistics = ({ isLoading }) => {
  const { homeData } = useSelector((state) => state?.emp?.home);
  const getPercentage = (time) => {
    const tempTime = time.split(' ')[0].split('/');
    const spentPercentage = (tempTime[0] / (tempTime[1] || '20')) * 100;
    return Math.round(spentPercentage);
  };
  return (
    <>
      {Object?.keys(homeData)?.length && (
        <Box
          sx={{
            maxWidth: 'auto',
            height: '470px',
            borderRadius: '10px',
            background: '#FFF',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          }}
        >
          <Box
            sx={{
              px: 4,
              py: 2.5,
              height: '70px',
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
              }}
            >
              Statistics
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
            <Box p={'20px'}>
              {Statistics_Data?.map(
                (
                  {
                    title,
                    //   hoursCompleted,
                    //   totalHours,
                    remainingBack,
                    background,
                    name,
                  },
                  index
                ) => {
                  return (
                    <Box
                      sx={{
                        boxShadow: '0px 0px 5px 2px #ccc',
                        borderRadius: '5px',
                        width: '100%',
                        mb: '20px',
                        p: '10px',
                      }}
                      display={'flex'}
                      flexDirection={'column'}
                      key={index}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                      >
                        <Typography
                          sx={{
                            color: '#171717',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                          }}
                        >
                          {title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#171717',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                          }}
                        >
                          {homeData?.statistics?.[name]}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: '10px',
                          border: 'solid 1px #ccc',
                          borderRadius: '5px',
                          position: 'relative',
                          overflow: 'hidden',
                          mt: '10px',
                        }}
                        display={'flex'}
                        flexDirection={'row-reverse'}
                      >
                        <Box
                          sx={{
                            width: `${
                              getPercentage(homeData?.statistics[name]) < 100
                                ? getPercentage(homeData?.statistics[name])
                                : 100
                            }%`,
                            background: background,
                            height: '100%',
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: `${
                              100 - getPercentage(homeData?.statistics[name])
                            }%`,
                            background: remainingBack,
                            height: '100%',
                          }}
                        ></Box>
                      </Box>
                    </Box>
                  );
                }
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Statistics;
