'use client';
import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { contractSignedTabs } from '@/src/constants/data/tabs/contractSignedTabs';
import AppTable from '@/src/components/appTableNew/AppTable';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  CLIENT_COMPANY_CONTRACT,
  CLIENT_EMPLOYEE_CONTRACT,
  DOWNLOAD_COMP_CONTRACT,
  DOWNLOAD_OFFSHORE_CONTRACT,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchClientEmpContractRequest,
  fetchClientEmpContractRequestFailed,
  fetchClientEmpContractRequestSuccess,
  fetchClientCompanyContractRequest,
  fetchClientCompanyContractRequestFailed,
  fetchClientCompanyContractRequestSuccess,
} from '@/src/redux/slices/clientSlices/contratSignedSlice';
import { Toast } from '@/src/components/Toast/Toast';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';

const ContractSigned = () => {
  const { data, isLoading } = useSelector((state) => state?.client?.contract);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Hiring Request');

  const companyContractSignedQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['company-contract-signed-query'],
    queryFn: async () => {
      dispatch(fetchClientCompanyContractRequest());
      return api
        .getData(`${CLIENT_COMPANY_CONTRACT}`)
        .then(({ data }) => {
          const tempData =
            data === ''
              ? []
              : data?.map((item) => ({
                  ...item,
                  download: 'Download',
                }));
          dispatch(fetchClientCompanyContractRequestSuccess(tempData));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchClientCompanyContractRequestFailed());
          console.log({ err });
        });
    },
  });
  const empContractSignedQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['employee-contract-signed-query'],
    queryFn: async () => {
      dispatch(fetchClientEmpContractRequest());
      return api
        .getData(`${CLIENT_EMPLOYEE_CONTRACT}`)
        .then(({ data }) => {
          const tempData =
            data === ''
              ? []
              : data?.map((item) => ({
                  ...item,
                  download: 'Download',
                }));
          dispatch(fetchClientEmpContractRequestSuccess(tempData));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchClientEmpContractRequestFailed());
          console.log({ err });
        });
    },
  });
  console.log({
    empContractSignedQuery,
    companyContractSignedQuery,
  });
  const handleChange = (event, newValue) => {
    let tab = event?.target?.innerText.split(' ');
    if (tab.length > 1) {
      tab = tab.slice(0, -1).join(' ');
    } else {
      tab = tab.join(' ');
    }
    setCurrentTab(tab);

    setValue(newValue);
  };
  const resolveURL = (id) => {
    let url;
    if (value === 0) {
      url = `${DOWNLOAD_COMP_CONTRACT}?id=${id}&tab=client`;
    } else {
      url = `${DOWNLOAD_OFFSHORE_CONTRACT}?id=${id}`;
    }
    return url;
  };
  const downloadContractMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(resolveURL(id));
    },
    onSuccess: ({ data }) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contract.pdf');
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
  const downloadContract = (id) => {
    downloadContractMutation.mutate(id);
  };
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            width: '100%',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <DashboardHeading
              title={'Contract signed'}
              dashboardDescription={'Visualise team details & manage members'}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
              >
                {contractSignedTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    {...prop}
                    disableRipple={true}
                    sx={{
                      textTransform: 'math-auto',
                      mr: '20px',
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box my={4}>
              {contractSignedTabs?.map((tab, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  <Box
                    sx={{
                      maxWidth: '100%',
                      overflowX: 'auto',
                    }}
                  >
                    <AppTable
                      currentTab={currentTab}
                      column={tab?.columns}
                      data={value === 0 ? data?.company : data?.employee}
                      tableRowClass="app-table-row-contract"
                      isLoading={isLoading}
                      handleClickDownload={downloadContract}
                    />
                  </Box>
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default ContractSigned;
