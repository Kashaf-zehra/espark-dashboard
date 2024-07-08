import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
// import { removeActiveClientAndData } from '@/src/redux/slices/hrSlices/clientSlice';
// import { useDispatch } from 'react-redux';

const Breadcrumb = ({ title, currentPage, root, dispatchFunction }) => {
  const router = useRouter();
  // const dispatch = useDispatch();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      mb={'36px'}
      sx={{ cursor: 'pointer' }}
    >
      <Image
        src={'/icons/Back.svg'}
        alt="Back"
        width={10}
        height={10}
        onClick={() => {
          dispatchFunction?.();
          router.back();
        }}
      />
      <Box display={'flex'} alignItems={'center'} ml={'10px'}>
        <Typography
          sx={{
            color: '#595959',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
          onClick={() => router.push(`/hr/dashboard/${root || 'employees'}`)}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: '#595959',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            ml: '2px',
          }}
        >
          {currentPage}
        </Typography>
      </Box>
    </Box>
  );
};

export default Breadcrumb;
