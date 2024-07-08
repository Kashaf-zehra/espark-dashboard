import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import {
  activeClientData,
  activeClientsColumn,
} from '@/src/constants/data/tables/hr/employeeProfileClient';
import { a11yProps } from '@/src/utils/tabs';
import AppTable from '../appTableNew/AppTable';
import { useQuery } from '@tanstack/react-query';
import { HR_GET_EMP_PROFILE } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useParams } from 'next/navigation';
import { Toast } from '../Toast/Toast';

const Client = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-get-client'],
    queryFn: async () => {
      return api
        .getData(`${HR_GET_EMP_PROFILE}?id=${params.id}&tab=client`)
        .then(({ data }) => {
          return data || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const [currentTab, setCurrentTab] = useState({
    label: 'Active clients',
    val: 0,
    data: activeClientData,
    column: activeClientsColumn,
  });
  const tabs = [
    {
      prop: a11yProps(0),
      label: 'Active clients',
      data: activeClientData,
      column: activeClientsColumn,
    },
    {
      prop: a11yProps(1),
      label: 'Inactive clients',
      data: activeClientData,
      column: activeClientsColumn,
    },
  ];
  const handleChangeTab = (event, newValue, rest) => {
    console.log({ event, newValue, rest });
    setCurrentTab({
      label: tabs[newValue].label,
      val: newValue,
      data: tabs[newValue].data,
      column: tabs[newValue].column,
    });
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 'solid 1px #ccc',
          mb: '40px',
        }}
      >
        <Tabs
          value={currentTab.val}
          onChange={(ev, newVal) => {
            handleChangeTab(ev, newVal);
          }}
          aria-label="basic tabs example"
          variant="scrollable"
          TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
          sx={{ mt: '8px' }}
        >
          {tabs?.map(({ label, prop }, tabIndex) => (
            <Tab
              key={tabIndex}
              label={`${label}`}
              {...prop}
              disableRipple={true}
              sx={{
                marginRight: '10px',
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable
          currentTab={currentTab}
          column={currentTab.column}
          data={
            currentTab.val === 0
              ? data?.active_clients
              : data?.terminated_clients
          }
          noPagination
          isLoading={isLoading}
        />
      </Box>
    </>
  );
};

export default Client;
