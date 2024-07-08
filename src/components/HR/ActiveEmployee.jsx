'use client';
import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/system';

import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { TERMINATE_MODAL } from '@/src/constants/contractSigned';
import EmployeeCard from './EmployeeCard';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { updateClientEmpStatus } from '@/src/redux/slices/hrSlices/clientSlice';
import { Toast } from '../Toast/Toast';
import { useDispatch } from 'react-redux';
import EmployeeCardSkeleton from './EmployeeCardSkeleton';

const EmployeeStatus = ({ empData, isFetching }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [empId, setEmpId] = useState(null);
  const [empStatus, setEmpStatus] = useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const isBetween1400And1200 = useMediaQuery(
    '(min-width: 1200px) and (max-width: 1400px)'
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpen(id);
    event.stopPropagation();
  };
  const handleOpenRemove = (event, id) => {
    setEmpId(id);
    setEmpStatus('terminate');
    setIsOpen(true);
    event.stopPropagation();
  };
  const handleOpenActive = (event, id) => {
    setEmpId(id);
    setEmpStatus('active');
    setIsOpen(true);
    event.stopPropagation();
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(null);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const updateClientEmpMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(`${HR_CLIENT_EMPLOYEES}?id=${data?.id}`, {
        status: data?.status,
      });
    },
    onSuccess: () => {
      Toast('success', 'Employee status updated successfully');
      dispatch(
        updateClientEmpStatus({
          id: empId,
          status: empStatus,
        })
      );
      setEmpId(null);
      setEmpStatus(null);
      handleCloseModal();
      setOpen(null);
    },
  });
  const handleConfirm = () => {
    updateClientEmpMutation.mutate({ id: empId, status: empStatus });
  };
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  return (
    <>
      <Box sx={{ maxWidth: '1485px' }}>
        <Grid
          container
          sx={{
            marginTop: '20px',
            [theme.breakpoints.up('md')]: {
              paddingLeft: '20px',
            },
          }}
          rowGap={1}
          spacing={isMobile ? 2 : 5}
        >
          {isFetching ? (
            <EmployeeCardSkeleton breakPoint={isBetween1400And1200} />
          ) : !isFetching && empData.length ? (
            empData?.map((eachItem, index) => (
              <EmployeeCard
                key={index}
                eachItem={eachItem}
                breakPoint={isBetween1400And1200}
                handleClick={handleClick}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                handleOpenRemove={handleOpenRemove}
                handleOpenActive={handleOpenActive}
                isLoading={updateClientEmpMutation.isPending}
              />
            ))
          ) : (
            <Typography sx={{ display: 'flex', mx: 'auto' }}>
              No Record Found
            </Typography>
          )}
        </Grid>
      </Box>
      <AppConfirmationMadal
        title={empStatus === 'active' ? 'Activate' : TERMINATE_MODAL?.terminate}
        bodyText={
          empStatus === 'active'
            ? 'Are you sure you want to activate this employee ?'
            : TERMINATE_MODAL?.warning
        }
        cancelButtonText={TERMINATE_MODAL?.cancel}
        confirmButtonText={
          empStatus === 'active' ? 'Activate' : TERMINATE_MODAL?.terminate
        }
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
        isLoading={updateClientEmpMutation.isPending}
      />
    </>
  );
};

export default EmployeeStatus;
