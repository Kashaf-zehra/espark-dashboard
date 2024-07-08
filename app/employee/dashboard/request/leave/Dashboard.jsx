'use client';
import React, { useMemo, useState } from 'react';
import { Grid, Box, Typography, Button, Modal } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import Image from 'next/image';
import { renderNestedTable } from './renderComponents';
import { employeeRequestsTabs } from '@/src/constants/data/tabs/requestTabs';
import {
  employeeLeaveBalanceColumn,
  employeeLeaveBalanceData,
  employeeLeaveRequestsColumn,
  employeeLeaveRequestsData,
} from '@/src/constants/data/tables/requestsData';
import LeaveRequestModal from './LeaveRequestModal';
import LeaveViewModal from '@/app/client/dashboard/team/time-off/LeaveViewModal';
import AppTable from '@/src/components/appTableNew/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import { REQUEST_LEAVE } from '@/src/constants/requestviewModal';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterLeaveForm } from '@/src/constants/data/forms/filter-form';

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [viewClicked, setViewClicked] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickActionView = (props) => {
    setViewClicked(true);
    const {
      item,
      row: { status, employee_name, count, leaveType },
    } = props;
    setModalData({
      item,
      status,
      count,
      leaveType,
      employeeName: employee_name,
    });
    setOpen(true);
  };
  const handleClickActionDelete = () => {
    setIsOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleClose = () => {
    setShowFilterModal(false);
    setOpen(false);
  };
  const leaveBalanceDataState = useMemo(
    () => filterTableRowsWRTTab(employeeLeaveBalanceData, { status: '' }),
    [employeeLeaveBalanceData]
  );
  const leaveRequestDataState = useMemo(
    () => filterTableRowsWRTTab(employeeLeaveRequestsData, { status: '' }),
    [employeeLeaveRequestsData]
  );
  const [currentReqStatusTab, setcurrentReqStatusTab] = useState('All');
  const [currentReqStatusTabVal, setcurrentReqStatusTabVal] = useState(0);
  const handleChangeCurrReqStatusTab = (event, newValue, data) => {
    let tab = event?.target?.innerText;
    if (tab.includes('\n\n')) {
      tab = tab.split('\n\n')[1];
    } else if (!isNaN(+tab)) {
      tab = data[newValue]?.label;
    }
    setcurrentReqStatusTab(tab);
    setcurrentReqStatusTabVal(newValue);
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
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              marginBottom={'50px'}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="h3">Leaves Requests</Typography>
                <Box display={'flex'} flexDirection={'column'} mt={'20px'}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      letterSpacing: '0em',
                      textAlign: 'left',
                      color: '#595959',
                    }}
                    variant="caption"
                  >
                    {REQUEST_LEAVE?.manageLeave}
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  minWidth: { xs: '100px', md: '120px' },
                  marginBottom: '25px',
                  marginX: '10px',
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
                  marginTop: '10px',
                  marginBottom: '20px',
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <Box
                  sx={{
                    mb: '26px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
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
                      mt: { xs: '20px', md: 0 },
                      minWidth: '120px',
                      border: '1px solid #138A72',
                      color: '#138A72',
                      '&:hover:': {
                        background: '#fff',
                      },
                    }}
                    startIcon={
                      <Image
                        width={20}
                        height={22}
                        alt="Refresh"
                        src={`/icons/Refresh.svg`}
                      />
                    }
                  >
                    {REQUEST_LEAVE?.refresh}
                  </Button>
                </Box>
                <AppTable
                  column={employeeLeaveBalanceColumn}
                  data={leaveBalanceDataState}
                  noPagination
                />
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
              <Box display={'flex'} flexDirection={'column'}>
                <Typography
                  sx={{
                    fontSize: '30px',
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                    color: '#595959',
                  }}
                >
                  {REQUEST_LEAVE?.request}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  marginTop: '10px',
                  marginBottom: '20px',
                  borderBottom: 'solid 1px #ccc',
                }}
              >
                <CustomTabPanel value={0} index={0} key={0}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                    marginTop={5}
                    px={'10px'}
                  >
                    <Tabs
                      variant="scrollable"
                      value={currentReqStatusTabVal}
                      onChange={(ev, newVal) =>
                        handleChangeCurrReqStatusTab(
                          ev,
                          newVal,
                          employeeRequestsTabs
                        )
                      }
                      aria-label="basic tabs example"
                      TabIndicatorProps={{
                        style: { backgroundColor: '#068987' },
                      }}
                    >
                      {employeeRequestsTabs?.map(
                        ({ label, prop, color, background }, index) => {
                          return (
                            <Tab
                              key={index}
                              disableRipple={true}
                              label={
                                <Box display={'flex'} alignItems={'center'}>
                                  <Box
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      background,
                                      borderRadius: '5px',
                                      marginRight: '10px',
                                      color,
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      lineHeight: '19px',
                                      letterSpacing: '0em',
                                      textAlign: 'left',
                                    }}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                  >
                                    {
                                      filterTableRowsWRTTab(
                                        employeeLeaveRequestsData,
                                        {
                                          status: label === 'All' ? '' : label,
                                        }
                                      ).length
                                    }
                                  </Box>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color:
                                        label === currentReqStatusTab && color,
                                    }}
                                  >
                                    {label}
                                  </Typography>
                                </Box>
                              }
                              {...prop}
                            />
                          );
                        }
                      )}
                    </Tabs>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      sx={{
                        pt: { xs: '10px', md: 0 },
                        pb: '10px',
                      }}
                    >
                      <Button
                        sx={{
                          marginX: '10px',
                          minWidth: '120px',
                          border: '1px solid #138A72',
                          color: '#138A72',
                          '&:hover:': {
                            background: '#fff',
                          },
                        }}
                        startIcon={
                          <Image
                            width={20}
                            height={22}
                            alt="Refresh"
                            src={`/icons/Refresh.svg`}
                          />
                        }
                      >
                        {REQUEST_LEAVE?.refresh}
                      </Button>
                      <Button
                        sx={{
                          minWidth: '120px',
                          background: '#138A72',
                          color: '#fff',
                          '&:hover': {
                            background: '#138A72',
                          },
                        }}
                        onClick={handleOpenFilterModal}
                        startIcon={
                          <Image
                            width={18}
                            height={15}
                            alt="Refresh"
                            src={`/icons/Filter.svg`}
                            onClick={handleOpenFilterModal}
                          />
                        }
                      >
                        {REQUEST_LEAVE?.filter}
                      </Button>
                    </Box>
                  </Box>
                  {showFilterModal && (
                    <FilterFormModal
                      open={handleOpenFilterModal}
                      onClose={handleClose}
                      leaveType
                      filterForm={filterLeaveForm}
                    />
                  )}
                </CustomTabPanel>
              </Box>
              {renderNestedTable({
                currentReqStatusTabVal,
                currentReqStatusTab,
                handleOpen,
                column: employeeLeaveRequestsColumn,
                data: leaveRequestDataState,
                handleOpenConditionalModal,
                handleClickActionView,
                handleClickActionDelete,
                viewClicked,
              })}
            </Box>
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
        />
      </Modal>
      <AppConfirmationMadal
        isOpen={isOpenDeleteModal}
        title={'Delete'}
        handleClose={handleCloseDeleteModal}
        bodyText={'Are you sure you want to delete this request?'}
        cancelButtonText={'Cancel'}
        confirmButtonText={'Delete'}
        // isLoading={isPending}
      />
    </>
  );
};
