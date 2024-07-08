import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/src/services/apiService';
import {
  HR_GET_CLIENT_PROFILE,
  HR_UPDATE_EMP_IMAGE,
} from '@/src/services/apiService/apiEndPoints';
import { useMutation } from '@tanstack/react-query';
import { Toast } from '../Toast/Toast';
import { updateCurrentEmployeeImage } from '@/src/redux/slices/hrSlices/employeeSlice';
import { updateCurrentClientImage } from '@/src/redux/slices/hrSlices/clientSlice';

const EditModal = ({ handleOpenModal, onClose, isClient }) => {
  const dispatch = useDispatch();
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const { currentClient } = useSelector((state) => state?.hr?.clients);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      console.log({ formVals });
      const formData = new FormData();
      for (const key in formVals.data) {
        formData.append(key, formVals.data[key]);
      }
      return api.updateData(
        `${isClient ? HR_GET_CLIENT_PROFILE : HR_UPDATE_EMP_IMAGE}/?id=${formVals.id}`,
        formData
      );
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Profile picture updated successfully');
      if (isClient) {
        dispatch(updateCurrentClientImage(data?.image));
      } else {
        dispatch(updateCurrentEmployeeImage(data?.image));
      }
      console.log({ data });
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      onClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    // console.log({ selectedFile });
    document.getElementById('fileInput').click();
  };
  const handleSubmit = () => {
    // console.log({ selectedFile, imagePreview });
    mutate({
      id: isClient ? currentClient.id : currentEmployee.id,
      data: {
        image: selectedFile,
      },
    });
  };
  // const handleRemove = () => {
  //   setSelectedFile(null);
  //   setImagePreview(null);
  // };

  return (
    <Box>
      <Modal
        open={handleOpenModal}
        onClose={onClose}
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
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              src={'/images/leave-request/close.svg'}
              width={25}
              height={25}
              alt="close"
              onClick={onClose}
              style={{
                marginTop: '10px',
                marginRight: '10px',
              }}
            />
          </Box>

          <Box
            sx={{
              padding: { xs: '10px', md: '0px' },
              display: 'flex',
              gap: { xs: '10px', md: '15px' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {EDIT_MODAL?.editProfile}
            </Typography>
            <Box
              component={'img'}
              src={
                imagePreview
                  ? imagePreview
                  : isClient
                    ? currentClient?.image_path
                    : currentEmployee?.image_path
              }
              width={100}
              height={100}
              alt="employee"
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Button
                variant="primary"
                sx={{
                  width: { xs: '100px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: isPending && '#888 !important',
                }}
                disabled={isPending}
                onClick={selectedFile ? handleSubmit : handleClick}
              >
                {!selectedFile ? (
                  EDIT_MODAL?.change
                ) : selectedFile && isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  'Submit'
                )}
              </Button>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept="image/*"
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditModal;
