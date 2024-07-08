import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

import { FILTER } from '@/src/constants/filter';

const ResetButton = ({
  onSubmit,
  handleReset,
  isLoadingSubmit,
  isLoadingReset,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        paddingTop: '20px',
        justifyContent: 'center',
        gap: '15px',
      }}
    >
      <Button
        sx={{
          width: { xs: '105px', sm: '120px' },
          height: '40px',
          fontSize: '16px',
          fontWeight: 600,
          background: isLoadingReset ? '#ccc' : '#F23F3A',
          color: '#fff',
          '&:hover': {
            background: isLoadingReset ? '#ccc' : '#F23F3A',
            color: '#fff',
          },
        }}
        disabled={isLoadingReset}
        onClick={handleReset}
        startIcon={
          !isLoadingReset && (
            <Image
              width={20}
              height={22}
              alt="Refresh"
              src={`/images/filter/reset.svg`}
              style={{ color: '#fff' }}
            />
          )
        }
      >
        {isLoadingReset ? (
          <CircularProgress size={26} color="secondary" />
        ) : (
          FILTER?.Reset
        )}
      </Button>
      <Button
        type="submit"
        variant="primary"
        disabled={isLoadingSubmit}
        sx={{
          width: { xs: '105px', sm: '120px' },
          background: isLoadingSubmit && '#ccc !important',
          height: '40px',
          fontSize: '16px',
          fontWeight: 600,
        }}
        onClick={onSubmit}
        startIcon={
          !isLoadingSubmit && (
            <Image
              width={20}
              height={22}
              alt="Refresh"
              src={`/images/filter/search.svg`}
            />
          )
        }
      >
        {isLoadingSubmit ? (
          <CircularProgress size={26} color="secondary" />
        ) : (
          FILTER?.search
        )}
      </Button>
    </Box>
  );
};
export default ResetButton;
