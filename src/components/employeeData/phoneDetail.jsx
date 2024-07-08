import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Image from 'next/image';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';

const ContactDetails = () => {
  const [showSecondBox, setShowSecondBox] = useState(false);
  const handleToggleBox = () => {
    setShowSecondBox((prev) => !prev);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
        {EDIT_MODAL?.phone}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}
        >
          <TextField
            sx={{ width: '82%' }}
            placeholder={EDIT_MODAL?.phoneNo}
            inputProps={{
              style: {
                height: '10px',
              },
            }}
          />
          <Image
            src={'/images/dashboard/plus.svg'}
            width={20}
            height={20}
            alt={showSecondBox ? 'minus' : 'plus'}
            onClick={handleToggleBox}
            style={{ cursor: 'pointer' }}
          />
        </Box>

        {showSecondBox && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
            }}
          >
            <TextField
              sx={{ width: '82%' }}
              placeholder={EDIT_MODAL?.phoneNo}
              inputProps={{
                style: {
                  height: '10px',
                },
              }}
            />
            <Image
              src={'/images/dashboard/minus.svg'}
              width={20}
              height={20}
              alt="minus"
              onClick={handleToggleBox}
              style={{ cursor: 'pointer' }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ContactDetails;
