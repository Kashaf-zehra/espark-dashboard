import Skeleton from '@mui/material/Skeleton';
import AppTable from '@/src/components/appTableNew/AppTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import Input from '@/src/components/dashboard/input';
import { leaveBalanceColumn } from '@/src/constants/data/tables/timeOffRequest';
import {
  leaveRequestsTab,
  requestsStatusTab,
} from '@/src/constants/data/tabs/timeOffTabs';
import { updateCurrentReqStatusTab } from '@/src/redux/slices/clientSlices/timeOffSlice';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDataByKeyword } from '@/src/utils/search';

const RequestStatusTabs = ({
  setClockInOutDataState,
  setLeaveRequestDataState,
  refreshClockInRequest,
  refreshLeaveRequest,
  currentTab,
}) => {
  const { data, tabData } = useSelector((state) => state?.client?.timeOff);
  const [searchLeaveRequest, setSearchLeaveRequest] = useState('');
  const [search, setSearch] = useState('');
  const [searchCheckInOutRequest, setSearchCheckInOutRequest] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const filterData = data?.leaveBalance?.filter((item) =>
    item?.employee_name?.toLowerCase()?.includes(search?.toLowerCase())
  );
  const dispatch = useDispatch();
  const handleChangeCurrReqStatusTab = (event, newValue, data) => {
    let tab = event?.target?.innerText;
    if (tab.includes('\n\n')) {
      tab = tab.split('\n\n')[1];
    } else if (!isNaN(+tab)) {
      tab = data[newValue]?.label;
    }
    dispatch(
      updateCurrentReqStatusTab({
        tab,
        val: newValue,
      })
    );
  };
  useEffect(() => {
    const tempData =
      tabData?.currentReqTypeTab === 'Leave Requests'
        ? data?.leaveRequest
        : data?.clockInOutRequests;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(
        tempData,
        tabData?.currentReqTypeTab === 'Leave Requests'
          ? searchLeaveRequest || ''
          : searchCheckInOutRequest || '',
        tabData?.currentReqTypeTab === 'Leave Requests'
          ? setLeaveRequestDataState
          : setClockInOutDataState
      );
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchLeaveRequest, searchCheckInOutRequest, tabData?.currentReqTypeTab]);
  const handleRefresh = () => {
    if (currentTab === 'Leave Requests') {
      refreshLeaveRequest.refetch();
    } else {
      refreshClockInRequest.refetch();
    }
    setSearchLeaveRequest('');
    setSearchCheckInOutRequest('');
  };
  return (
    <Box
      sx={{
        // backgroundColor: '#ccc',
        marginTop: '10px',
        marginBottom: '20px',
        borderBottom:
          tabData?.currentReqTypeTab !== 'Leave Balance' && 'solid 1px #ccc',
      }}
    >
      {leaveRequestsTab?.map(({ hasNestedTabs }, index) => {
        return (
          <CustomTabPanel
            value={tabData?.currentReqTypeTabVal}
            index={index}
            key={index}
          >
            {hasNestedTabs ? (
              <Box>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Tabs
                    variant="scrollable"
                    value={tabData?.currentReqStatusTabVal}
                    onChange={(ev, newVal) =>
                      handleChangeCurrReqStatusTab(
                        ev,
                        newVal,
                        requestsStatusTab
                      )
                    }
                    aria-label="basic tabs example"
                    TabIndicatorProps={{
                      style: { backgroundColor: '#068987' },
                    }}
                  >
                    {requestsStatusTab?.map(
                      ({ label, prop, background, color }, index) => {
                        return (
                          <Tab
                            key={index}
                            sx={{
                              mr: {
                                xs: '10px',
                                sm: '20px',
                                md: '50px',
                              },
                              color: '#595959',
                              p: 0,
                            }}
                            label={
                              <Box display={'flex'} alignItems={'center'}>
                                {isLoading ? (
                                  <Skeleton
                                    variant="text"
                                    sx={{
                                      width: 30,
                                      height: 40,
                                      mr: 1,
                                      ml: index == 0 ? -3 : 0,
                                    }}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      width: '30px',
                                      height: '30px',
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
                                        tabData?.currentReqTypeTab ===
                                          'Leave Requests'
                                          ? data?.leaveRequest
                                          : data?.clockInOutRequests,
                                        {
                                          status: label === 'All' ? '' : label,
                                        }
                                      ).length
                                    }
                                  </Box>
                                )}
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color:
                                      label === tabData?.currentReqStatusTab
                                        ? '#068987'
                                        : isLoading
                                          ? 'gray'
                                          : '#595959',
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
                    sx={{
                      my: { xs: '10px', lg: 0 },
                      display: { xs: 'none', md: 'flex' },
                    }}
                    maxWidth="100%"
                    alignItems={'center'}
                  >
                    <Box maxWidth="100%" sx={{ mb: { xs: '10px', lg: 0 } }}>
                      <Input
                        placeHolder={'Search by name...'}
                        // setIsLoading={setIsLoading}
                        handleChange={
                          tabData?.currentReqTypeTab === 'Leave Requests'
                            ? setSearchLeaveRequest
                            : setSearchCheckInOutRequest
                        }
                        value={
                          tabData?.currentReqTypeTab === 'Leave Requests'
                            ? searchLeaveRequest
                            : searchCheckInOutRequest
                        }
                        prefixIcon="SearchIcon.svg"
                      />
                    </Box>
                    <Button
                      sx={{
                        marginX: '10px',
                        minWidth: '120px',
                        border: `1px solid ${(currentTab === 'Leave Requests' && refreshLeaveRequest.isPending) || (currentTab !== 'Leave Requests' && refreshClockInRequest.isPending) ? '#ccc' : '#138A72'}`,
                        color: `${(currentTab === 'Leave Requests' && refreshLeaveRequest.isPending) || (currentTab !== 'Leave Requests' && refreshClockInRequest.isPending) ? '#ccc' : '#138A72'}`,
                        '&:hover:': {
                          background: '#fff',
                        },
                      }}
                      // onClick={() => {
                      //   setSearchLeaveRequest('');
                      //   setSearchCheckInOutRequest('');
                      // }}
                      startIcon={
                        <Image
                          width={20}
                          height={22}
                          alt="Refresh"
                          src={`${(currentTab === 'Leave Requests' && refreshLeaveRequest.isPending) || (currentTab !== 'Leave Requests' && refreshClockInRequest.isPending) ? '/icons/Refresh-Disabled.svg' : '/icons/Refresh.svg'}`}
                          className={`${((currentTab === 'Leave Requests' && refreshLeaveRequest.isPending) || (currentTab !== 'Leave Requests' && refreshClockInRequest.isPending)) && 'icon-refresh-play'}`}
                        />
                      }
                      onClick={handleRefresh}
                    >
                      Refresh
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    my: { xs: '10px', lg: 0 },
                    display: { xs: 'flex', md: 'none' },
                  }}
                  maxWidth="100%"
                  alignItems={'center'}
                >
                  <Box
                    maxWidth="100%"
                    sx={{ mb: { xs: '10px', lg: 0 } }}
                    display={'flex'}
                  >
                    <Input
                      //   setIsLoading={
                      //     tabData?.currentReqTypeTab === 'Leave Requests'
                      //       ? setIsLoading
                      //       : setIsLoading
                      //   }
                      handleChange={
                        tabData?.currentReqTypeTab === 'Leave Requests'
                          ? setSearchLeaveRequest
                          : setSearchCheckInOutRequest
                      }
                      value={
                        tabData?.currentReqTypeTab === 'Leave Requests'
                          ? searchLeaveRequest
                          : searchCheckInOutRequest
                      }
                      prefixIcon="SearchIcon.svg"
                    />
                    <Box
                      sx={{
                        border: 'solid 1px #029E9C',
                        width: '60px',
                        p: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '5px',
                        mx: '10px',
                      }}
                      onClick={handleRefresh}
                    >
                      <Image
                        width={15}
                        height={15}
                        alt="Refresh"
                        src={`${(currentTab === 'Leave Requests' && refreshLeaveRequest.isPending) || (currentTab !== 'Leave Requests' && refreshClockInRequest.isPending) ? '/icons/Refresh-Disabled.svg' : '/icons/Refresh.svg'}`}
                        className={`${((currentTab === 'Leave Requests' && refreshLeaveRequest.isPending) || (currentTab !== 'Leave Requests' && refreshClockInRequest.isPending)) && 'icon-refresh-play'}`}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <>
                <Box marginY={'20px'}>
                  <Input
                    // setIsLoading={setIsLoading}
                    handleChange={setSearch}
                    value={search}
                    prefixIcon="SearchIcon.svg"
                    suffixIcon="QuestionMarkIcon.svg"
                    tooltip="Enter the relevant field type and easily filter the relevant data to search"
                  />
                </Box>

                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={leaveBalanceColumn}
                    data={filterData}
                    isLoading={isLoading}
                  />
                </Box>
              </>
            )}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};

export default RequestStatusTabs;
