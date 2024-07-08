import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const PasswordSection = ({ User_Password, handleData }) => {
  const handleChangeInput = (label, value) => {
    const fieldName = `${label}`;
    handleData(fieldName, value);
  };
  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', my: 4 }}
      >
        <Typography
          variant="body2"
          sx={{ color: '#171717', fontWeight: '500' }}
        >
          {User_Password?.title}
        </Typography>
        {User_Password?.Fields?.map((item, index) => (
          <Box component={'div'} key={index}>
            <Typography
              variant="body1"
              sx={{ mb: 1, color: '#595959', fontWeight: '500' }}
            >
              {item?.label}
            </Typography>
            <TextField
              placeholder={item?.place}
              type={item?.type}
              variant="outlined"
              inputProps={{
                style: {
                  height: '40px',
                  padding: '0px 20px',
                },
              }}
              sx={{
                fontWeight: 400,
                fontSize: '14px',
                color: '#666',
                width: '300px',
                // height: 'auto',
                '@media (max-width: 562px)': {
                  width: '100%',
                },
              }}
              onChange={(event) => {
                handleChangeInput(item?.label, event.target.value);
              }}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            backgroundColor: '#888',
            width: '120px',
            height: '40px',
            '@media (max-width: 380px)': {
              width: '100%',
            },
            '&:hover': {
              backgroundColor: '#888',
            },
          }}
        >
          {User_Password?.buttonText}
        </Button>
      </Box>
    </>
  );
};

export default PasswordSection;
