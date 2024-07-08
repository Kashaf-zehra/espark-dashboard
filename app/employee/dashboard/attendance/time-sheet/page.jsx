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

import { renderTrackingStatus } from './renderComponents';
import {
  sheetStatusTypes,
  timeSheetTableColumn,
} from '@/src/constants/data/tables/timeSheet';
import Image from 'next/image';
import { EMPLOYEE_TIMESHEET } from '@/src/constants/timeSheet';
import AttendanceViewModal from './AttendanceViewModal';
import AppTable from '@/src/components/appTableNew/AppTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { EMP_TIME_SHEET } from '@/src/services/apiService/apiEndPoints';
import {
  getTimeSheetData,
  getTimeSheetDataFailed,
  getTimeSheetDataSuccess,
} from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterAttendanceForm } from '@/src/constants/data/forms/filter-form';
import dayjs from 'dayjs';
import { getAttendenceShortHand } from '@/src/utils/helpers';
import { getTimeSheet } from '@/src/utils/getTimeSheet';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { Toast } from '@/src/components/Toast/Toast';
import Skeleton from '@mui/material/Skeleton';

const Dashboard = () => {
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const { data } = useSelector((state) => state?.emp?.timeSheet);
  const { employee_details, punch_timings } = useSelector(
    (state) => state?.emp?.home?.homeData
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  function convertDateFormat(dateStr) {
    // Split the date string into day, month, and year
    var parts = dateStr.split('-');
    var day = parts[0];
    var month = parts[1];
    var year = parts[2];

    // Reorder the components to the new format
    var newDateStr = month + '-' + day + '-' + year;

    return newDateStr;
  }
  const { isLoading } = useQuery({
    // staleTime: 10000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      dispatch(getTimeSheetData());
      return api
        .getData(`${EMP_TIME_SHEET}?workspace=${currentWorkSpace?.email || ''}`)
        .then(({ data }) => {
          const newData =
            data !== '' && Object.entries(data?.time_sheet?.record).length
              ? Object.entries(data?.time_sheet?.record)?.map((item) => ({
                  ...item[1],
                  day: dayjs(convertDateFormat(item[0])).format('dddd'),
                  status: Object.entries(item[1]?.status)
                    ?.map((st) => {
                      if (!st[1]) return;
                      else return getAttendenceShortHand(st[0]);
                    })
                    .filter((el) => el !== undefined),
                  date: convertDateFormat(item[0]),
                  action: ['View'],
                  attendenceShortHand: true,
                  actionStatus: true,
                }))
              : [];
          dispatch(
            getTimeSheetDataSuccess({
              ...data,
              time_sheet: {
                ...(data.time_sheet || []),
                record: newData,
              },
            })
          );
          return data;
        })
        .catch((error) => {
          Toast('error', error.message || 'Failed to get data');
          dispatch(getTimeSheetDataFailed());
          console.log({ error });
        });
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      dispatch(getTimeSheetData());
      return api.getData(
        `${EMP_TIME_SHEET}?workspace=${currentWorkSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      dispatchFunction(data);
    },
    onError: (err) => {
      dispatch(getTimeSheetDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const handleClose = () => {
    setShowFilterModal(false);
    setOpen(false);
  };
  const handleAttendanceModal = (props) => {
    console.log({ props });
    const { item, row } = props;
    setModalData({ item, ...row });
    setOpen(true);
  };

  const dispatchFunction = (
    data,
    attendanceStatus,
    checkInRange,
    checkOutRange
  ) => {
    const tempData = [];

    if (data) {
      const dataArray = [data];

      for (let i = 0; i < dataArray?.length; i++) {
        const element = dataArray[i];
        const entries = Object.entries(element);
        let myObj;

        if (element?.time_sheet?.record) {
          myObj = entries[0]?.[1]?.record;
        } else {
          myObj = entries[0]?.[1];
        }

        const timeSheet = getTimeSheet(
          myObj,
          attendanceStatus,
          checkInRange,
          checkOutRange
        );

        tempData.push({
          time_sheet: {
            record: timeSheet,
          },
          employee_details: data?.employee_details,
          time_sheet_summary: data?.time_sheet_summary,
        });
      }

      dispatch(getTimeSheetDataSuccess(tempData[0]));
    } else {
      dispatch(
        getTimeSheetDataSuccess({
          time_sheet: {
            record: [],
          },
          employee_details: {},
          time_sheet_summary: {},
        })
      );
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
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
            }}
          >
            <DashboardHeading
              title={'Time sheet'}
              dashboardDescription={'Manage timesheet from one place.'}
            />
          </Box>

          <Box
            sx={{
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
              width: '100%',
              mt: '40px',
              background: '#FAFAFA',
              padding: '20px',
              rowGap: '8px',
              columnGap: '17px',
              flexDirection: 'column',
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {EMPLOYEE_TIMESHEET?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  margin: '5px 0',
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '40px',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '5px',
                      height: '40px',
                      borderRadius: '5px 0px 0px 5px',
                      backgroundColor: `${item.verticalLineColor}`,
                    }}
                  ></div>
                  <Typography sx={{ color: '#595959' }}>
                    {Object.values(item)[0]}
                  </Typography>
                </Box>
                {isLoading ? (
                  <Skeleton variant="text" sx={{ width: 40, mr: 1 }} />
                ) : (
                  <Typography
                    sx={{
                      marginRight: '12px',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#595959',
                    }}
                  >
                    {/* {Object.values(item)[1]} */}
                    {data?.time_sheet_summary?.[item?.name] || 0}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box marginTop={'35px'}>
              {isLoading ||
              !employee_details?.employee_name ||
              !employee_details?.employee_id ? (
                <Skeleton
                  variant="text"
                  sx={{ width: '30%', height: 30, mr: 1, mx: 'auto' }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: '24px', sm: '28px', md: '30px' },
                    fontWeight: 400,
                    lineHeight: '36px',
                    letterSpacing: '0em',
                    color: '#595959',
                  }}
                  textAlign={'center'}
                >
                  {employee_details?.employee_name} -{' '}
                  <Box
                    component={'br'}
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                  />{' '}
                  ({employee_details?.employee_id})
                </Typography>
              )}
            </Box>

            {showFilterModal && (
              <FilterFormModal
                open={handleOpenFilterModal}
                onClose={handleClose}
                attendanceStatus
                filterForm={filterAttendanceForm}
                url={`${EMP_TIME_SHEET}?workspace=${currentWorkSpace?.email || ''}`}
                dispatchFunction={dispatchFunction}
              />
            )}
            <Box
              sx={{
                maxWidth: '100%',
                overflowX: 'auto',
                display: 'flex',
                alignItems: 'center',
                py: '20px',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  mr: 4,
                }}
              >
                {sheetStatusTypes?.map(
                  ({ label, shortForm, background }, statusIndex) =>
                    renderTrackingStatus({
                      label,
                      statusIndex,
                      background,
                      shortForm,
                    })
                )}
              </Box>
              <Box sx={{ mt: '5px' }} display={'flex'} alignItems={'center'}>
                <Button
                  disableRipple
                  sx={{
                    marginX: '10px',
                    minWidth: '120px',
                    display: { xs: 'flex', md: 'flex' },
                    border: `1px solid ${isPending ? '#ccc' : '#138A72'}`,
                    backgroundColor: isPending && '#ccc',
                    color: !isPending && '#138A72',
                    '&:hover:': {
                      background: isPending ? '#ccc' : '#fff',
                    },
                  }}
                  onClick={() => mutate()}
                  startIcon={
                    !isPending && (
                      <Image
                        width={20}
                        height={22}
                        alt="Refresh"
                        src={`/icons/Refresh.svg`}
                      />
                    )
                  }
                >
                  {isPending ? (
                    <CircularProgress size={26} color="secondary" />
                  ) : (
                    'Refresh'
                  )}
                </Button>
                <Button
                  disableRipple
                  sx={{
                    minWidth: '120px',
                    background: '#138A72',
                    display: { xs: 'flex', md: 'flex' },
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
                  Filter
                </Button>
              </Box>
            </Box>
            {/* {showFilterModal && (
              <FilterFormModal
                open={handleOpenFilterModal}
                onClose={handleClose}
                attendanceStatus
                filterForm={filterAttendanceForm}
              />
            )} */}
            <>
              <Box
                sx={{
                  maxWidth: '100%',
                  overflowX: 'auto',
                }}
              >
                <AppTable
                  column={timeSheetTableColumn}
                  data={data?.time_sheet?.record}
                  handleClickActionView={handleAttendanceModal}
                  isLoading={isLoading}
                />
              </Box>
            </>
          </Box>
        </Box>
      </Grid>
      <Modal
        data-aos="fade-down"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AttendanceViewModal
          empData={{
            ...employee_details,
            ...currentWorkSpace,
            expect_check_in: punch_timings.check_in,
            expect_check_out: punch_timings.check_out,
          }}
          modalData={modalData}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
};
export default Dashboard;
