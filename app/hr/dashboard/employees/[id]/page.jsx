'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { employeeProfileData } from '@/src/constants/employeeProfile';
import Profile from '@/src/components/employeeData/profile';
import AttendanceReport from '@/src/components/employeeData/attendanceReports';
import EditEmployeeCredential from '@/src/components/employeeData/editEmployeeCredential';
import EditModal from '@/src/components/employeeData/editModal';
// import { getEmployeeData } from '@/src/utils/employeeProfile';
import Client from '@/src/components/employeeData/client';
import Assets from '@/src/components/employeeData/assets';
import AssetForm from '@/src/components/employeeData/assetModal';
// import { allEmployees } from '@/src/constants/AllEmployee';
import TimeAndLeaves from '@/src/components/employeeData/timeAndLeaves';
import FilterFormModal from '@/src/components/FilterModal/filterForm';
import { filterAttendanceForm } from '@/src/constants/data/forms/filter-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DOWNLOAD_EMP_RESUME,
  HR_GET_EMP_ATTENDENCE,
  HR_GET_EMP_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAttendanceRequestSuccess,
  getCurrentEmpData,
  getCurrentEmpDataFailed,
  getCurrentEmpDataSuccess,
  removeCurrentEmployee,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '@/src/components/Toast/Toast';
import ProfileEditSkeleton from '@/src/components/HR/ProfileEditSkeleton';
import { useRouter } from 'next/navigation';
import { getTimeSheet } from '@/src/utils/getTimeSheet';

