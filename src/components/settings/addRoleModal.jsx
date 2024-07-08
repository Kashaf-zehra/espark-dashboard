import React from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { SETTING } from '@/src/constants/SettingHr';

const RoleModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          width: { xs: '60%', md: '27%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          position: 'absolute',
          top: '10%',
          maxHeight: '75%',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            {SETTING?.addRole}
          </Typography>
          <Box
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={handleClose}
          ></Box>
        </Box>
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '15px',
              padding: '30px',

              width: '400px',
              '@media (min-width: 280px) and (max-width: 1400px)': {
                width: '100%',
              },
            }}
          >
            <Typography>{SETTING?.roleName}</Typography>
            <TextField
              sx={{}}
              inputProps={{
                style: {
                  height: '10px',
                },
              }}
              placeholder="Enter role name"
            />
            <Button
              variant="primary"
              sx={{ width: '120px', marginTop: '10px' }}
            >
              {SETTING?.add}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default RoleModal;
