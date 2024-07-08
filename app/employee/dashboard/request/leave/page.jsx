'use client';
import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Modal,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import LeaveRequestModal from './LeaveRequestModal';
import LeaveViewModal from '@/app/client/dashboard/team/time-off/LeaveViewModal';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import LeaveBalanceTable from './LeaveBalanceTable';
import LeaveRequestTablesTabs from './LeaveRequestTablesTabs';
import { useMutation } from '@tanstack/react-query';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEmpLeaveRequest,
  deleteEmpLeaveRequestSuccess,
  deleteLeaveRequestDataFailed,
  fetchEmpLeaveRequestData,
  getEmpLeaveRequestDataFailed,
  getEmpLeaveRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Toast } from '@/src/components/Toast/Toast';
import dayjs from 'dayjs';

const Dashboard = () => {
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      dispatch(deleteEmpLeaveRequest());
      return api.daleteData(`${EMP_LEAVE_REQUEST}/?id=${id}`);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data deleted successfully');
      console.log({ data });
      dispatch(deleteEmpLeaveRequestSuccess(modalData?.id));
      handleCloseDeleteModal();
      setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      dispatch(deleteLeaveRequestDataFailed(modalData?.id));
      handleCloseDeleteModal();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickActionView = (props) => {
    setViewClicked(true);
    const {
      row: {
        id,
        status,
        employee_name,
        count,
        leave_type,
        start_date,
        end_date,
        reason,
        employee_id,
      },
    } = props;

    setModalData({
      id,
      status,
      employee_name: employee_name,
      employee_id,
      count,
      leave_type,
      start_date,
      end_date,
      reason,
    });
    setOpen(true);
  };
  const handleClickActionDelete = (props) => {
    setModalData({ id: props });
    setIsOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    mutate(modalData.id);
    setOpen(false);
  };

  const handleOpenConditionalModal = (rowType, actionType) => {
    if (rowType === 'Pending') {
      if (actionType === 'View') {
        // render pending view modal
      } else {
        // render pending reject modal
      }
    } else if (rowType === 'Completed') {
      // render completed modal
    } else if (rowType === 'Rejected') {
      // render completed modal
    } else {
      // render cancelled modal
    }
  };
  const reformData = (dataObj) => {
    const arrayfiedData = Object.entries(dataObj);
    const refinedData = [];
    for (let i = 0; i < arrayfiedData.length; i++) {
      const element = arrayfiedData[i];
      console.log({ element });
      if (i > 0) {
        refinedData.push({
          leave_type: element[0],
          pending: +element[1].total - +element[1].balance,
          // requested_at:element[1],
          available: +element[1].total - +element[1].balance,
          ...element[1],
        });
      }
    }
    return refinedData;
  };
  const refreshMutation = useMutation({
    mutationFn: async () => {
      dispatch(fetchEmpLeaveRequestData());
      return api.getData(
        `${EMP_LEAVE_REQUEST}/?workspace=${currentWorkSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      const tempData = {
        ...data,
        balance: reformData(data?.balance),
        requests: data?.requests?.length
          ? data?.requests?.map((item) => ({
              ...item,
              requested_at: dayjs(item?.requested_at).format(
                'YYYY-MM-DD hh:mm A'
              ),
            }))
          : [],
      };
      dispatch(getEmpLeaveRequestDataSuccess(tempData));
      return data;
    },
    onError: (err) => {
      dispatch(getEmpLeaveRequestDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'center', sm: 'center', md: 'end' },
                flexDirection: { xs: 'column', sm: 'row' },
                marginBottom: '35px',
                rowGap: 1.5,
              }}
            >
              <DashboardHeading
                title={'Leaves Requests'}
                dashboardDescription={REQUEST_LEAVE?.manageLeave || ''}
              />
              <Button
                sx={{
                  minWidth: { xs: '100px', md: '120px' },
                  color: '#fff',
                  background: '#029894',
                  '&:hover': {
                    color: '#fff',
                    background: '#029894',
                  },
                }}
                variant="contained"
                onClick={handleOpenModal}
              >
                {REQUEST_LEAVE?.create}
              </Button>
              {openModal && (
                <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LeaveRequestModal handleClose={handleCloseModal} />
                </Modal>
              )}
            </Box>

            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  // marginTop: '10px',
                  marginBottom: '20px',
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <Box
                  sx={{
                    minWidth: '700px',
                    width: '100%',
                    overflowX: 'auto',
                    mb: '26px',
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'center', md: 'center' },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '400',
                      lineHeight: '17px',
                      letterSpacing: '0em',
                      textAlign: 'left',
                      color: '#595959',
                    }}
                    variant="caption"
                  >
                    {REQUEST_LEAVE?.balance}
                  </Typography>
                  <Button
                    sx={{
                      mt: { xs: '0', md: 0 },
                      minWidth: '120px',
                      border: '1px solid #138A72',
                      color: '#138A72',
                      '&:hover:': {
                        background: '#fff',
                      },
                    }}
                    onClick={() => refreshMutation.mutate()}
                    startIcon={
                      !refreshMutation.isPending && (
                        <Image
                          width={20}
                          height={22}
                          alt="Refresh"
                          src={`/icons/Refresh.svg`}
                        />
                      )
                    }
                  >
                    {refreshMutation.isPending ? (
                      <CircularProgress size={26} color="secondary" />
                    ) : (
                      REQUEST_LEAVE?.refresh
                    )}
                  </Button>
                </Box>
                <LeaveBalanceTable />
              </Box>
            </Box>
          </div>
        </Box>
      </Grid>

      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
          }}
        >
          <div>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box sx={{ width: '100%', mb: { xs: 0.8, md: 0 } }}>
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    color: '#595959',
                    textAlign: { xs: 'center', sm: 'start' },
                  }}
                >
                  {REQUEST_LEAVE?.request}
                </Typography>
              </Box>
            </Box>
            <LeaveRequestTablesTabs
              handleOpen={handleOpen}
              handleOpenModal={handleOpenConditionalModal}
              handleClickView={handleClickActionView}
              handleClickDelete={handleClickActionDelete}
              viewClicked={viewClicked}
              // showFilterModal={showFilterModal}
              // setShowFilterModal={setShowFilterModal}
            />
          </div>
        </Box>
      </Grid>

      {/* LeaveRequest Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-aos="fade-down"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LeaveViewModal
          modalData={modalData}
          handleClose={handleClose}
          isEmployee
          handleConfirm={handleConfirmDelete}
        />
      </Modal>
      <AppConfirmationMadal
        isOpen={isOpenDeleteModal}
        title={'Delete'}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        isLoading={isPending}
      />
    </>
  );
};
export default Dashboard;
