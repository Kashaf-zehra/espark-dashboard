import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const StatusBox = ({
  title,
  count,
  horizontalLineColor,
  backgroundColor,
  isHr,
  image,
  value,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: isHr ? '300px' : '100%',
          minWidth: isHr ? '275px' : '100%',
          height: '110px',
          borderRadius: '10px',
          background: `${backgroundColor}`,
          justifyContent: 'space-between',
          alignItems: 'center',
          '@media (max-width: 319px)': {
            minWidth: '100%',
            maxWidth: '100%',
          },
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'start',
            pl: 3,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <hr
              style={{
                width: '27px',
                height: '3px',
                backgroundColor: `${horizontalLineColor}`,
              }}
            />
            <Typography
              sx={{
                color: '#000',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {isHr ? count : title}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: '#595959',
                fontSize: { xs: '14px', sm: '16px' },
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              {isHr ? title : value}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '25px',
          }}
        >
          {isHr ? (
            <Box
              component={'img'}
              src={image}
              alt="hrview"
              sx={{
                width: { xs: 40, sm: 50 },
                height: { xs: 40, sm: 50 },
                marginRight: { xs: 0, sm: '10px' },
              }}
            />
          ) : (
            <Image
              src="/icons/arrow-right.svg"
              width={15}
              height={15}
              alt="arrow"
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default StatusBox;
