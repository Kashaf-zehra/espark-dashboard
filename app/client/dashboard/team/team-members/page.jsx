'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Input from '@/src/components/dashboard/input';
import { teamMembersData } from '@/src/constants/data/tables/teamMembers';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { changeTab } from '@/src/utils/tabs';
import { teamTabs } from '@/src/constants/data/tabs/teamTabs';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppTable from '@/src/components/appTableNew/AppTable';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_TEAM_MEMBER } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTeamMembersRequest,
  fetchTeamMembersRequestFailed,
  fetchTeamMembersRequestActiveSuccess,
  fetchTeamMembersRequestOnBoardSuccess,
  fetchTeamMembersRequestTerminatedSuccess,
} from '@/src/redux/slices/clientSlices/teamMembersSlice';
import { Toast } from '@/src/components/Toast/Toast';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data } = useSelector((state) => state?.client?.teamMembers);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('All');
  const [search, setSearch] = useState('');
  const [allTeamMembers, setAllTeamMembers] = useState([]);
  const [activeTeamMembers, setActiveTeamMembers] = useState([]);
  const [onBoardTeamMembers, setOnBoardTeamMembers] = useState([]);
  const [terminatedTeamMembers, setTerminatedTeamMembers] = useState([]);
  const router = useRouter();

  function extractBenefits(data) {
    const result = [];

    if (data.life_insurance_card) {
      result.push('Life insurance');
    }
    if (data.medical_card) {
      result.push('Medical');
    }
    if (data.fuel_card) {
      result.push('Fuel');
    }

    return result.join(', ');
  }
  const temMembersQueryActive = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['team-members-active'],
    queryFn: async () => {
      dispatch(fetchTeamMembersRequest());
      return await api
        .getData(`${CLIENT_TEAM_MEMBER}/?status=active`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  benefits:
                    typeof item.benefits === 'string'
                      ? item.benefits
                      : extractBenefits(item.benefits),
                  status: 'Active',
                }))
              : [];
          dispatch(fetchTeamMembersRequestActiveSuccess(tempData || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const temMembersQueryOnBoard = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['team-members-onboard'],
    queryFn: async () => {
      dispatch(fetchTeamMembersRequest());
      return await api
        .getData(`${CLIENT_TEAM_MEMBER}/?status=onboard`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  status: 'onBoard',
                }))
              : [];
          dispatch(fetchTeamMembersRequestOnBoardSuccess(tempData || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  const temMembersQueryTerminated = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['team-members-terminated'],
    queryFn: async () => {
      dispatch(fetchTeamMembersRequest());
      return await api
        .getData(`${CLIENT_TEAM_MEMBER}/?status=terminated`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  status: 'Terminated',
                }))
              : [];
          dispatch(fetchTeamMembersRequestTerminatedSuccess(tempData || []));
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
        });
    },
  });
  useEffect(() => {
    if (
      temMembersQueryActive.isError ||
      temMembersQueryOnBoard.isError ||
      temMembersQueryTerminated.isError
    ) {
      dispatch(fetchTeamMembersRequestFailed());
    }
  }, [
    temMembersQueryActive.isError,
    temMembersQueryOnBoard.isError,
    temMembersQueryTerminated.isError,
  ]);
  useEffect(() => {
    setAllTeamMembers([...data.active, ...data.onBoard, ...data.terminated]);
    if (data?.active?.length) {
      setActiveTeamMembers(data?.active);
    }
    if (data?.terminated?.length) {
      setTerminatedTeamMembers(data?.active);
    }
    if (data?.onBoard?.length) {
      setOnBoardTeamMembers(data?.onBoard);
    }
  }, [data.active, data.onboard, data.terminated]);

  const handleChangeTab = (event, newValue) => {
    changeTab({
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      filterTableRowsWRTTab,
      teamMembersData,
      filterBy: 'memberStatus',
      // isSingular: true,
      // tabs: teamTabs,
      // event,
      // newValue,
      // setSearch,
      // setCurrentTab,
      // setValue,
    });
  };

  useEffect(() => {
    const tempData =
      value === 0
        ? [...data.active, ...data.onBoard, ...data.terminated]
        : value === 1
          ? data.active
          : value === 2
            ? data.onBoard
            : data.terminated;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(
        tempData,
        search || '',
        value === 0
          ? setAllTeamMembers
          : value === 1
            ? setActiveTeamMembers
            : value === 2
              ? setOnBoardTeamMembers
              : setTerminatedTeamMembers,
        data
      );
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value, data]);
  const ShowHireButton = (value) => {
    if (value === undefined || value === null) return false;
    return value === 0 || value === 1 || value === 3;
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
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'center', sm: 'space-between' },
                alignItems: 'center',
                width: '100%',
                pb: { xs: 2, sm: 1 },
              }}
            >
              <DashboardHeading title={`Team members`} />
              {ShowHireButton(value) && (
                <Button
                  onClick={() =>
                    router?.push(`${HIRING_FORM_DATA?.startHiringLink || '#'}`)
                  }
                  sx={{
                    background: '#029894',
                    fontSize: { xs: '14px', md: '16px' },
                    fontWeight: 600,
                    width: { xs: '100%', sm: '120px' },
                  }}
                  variant="contained"
                >
                  {HIRING_FORM_DATA?.newHire}
                </Button>
              )}
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
                >
                  {teamTabs?.map(({ label, prop }, i) => (
                    <Tab
                      key={i}
                      disableRipple={true}
                      sx={{
                        mr: '20px',
                        color: '#595959',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                      label={`${label} (${
                        filterTableRowsWRTTab(
                          i === 0
                            ? [
                                ...data.active,
                                ...data.onBoard,
                                ...data.terminated,
                              ]
                            : i === 1
                              ? data.active
                              : i === 2
                                ? data.onBoard
                                : data.terminated,
                          {
                            memberStatus: label === 'All' ? '' : label,
                          }
                        ).length
                      })`}
                      {...prop}
                      // value={label}
                    />
                  ))}
                </Tabs>
              </Box>
              <Box my={4}>
                <Input
                  handleChange={setSearch}
                  value={search}
                  prefixIcon="SearchIcon.svg"
                  suffixIcon="QuestionMarkIcon.svg"
                  tooltip="Enter the relevant field type and easily filter the relevant data to search"
                />
              </Box>
              {teamTabs?.map(({ column }, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  <Box
                    sx={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                  >
                    <AppTable
                      currentTab={currentTab}
                      column={column}
                      data={
                        value === 0
                          ? allTeamMembers
                          : value === 1
                            ? activeTeamMembers
                            : value === 2
                              ? onBoardTeamMembers
                              : terminatedTeamMembers
                      }
                      isLoading={
                        temMembersQueryActive?.isLoading ||
                        temMembersQueryOnBoard?.isLoading ||
                        temMembersQueryTerminated?.isLoading
                      }
                    />
                  </Box>
                </CustomTabPanel>
              ))}
            </Box>
          </div>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
