import { Box, Typography } from '@mui/material';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navigator = ({
  formSteps,
  currentStep,
  navigationLabelWidth = '55px',
  navigationPadding = '35px 0px 66px 0px',
}) => {
  const isXsScreen = useMediaQuery('(max-width:600px)');
  return (
    <Box
      sx={{
        display: 'flex',
        padding: navigationPadding,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: '0',
        borderRadius: '10px 10px 0px 0px',
        background: '#029894',
      }}
    >
      {formSteps?.map(({ title, countNo }, stepIndex) => {
        return (
          <Box
            key={stepIndex}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              position={'relative'}
            >
              <Box
                sx={{
                  borderRadius: '50px',
                  width: { xs: '30px', sm: '50px' },
                  height: { xs: '30px', sm: '50px' },
                  border: '1px solid #FFF',
                  background: countNo === currentStep ? '#068987' : '#CFF0F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '@media (min-width: 280px) and (max-width: 400px)': {
                    width: '25px',
                    height: '25px',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: countNo === currentStep ? '#FFF' : '#595959',
                    fontSize: { xs: '12px', sm: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  {countNo}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { xs: '56px', sm: navigationLabelWidth },
                  position: 'absolute',
                  bottom: '-30px',
                }}
              >
                <Typography
                  sx={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontSize: '10px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    minHeight: '24px',
                    '@media (min-width: 400px) and (max-width: 600px)': {
                      fontSize: '10px',
                    },
                    '@media (min-width: 300px) and (max-width: 400px)': {
                      fontSize: '8px',
                      // width: '60px',
                    },
                    '@media (min-width: 270px) and (max-width: 300px)': {
                      fontSize: '7px',
                    },
                  }}
                >
                  {isXsScreen && currentStep !== stepIndex + 1 ? '...' : title}
                </Typography>
              </Box>
            </Box>
            {stepIndex < formSteps.length - 1 && (
              <Box
                sx={{
                  width: { xs: '25px', sm: '50px' },
                  height: '2px',
                  flexShrink: '0',
                  border: '0.5px solid #FFF',
                  background: '#FFF',
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Navigator;
