import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';

import { SIGNOUT_MODAL_DATA } from '@/src/constants/signoutModal';

const SignoutModal = ({ openModal, setOpenModal, onClick }) => {
  const handleClose = () => setOpenModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const Loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpenModal(false);
    }, 2000);
  };
  const handleButtonClick = () => {
    onClick();
    Loading();
  };
  return (
    <Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            background: '#fff',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            '@media (max-width: 499px)': {
              width: '90%',
            },
            height: { xs: '250px', sm: '250px' },
            boxShadow: 24,
            borderRadius: '5px',
          }}
        >
          <Box
            sx={{
              p: { xs: 6.7, sm: 6.7 },
              display: 'flex',
              gap: { xs: '20px', lg: '28px' },
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {SIGNOUT_MODAL_DATA?.signout}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: '#595959' }}
            >
              {SIGNOUT_MODAL_DATA?.signoutAccount}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Button
                sx={{
                  borderRadius: '5px',
                  border: '1px solid #595959',
                  color: ' #595959',
                  width: { xs: '90px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                onClick={handleClose}
              >
                {SIGNOUT_MODAL_DATA?.cancel}
              </Button>
              <Button
                disabled={isLoading}
                sx={{
                  width: { xs: '100px', sm: '120px' },
                  height: '40px',
                  fontSize: { xs: '14px', md: '16px' },
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: isLoading ? '#ccc' : '#029894',
                  '&:hover': {
                    backgroundColor: isLoading ? '#ccc' : '#029894',
                  },
                  '& .MuiCircularProgress-root': {
                    marginRight: '8px',
                  },
                  '@media (min-width: 270px) and (max-width: 300px)': {
                    lineHeight: '1rem',
                  },
                }}
                onClick={handleButtonClick}
              >
                {isLoading && <CircularProgress size={26} color="secondary" />}
                {!isLoading && SIGNOUT_MODAL_DATA?.signoutBtn}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SignoutModal;
