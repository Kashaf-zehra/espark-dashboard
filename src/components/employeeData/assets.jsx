import React, { useState } from 'react';
import { Box } from '@mui/material';

import { ASSET_TABLECOLUMN } from '@/src/constants/employeeProfile';
import AppTable from '../appTableNew/AppTable';
import AppConfirmationMadal from '../modals/AppConfirmationMadal';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  HR_ADD_EMP_ASSET,
  HR_GET_EMP_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpAssetRequestFailed,
  getEmpAssetRequest,
  getEmpAssetRequestSuccess,
  deleteEmpAsset,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '../Toast/Toast';
import dayjs from 'dayjs';

const Assets = () => {
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [deletingAssetId, setDeletingAssetId] = useState(null);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      // dispatch(deleteClientHiringRequest());
      return api.daleteData(`${HR_ADD_EMP_ASSET}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Asset deleted successfully');
      // dispatch(deleteClientHiringRequestSuccess(modalData?.id));
      handleClose();
      dispatch(deleteEmpAsset(deletingAssetId));
      setDeletingAssetId(null);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      // dispatch(deleteClientHiringRequestFailed());
    },
  });
  const params = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { assets } = useSelector((state) => state?.hr?.employees);
  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-employee-get-asset'],
    queryFn: async () => {
      dispatch(getEmpAssetRequest());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params.id}&tab=assets`)
        .then(({ data }) => {
          const tempAssets = data?.length
            ? data?.map((item) => ({
                ...item,
                assigned_date: dayjs(item.assigned_date).format(
                  'YYYY-MM-DD h:m A'
                ),
                assignee: [item?.assignee_name, item?.assignee_email],
                action: ['Delete'],
              }))
            : [];
          dispatch(getEmpAssetRequestSuccess(tempAssets));
          return tempAssets || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getEmpAssetRequestFailed());
          console.log({ err });
        });
    },
  });

  const handleClickDelete = (a, b) => {
    console.log({ a, b });
    setDeletingAssetId(b?.id);
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);
  const handleDelete = () => {
    mutate(deletingAssetId);
  };

  function processColumns() {
    if (
      role === 'super_admin' ||
      (role !== 'super_admin' && employee_perms[0].delete)
    )
      return ASSET_TABLECOLUMN;
    else {
      return ASSET_TABLECOLUMN.filter((item) => item.name !== 'action');
    }
  }

  return (
    <>
      <>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto',
          }}
        >
          <AppTable
            column={processColumns()}
            data={assets}
            handleClickActionDelete={handleClickDelete}
            isLoading={isLoading}
          />
        </Box>
      </>
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={`Are you sure you want to delete asset?`}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleDelete}
        isLoading={isPending}
      />
    </>
  );
};

export default Assets;
