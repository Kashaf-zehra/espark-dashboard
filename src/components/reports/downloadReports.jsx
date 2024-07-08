import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

import DatePickerModal from './Modal';

const DownloadReports = ({
  image,
  reportHeading,
  downloadReports,
  downloadBtn,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #E4E4E4',
        borderRadius: '10px',
        flexDirection: 'column',
        padding: '35px',
        gap: '15px',
        '@media (min-width:1200px) and (max-width:1300px)': {
          width: '350px',
        },
        width: { xs: '100%', sm: '100%', md: '350px', lg: '400px' },
      }}
    >
      <Image src={image} width={50} height={50} alt={reportHeading} />
      <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
        {reportHeading}
      </Typography>
      <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#595959' }}>
        {downloadReports}
      </Typography>
      <Button
        variant="primary"
        sx={{
          width: { xs: '120px', md: '120px' },
          height: '40px',
          padding: '8px',
          fontSize: '16px',
          fontWeight: 600,
        }}
        onClick={handleOpen}
      >
        {downloadBtn}
      </Button>
      {open && <DatePickerModal handleClose={handleClose} open={open} />}
    </Box>
  );
};
export default DownloadReports;
