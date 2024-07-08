'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { timeTrackingTableColumn } from '@/src/constants/data/tables/timeTracking';
import AppSearchableDropdown from '@/src/components/dashboard/appSearchableDropdown';
import AppCustomMonthYearPicker from '@/src/components/dashboard/appCustomMonthYearPicker';
import AppTable from '@/src/components/appTableNew/AppTable';
import { TIMETRACKING } from '@/src/constants/TimeTracking';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  CLIENT_AVAILABLE_EMPLOYEES,
  CLIENT_TIME_TRACKING,
  DOWNLOAD_ATTENDANCE_REPORT,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchTimeTrackingDataRequest,
  fetchTimeTrackingDataRequestFailed,
  fetchTimeTrackingDataRequestSuccess,
} from '@/src/redux/slices/clientSlices/timeTrackingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';
import { getAttendenceShortHand } from '@/src/utils/helpers';
import dayjs from 'dayjs';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { sheetStatusTypes } from '@/src/constants/data/tables/timeSheet';
import { renderTrackingStatus } from './renderComponents';
import { TIME_REQUEST } from '@/src/constants/timeSheet';

const Dashboard = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.client?.timeTracking);
  const [timeTracking, setTimeTracking] = useState({
    month: months[date.getMonth()],
    year: date.getFullYear(),
  });
  const { isLoading } = useQuery({
    staleTime: 1000,
    refetchOnWindowFocus: false,
    queryKey: ['timeTrackingQuery'],
    queryFn: async () => {
      dispatch(fetchTimeTrackingDataRequest());
      return api
        .getData(`${CLIENT_AVAILABLE_EMPLOYEES}`)
        .then((resp) => {
          const tempData = {
            employees: resp.data?.employees,
            time_sheet: Object.keys(data?.time_sheet).length
              ? data?.time_sheet
              : [],
          };
          dispatch(fetchTimeTrackingDataRequestSuccess(tempData));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchTimeTrackingDataRequestFailed());
          console.log({ err });
        });
    },
  });
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
  const reformTimeSheet = (sheet) => {
    console.log({ sheet });
    const tempData = sheet?.map((item) => ({
      ...item,
      day: dayjs(convertDateFormat(item?.date)).format('dddd'),
      // status: getAttendenceShortHand(item?.status),
      status: Object.entries(item?.status)
        ?.map((st) => {
          if (!st[1]) return;
          else return getAttendenceShortHand(st[0]);
        })
        .filter((el) => el !== undefined),
      attendenceShortHand: true,
    }));
    console.log({ sheet, tempData });
    return tempData;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (employee) => {
      dispatch(fetchTimeTrackingDataRequest());
      return api.getData(
        `${CLIENT_TIME_TRACKING}?year=${timeTracking?.year}&month=${timeTracking?.month}&emp_id=${employee}`
      );
    },
    onSuccess: (response) => {
      console.log({ data: response?.data });
      const tempData = {
        employees: [...data.employees],
        time_sheet:
          response?.data && Object.keys(response?.data?.time_sheet)?.length
            ? reformTimeSheet(response?.data?.time_sheet)
            : [],
      };
      console.log({ tempData });
      dispatch(fetchTimeTrackingDataRequestSuccess(tempData));
    },
    onError: (err) => {
      Toast('error', err?.message || 'Failed to get data');
      dispatch(fetchTimeTrackingDataRequestFailed());
      console.log({ err });
    },
  });
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (selectedEmployee?.employee_id) {
      mutate(selectedEmployee?.employee_id);
    }
  }, [selectedEmployee, timeTracking]);

  const resolveURL = () => {
    return `${DOWNLOAD_ATTENDANCE_REPORT}?e_email=${selectedEmployee?.employee_id}&month=${timeTracking?.month}&year=${timeTracking?.year}`;
  };
  const attendenceReportDownloadMutation = useMutation({
    mutationFn: async () => {
      return api.downloadFile(resolveURL());
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // dispatchFunction?.(data);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
      // dispatch(getTimeSheetDataFailed());
      console.log({ err });
      console.log({ err: err?.message, name: err?.name, stack: err?.stack });
    },
  });
  const handleDownloadReport = () => {
    attendenceReportDownloadMutation.mutate();
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
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center', sm: 'space-between' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              width: '100%',
              pb: { xs: 3, sm: 1.5 },
            }}
          >
            <DashboardHeading
              title={TIMETRACKING?.timeTracking}
              dashboardDescription={TIMETRACKING?.teamMembers}
              esparkCenter={TIMETRACKING.esparkCenter}
              teamMember={TIMETRACKING.teamMemberSecondPra}
            />
            <Button
              sx={{
                minWidth: { xs: '100%', sm: '220px' },
                color: '#029894',
                border: `1px solid ${attendenceReportDownloadMutation.isPending || !selectedEmployee || !data?.time_sheet?.length ? '#ccc' : '#029894'}`,
                fontSize: '16px',
                fontWeight: '600',
                mt: '10px',
                '&:hover': {
                  background: attendenceReportDownloadMutation.isPending
                    ? ''
                    : '#E6F5F4',
                },
              }}
              onClick={handleDownloadReport}
              disabled={!selectedEmployee || !data?.time_sheet?.length}
            >
              {attendenceReportDownloadMutation.isPending ? (
                <CircularProgress size={26} color="secondary" />
              ) : (
                TIME_REQUEST?.downloadReport
              )}
            </Button>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              alignItems="center"
              sx={{
                width: '100%',
                marginBottom: '15px',
                marginTop: '15px',
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  display={'flex'}
                  flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                  alignItems="center"
                  item
                  xs={12}
                  md={6}
                  flexDirection={'row'}
                  gap={3}
                >
                  <AppSearchableDropdown
                    setIsLoadingList={setIsLoadingEmployee}
                    isLoadingList={isLoadingEmployee}
                    selectedItem={selectedEmployee}
                    data={data?.employees}
                    setSelectedItem={setSelectedEmployee}
                  />

                  <AppCustomMonthYearPicker setTimeTracking={setTimeTracking} />
                </Grid>
              </Grid>
            </Box>
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
            </Box>
            <>
              {selectedEmployee ? (
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  {isPending || isLoading ? (
                    'Loading Data'
                  ) : (
                    <AppTable
                      column={timeTrackingTableColumn}
                      data={data?.time_sheet}
                      isLoading={isLoading}
                    />
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={timeTrackingTableColumn}
                    renderMessage={
                      isLoading ? (
                        <Skeleton
                          variant="text"
                          width={'400px'}
                          height={40}
                          sx={{ background: '#F6F6F6', fontSize: '2.5rem' }}
                        />
                      ) : (
                        <Typography
                          sx={{
                            fontSize: '24px',
                            color: '#595959',
                            lineHeight: '29.05px',
                            fontWeight: 500,
                          }}
                        >
                          Select employee to see their data
                        </Typography>
                      )
                    }
                  />
                </Box>
              )}
            </>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
