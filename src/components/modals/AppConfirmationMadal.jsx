import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';

const AppConfirmationMadal = ({
  title,
  bodyText,
  confirmButtonText,
  cancelButtonText,
  handleClose,
  isOpen,
  handleConfirm,
  isLoading,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <>
        <Box
          sx={{
            bgcolor: '#fff',
            maxWidth: '450px',
            minHeight: '250px',
            width: '92%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            overflowY: 'auto',
            padding: '38px 0',
            // '@media (min-width: 1200px) and (max-width: 1360px)': {
            //   width: '35%',
            // },
          }}
        >
          <Box display={'flex'} justifyContent="center">
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: '24px',
                letterSpacing: '0em',
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent="center" my={'50px'}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '17px',
                letterSpacing: '0em',
                textAlign: 'left',
                '@media(min-width:280px) and (max-width:390px)': {
                  fontSize: '12.5px',
                  textAlign: 'center',
                },
              }}
            >
              {bodyText}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent="center">
            <Button
              onClick={handleClose}
              sx={{
                width: { xs: '100px', md: '120px' },
                mr: '15px',
                fontSize: '16px',
                fontWeight: 600,
                '&:hover': {
                  background: '#fff',
                  color: 'teal',
                },
              }}
              variant="outlined"
            >
              {cancelButtonText}
            </Button>
            <Button
              onClick={handleConfirm}
              sx={{
                width: {
                  xs: '100px',
                  md: '120px',
                },
                fontSize: '16px',
                fontWeight: 600,
              }}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={26} color="secondary" />
              ) : (
                confirmButtonText
              )}
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default AppConfirmationMadal;
