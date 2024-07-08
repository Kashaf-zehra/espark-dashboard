import React from 'react';
import { Box, Modal } from '@mui/material';
import Image from 'next/image';

import RequestHeading from './modalHeading';
import LeaveRequest from './leaveRequestView';

const RequestviewModal = ({ open, onClose, isViewingClient, title }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        height: { xs: '850px', md: '900px' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          bgcolor: '#fff',
          width: { xs: '80%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        }}
      >
        {isViewingClient && (
          <Box
            sx={{
              background: '#fff',
              borderRadius: '20px',
              width: '40px',
              padding: '2.5px',
              position: 'absolute',
              top: '2%',
              right: '25%',
            }}
          >
            <Image
              src="/images/leave-request/cancel.svg"
              width={37}
              height={37}
              alt="cancel"
              onClick={onClose}
            />
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
          }}
        >
          <RequestHeading title={title} />
          <LeaveRequest onClose={onClose} createLeaveRequest />
        </Box>
      </Box>
    </Modal>
  );
};
export default RequestviewModal;