const Page = () => {
  const router = useRouter();
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);

  const dispatch = useDispatch();
  const { currentEmployee } = useSelector((state) => state?.hr?.employees);
  const [value, setValue] = useState('one');
  const [showEditModal, setEditModal] = useState(false);
  const [showEmergencyModal, setEmergencyModal] = useState(false);
  const [showCredentialModal, setCredentialModal] = useState(false);
  const [showEditProfilelModal, setEditProfileModal] = useState(false);
  const [showAssetModal, setAssetModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  // const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const params = useParams();
  const { isLoading } = useQuery({
    staleTime: 1000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-profile'],
    queryFn: async () => {
      dispatch(getCurrentEmpData());
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          dispatch(getCurrentEmpDataSuccess(data));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getCurrentEmpDataFailed());
          console.log({ err });
        });
    },
  });

  // const employeeData = getEmployeeData(id, allEmployees);
  const handleOpenModal = () => {
    setEditModal(true);
  };
  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };
  const handleCredentialModal = () => {
    setCredentialModal(true);
  };
  const handleAssetModal = () => {
    setAssetModal(true);
  };
  const handleEmergencyModal = () => {
    setEmergencyModal(true);
  };
  const handleEditProfileModal = () => {
    setEditProfileModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
    setCredentialModal(false);
    setEmergencyModal(false);
    setEditProfileModal(false);
    setAssetModal(false);
  };
  const handleClose = () => {
    setShowFilterModal(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatchFunction = (
    data,
    attendanceStatus,
    checkInRange,
    checkOutRange
  ) => {
    const tempData = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const newEle = Object.entries(element);
      tempData.push({
        client: newEle[0][0],
        emp_data: {
          time_sheet: getTimeSheet(
            newEle[0][1]?.time_sheet?.record,
            attendanceStatus,
            checkInRange,
            checkOutRange
          ),
          employee_details: {
            ...newEle[0][1]?.employee_details,
            expect_check_in: newEle[0][1]?.time_sheet?.expect_check_in,
            expect_check_out: newEle[0][1]?.time_sheet?.expect_check_out,
          },
        },
      });
    }
    // console.log({ tempData });
    dispatch(getAttendanceRequestSuccess(tempData));
  };
  // const handleOpenContractModal = () => {
  //   setIsOpenContractModal(true);
  // };
  // const handleCloseContractModal = () => {
  //   setIsOpenContractModal(false);
  // }; may be use in future
  const resetMutation = useMutation({
    mutationFn: async () => {
      // dispatch(getTimeSheetData());
      return api.getData(
        `${HR_GET_EMP_ATTENDENCE}?e_email=${currentEmployee?.email}`
      );
    },
    onSuccess: ({ data }) => {
      dispatchFunction?.(data);
    },
    onError: (err) => {
      // dispatch(getTimeSheetDataFailed());
      console.log({ err });
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const downloadResumeMutation = useMutation({
    mutationFn: async () => {
      // dispatch(getTimeSheetData());
      return api.downloadFile(
        `${DOWNLOAD_EMP_RESUME}?id=${currentEmployee?.id}`
      );
    },
    onSuccess: ({ data }) => {
      // console.log({ data });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
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
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleRefresh = () => {
    resetMutation.mutate();
  };

  const handleDownloadResume = () => {
    downloadResumeMutation.mutate();
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src={'/images/dashboard/left.svg'}
              width={30}
              height={30}
              alt="left"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(removeCurrentEmployee());
                router.back();
              }}
            />
            <Link href={`/hr/dashboard/employees`}>
              <Typography> {employeeProfileData?.employees} /</Typography>
            </Link>
            <Typography
              sx={{
                fontWeight: '600',
              }}
            >
              {employeeProfileData?.profile}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '-30px', paddingBottom: '40px' }}>
            <Typography
              sx={{
                color: '#171717',
                fontSize: '30px',
                fontWeight: '600',
                marginTop: '10PX',
              }}
            >
              {employeeProfileData?.profile}
            </Typography>
          </Box>
          {isLoading ? (
            <ProfileEditSkeleton />
          ) : (
            <Box
              sx={{
                borderRadius: '5px',
                boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                marginBottom: '40px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', md: 'row' },
                  padding: '25px',
                  gap: { xs: '10px', sm: '10px', md: '35px' },
                  alignItems: 'center',
                  '@media (min-width: 280px) and (max-width: 450px)': {
                    flexDirection: 'column',
                  },
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    sx={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                    }}
                    src={currentEmployee?.image_path}
                  />
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.[0]?.write)) && (
                    <Image
                      src={'/images/dashboard/hr/edit.svg'}
                      width={35}
                      height={35}
                      alt="edit"
                      style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                      }}
                      onClick={handleOpenModal}
                    />
                  )}
                  {showEditModal && (
                    <EditModal
                      handleOpenModal={handleOpenModal}
                      onClose={handleCloseModal}
                    />
                  )}
                </Box>
                {currentEmployee?.employee_name ? (
                  <Box
                    sx={{
                      textAlign: { xs: 'center', md: 'start' },
                    }}
                  >
                    <>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: '18px',
                            sm: '20px',
                            md: '23px',
                            lg: '25px',
                          },
                          fontWeight: 500,
                        }}
                      >
                        {currentEmployee?.employee_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '13px', sm: '14px', md: '16px' },
                          fontWeight: 400,
                        }}
                      >
                        {`Employee ID: ${currentEmployee?.employee_id}`}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: '13px', sm: '14px', md: '16px' },
                          fontWeight: 400,
                        }}
                      >
                        {currentEmployee?.job_title}
                      </Typography>
                    </>
                  </Box>
                ) : (
                  <Stack
                    spacing={1}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xs: 'center', md: 'start' },
                    }}
                  >
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="text" width={160} height={20} />
                    <Skeleton variant="text" width={130} height={20} />
                  </Stack>
                )}
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    px: { xs: '20px', md: '30px' },
                    pt: { xs: '0', md: '30px' },
                    pb: { xs: '30px', md: '30px' },
                    alignItems: 'center',
                  }}
                >
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' &&
                      employee_perms?.[0].download)) && (
                    <Button
                      variant="contained"
                      sx={{
                        width: '200px',
                        textTransform: 'math-auto',
                        maxWidth: {
                          xs: '100%',
                          md: '200px',
                          color: '#fff',
                          background: downloadResumeMutation?.isPending
                            ? '#ccc'
                            : '#029894',
                          '&:hover': {
                            color: '#fff',
                            background: downloadResumeMutation?.isPending
                              ? '#ccc'
                              : '#029894',
                          },
                        },
                      }}
                      // onClick={() =>
                      //   window.open(currentEmployee?.resume_path, '_blank')
                      // }
                      onClick={handleDownloadResume}
                    >
                      {downloadResumeMutation?.isPending ? (
                        <CircularProgress size={26} color="secondary" />
                      ) : (
                        employeeProfileData?.downloadResume
                      )}
                    </Button>
                  )}
                  {(role === 'super_admin' ||
                    (role !== 'super_admin' && employee_perms?.[0].write)) && (
                    <Button
                      sx={{
                        width: '200px',
                        maxWidth: { xs: '100%', md: '200px' },
                        borderRadius: '5px',
                        border: '1px solid #029894',
                        textTransform: 'math-auto',
                      }}
                      onClick={handleCredentialModal}
                    >
                      {employeeProfileData?.editCredentials}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {showCredentialModal && (
            <EditEmployeeCredential
              open={handleCredentialModal}
              onClose={handleCloseModal}
            />
          )}

          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                marginBottom:
                  value === employeeProfileData?.valueTwo ||
                  value === employeeProfileData?.valuethree ||
                  value === 'five'
                    ? '0px'
                    : '40px',
                display: 'flex',
                justifyContent: { xs: 'center', md: 'space-between' },
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                variant="scrollable"
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
              >
                <Tab
                  value={employeeProfileData?.valueOne}
                  label={employeeProfileData?.profile}
                  wrapped
                  disableRipple={true}
                  sx={{
                    marginRight: '15px',
                    color: '#595959',
                    '&.Mui-selected': {
                      color: '#068987',
                    },
                  }}
                />
                <Tab
                  value={employeeProfileData?.valueTwo}
                  label={employeeProfileData?.client}
                  disableRipple={true}
                  sx={{
                    marginRight: '20px',
                    color: '#595959',
                    '&.Mui-selected': {
                      color: '#068987',
                    },
                  }}
                />
                <Tab
                  value={employeeProfileData?.valuethree}
                  label={employeeProfileData?.attendanceReports}
                  disableRipple={true}
                  sx={{
                    marginRight: '20px',
                    textTransform: 'math-auto',
                    color: '#595959',
                    '&.Mui-selected': {
                      color: '#068987',
                    },
                  }}
                />
                <Tab
                  value={employeeProfileData?.valueFour}
                  label="Assets"
                  disableRipple={true}
                  sx={{
                    marginRight: '20px',
                    color: '#595959',
                    '&.Mui-selected': {
                      color: '#068987',
                    },
                  }}
                />
                <Tab
                  value={'five'}
                  label="Time & leaves"
                  disableRipple={true}
                  sx={{
                    marginRight: '20px',
                    textTransform: 'math-auto',
                    color: '#595959',
                    '&.Mui-selected': {
                      color: '#068987',
                    },
                  }}
                />
              </Tabs>

              <Box
                sx={{
                  display: 'flex',
                  marginTop: { xs: '20px', md: '0px' },
                }}
              >
                {value === employeeProfileData?.valuethree && (
                  <Box
                    sx={{
                      display: 'flex',
                      marginBottom: '10px',
                    }}
                  >
                    <Button
                      sx={{
                        marginX: '10px',
                        minWidth: '120px',
                        display: 'flex',
                        border: '1px solid #138A72',
                        color: '#138A72',
                        backgroundColor: resetMutation.isPending && '#ccc',
                        '&:hover:': {
                          background: '#fff',
                        },
                      }}
                      startIcon={
                        !resetMutation.isPending && (
                          <Image
                            width={20}
                            height={22}
                            alt="Refresh"
                            src={`/icons/Refresh.svg`}
                          />
                        )
                      }
                      onClick={handleRefresh}
                    >
                      {resetMutation.isPending ? (
                        <CircularProgress size={26} color="secondary" />
                      ) : (
                        employeeProfileData?.refreshBtn
                      )}
                    </Button>
                    <Button
                      sx={{
                        minWidth: '120px',
                        background: '#138A72',
                        display: 'flex',
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
                      {employeeProfileData?.filterBtn}
                    </Button>
                  </Box>
                )}

                {showFilterModal && (
                  <FilterFormModal
                    open={handleOpenFilterModal}
                    onClose={handleClose}
                    attendanceStatus
                    filterForm={filterAttendanceForm}
                    url={`${HR_GET_EMP_ATTENDENCE}?e_email=${currentEmployee?.email}`}
                    dispatchFunction={dispatchFunction}
                  />
                )}
                {value === employeeProfileData?.valueFour && (
                  <>
                    {(role === 'super_admin' ||
                      (role !== 'super_admin' &&
                        employee_perms?.[0]?.write)) && (
                      <Button
                        sx={{
                          minWidth: '160px',
                          background: '#029894',
                          display: 'flex',
                          color: '#fff',
                          textTransform: 'math-auto',
                          marginBottom: '10px',
                          '&:hover': {
                            background: '#029894',
                          },
                        }}
                        onClick={handleAssetModal}
                      >
                        {employeeProfileData?.addAsset}
                      </Button>
                    )}
                    {showAssetModal && (
                      <AssetForm
                        open={handleAssetModal}
                        onClose={handleCloseModal}
                        empData={currentEmployee}
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
            {value === employeeProfileData?.valueOne ? (
              <Profile
                isLoading={isLoading}
                handleOpenModal={handleOpenModal}
                showEditModal={showEditModal}
                handleCloseModal={handleCloseModal}
                handleEmergencyModal={handleEmergencyModal}
                showEmergencyModal={showEmergencyModal}
                handleEditProfileModal={handleEditProfileModal}
                showEditProfilelModal={showEditProfilelModal}
                data={currentEmployee}
              />
            ) : value === employeeProfileData?.valueTwo ? (
              <>
                <Client />
              </>
            ) : value === employeeProfileData?.valuethree ? (
              <AttendanceReport employeeData={currentEmployee} />
            ) : value === 'five' ? (
              <TimeAndLeaves />
            ) : (
              <Assets />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
