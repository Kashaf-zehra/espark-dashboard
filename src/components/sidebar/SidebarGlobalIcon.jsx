import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const SidebarGlobalIcon = ({ company_img }) => {
  const [imgSrc, setImgSrc] = useState(
    company_img || '/images/sidebar-icons/internet-logo.svg'
  );
  useEffect(() => {
    setImgSrc(company_img || '/images/sidebar-icons/internet-logo.svg');
  }, [company_img]);

  const handleError = () => {
    setImgSrc('/images/sidebar-icons/internet-logo.svg');
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#e6f5f4',
          border: '1px solid #029E9C',
          borderRadius: '100%',
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component={'img'}
          onError={handleError}
          width={'25px'}
          height={'25px'}
          sx={{ borderRadius: '100%' }}
          src={imgSrc || '/images/sidebar-icons/internet-logo.svg'}
        />
      </Box>
    </>
  );
};

export default SidebarGlobalIcon;
