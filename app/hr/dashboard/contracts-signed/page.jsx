'use client';
import React, { useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { contractHrSignedTabs } from '@/src/constants/data/tabs/contractSignedTabs';
import AppTable from '@/src/components/appTableNew/AppTable';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import AddContractHrPortalModal from '@/src/components/contractHrportal/contractHr';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { handleTabChange } from '@/src/utils/handleTab';
import {
  getClientsCompanyContractRequest,
  getClientsCompanyContractRequestFailed,
  getClientsCompanyContractRequestSuccess,
  getEmployeesCompanyContractRequestSuccess,
  getOffShoreContractRequest,
  getOffShoreContractRequestFailed,
  getOffShoreContractRequestSuccess,
} from '@/src/redux/slices/hrSlices/contractSlice';
import { api } from '@/src/services/apiService';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DOWNLOAD_COMP_CONTRACT,
  DOWNLOAD_OFFSHORE_CONTRACT,
  HR_COMPANY_CONTRACTS,
  HR_OFF_SHORE_CONTRACTS,
} from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';
import AddContractModal from '../clients/[id]/AddContractModal';
import EmployeeContractModal from '../clients/[id]/EmployeeContractModal';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';

const ContractSigned = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [deletingContractId, setDeletingContractId] = useState(null);
  const [nestedValue, setNestedValue] = useState(0);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const [isOpenAddContractModal, setIsOpenAddContractModal] = useState(false);
  const [isOpenEmployeeContractModal, setIsOpenEmployeeContractModal] =
    useState(false);

  const { companyContract, offShoreContract } = useSelector(
    (state) => state?.hr?.contracts
  );
  const [currentTab, setCurrentTab] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [search, setSearch] = useState('');
  // const [empData, setEmpData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const offShoreContractSignedQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['off-shore-contract-signed-query'],
    queryFn: async () => {
      dispatch(getOffShoreContractRequest());
      return api
        .getData(`${HR_OFF_SHORE_CONTRACTS}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  download: 'Download',
                  actionStatus: true,
                  action: ['Delete'],
                }))
              : [];
          dispatch(getOffShoreContractRequestSuccess(tempData || []));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getOffShoreContractRequestFailed());
          console.log({ err });
        });
    },
  });
  const conpanyContractSignedQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['company-contract-signed-query'],
    queryFn: async () => {
      dispatch(getClientsCompanyContractRequest());
      return api
        .getData(`${HR_COMPANY_CONTRACTS}?status=clients`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  download: 'Download',
                  actionStatus: true,
                  action: ['Delete'],
                }))
              : [];
          dispatch(getClientsCompanyContractRequestSuccess(tempData));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(getClientsCompanyContractRequestFailed());
          console.log({ err });
        });
    },
  });
  const companyContractSignedMutation = useMutation({
    mutationFn: async (status) => {
      dispatch(getClientsCompanyContractRequest());
      return api.getData(`${HR_COMPANY_CONTRACTS}?status=${status}`);
    },
    onSuccess: ({ data }) => {
      const tempData =
        data === ''
          ? []
          : data?.map((item) => ({
              ...item,
              download: 'Download',
              action: ['Delete'],
              contract_doc: item.contract_doc,
            }));
      if (nestedValue === 0) {
        dispatch(getClientsCompanyContractRequestSuccess(tempData));
      } else {
        dispatch(getEmployeesCompanyContractRequestSuccess(tempData));
      }
    },
    onError: (err) => {
      dispatch(getClientsCompanyContractRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const offShoreContractMutation = useMutation({
    mutationFn: async () => {
      dispatch(getOffShoreContractRequest());
      return api.getData(`${HR_OFF_SHORE_CONTRACTS}`);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const tempData =
        data !== ''
          ? data?.map((item) => ({
              ...item,
              download: 'Download',
              actionStatus: true,
              action: ['Delete'],
            }))
          : [];
      dispatch(getOffShoreContractRequestSuccess(tempData || []));
    },
    onError: (err) => {
      dispatch(getOffShoreContractRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  // console.log(empData, setSearch);
  const handleChange = (event, newValue) => {
    handleTabChange(event, newValue, setCurrentTab, setValue, setNestedValue);
  };
  const handleOpenContractModal = () => {
    setIsOpenContractModal(true);
  };
  const handleOpenAddContratcModal = () => {
    setIsOpenAddContractModal(true);
  };
  const handleCloseAddContratcModal = () => {
    setIsOpenAddContractModal(false);
  };
  const handleOpenEmployeeContratcModal = () => {
    setIsOpenEmployeeContractModal(true);
  };
  const handleCloseEmployeeContratcModal = () => {
    setIsOpenEmployeeContractModal(false);
  };
  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
    if (newValue === 0) {
      companyContractSignedMutation.mutate('clients');
    } else {
      companyContractSignedMutation.mutate('employees');
    }
  };
  const handleClose = () => setIsOpen(false);
  const handleClickDelete = (id) => {
    setDeletingContractId(id);
    setIsOpen(true);
  };
  const handleCloseContractModal = () => {
    setIsOpenContractModal(false);
  };
  // const handleConfirmDelete
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      let url = `${HR_COMPANY_CONTRACTS}?status=clients&id=${id}`;
      if (value === 0) {
        if (nestedValue === 1) {
          url = `${HR_COMPANY_CONTRACTS}?status=employees&id=${id}`;
        }
      } else {
        url = `${HR_OFF_SHORE_CONTRACTS}?id=${id}`;
      }
      return api.daleteData(url);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      setDeletingContractId(null);
      // console.log({ data });
      if (value === 0) {
        if (nestedValue === 0) {
          companyContractSignedMutation.mutate('clients');
        } else {
          companyContractSignedMutation.mutate('employees');
        }
      } else {
        offShoreContractMutation.mutate();
      }
      handleClose();
      // setModalData({});
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      // dispatch(deleteClientHiringRequestFailed());
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const resolveURL = (id) => {
    let url;
    if (value === 0) {
      if (nestedValue === 0) {
        url = `${DOWNLOAD_COMP_CONTRACT}?id=${id}&tab=client`;
      } else {
        url = `${DOWNLOAD_COMP_CONTRACT}?id=${id}&tab=employee`;
      }
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
      console.log({ data });
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
  const handleConfirmDelete = () => mutate(deletingContractId);
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
            <DashboardHeading title={`Contracts`} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box
              display={'flex'}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                justifyContent: { xs: 'center', md: 'space-between' },
                flexDirection: { xs: 'column', md: 'row' },
                mb: '20px',
              }}
            >
              <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
              >
                {contractHrSignedTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    {...prop}
                    disableRipple={true}
                    sx={{
                      textTransform: 'math-auto',
                      mr: { xs: '0px', md: '20px' },
                      color: '#595959',
                      '&.Mui-selected': {
                        color: '#068987',
                      },
                    }}
                  />
                ))}
              </Tabs>
              {value === 1 && (
                <Button
                  onClick={handleOpenContractModal}
                  // variant="contained"
                  sx={{
                    width: '160px',
                    height: '40px',
                    my: { xs: '20px', md: 0 },
                    textTransform: 'math-auto',
                    fontSize: '16px',
                    backgroundColor: '#029894',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#029894',
                      color: '#fff',
                    },
                  }}
                >
                  {CONTRACT_SIGNED?.addContract}
                </Button>
              )}
            </Box>
            <Box my={2}>
              {contractHrSignedTabs?.map((tab, i) => (
                <CustomTabPanel value={value} key={i} index={i}>
                  <Box>
                    {value !== 1 && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: {
                            xs: 'center',
                            md: 'space-between',
                          },
                          flexDirection: { xs: 'column', md: 'row' },
                          borderBottom: 1,
                          borderColor: 'divider',
                          mb: '30px',
                        }}
                      >
                        <Tabs
                          value={nestedValue}
                          onChange={handleNestedChange}
                          TabIndicatorProps={{
                            style: { backgroundColor: '#068987' },
                          }}
                        >
                          {tab?.nested?.map((nestedTab, nestedIndex) => (
                            <Tab
                              label={nestedTab.label}
                              key={nestedIndex}
                              {...nestedTab.prop}
                              disableRipple={true}
                              sx={{
                                mr: '4px',
                                color: '#595959',
                                '&.Mui-selected': {
                                  color: '#068987',
                                },
                              }}
                            />
                          ))}
                        </Tabs>
                        {tab?.nested &&
                          tab.nested[nestedValue]?.columns &&
                          tab.nested[nestedValue]?.data && (
                            <Button
                              onClick={
                                nestedValue === 0
                                  ? handleOpenAddContratcModal
                                  : handleOpenEmployeeContratcModal
                              }
                              variant="contained"
                              sx={{
                                width: '160px',
                                height: '40px',
                                my: { xs: '20px', md: 0 },
                                fontSize: '16px',
                                textTransform: 'math-auto',
                                backgroundColor: '#029894',
                                color: '#fff',
                                '&:hover': {
                                  backgroundColor: '#029894',
                                  color: '#fff',
                                },
                              }}
                            >
                              {CONTRACT_SIGNED?.addContract}
                            </Button>
                          )}
                      </Box>
                    )}
                    <Box sx={{ maxWidth: '100%', overflow: 'auto' }}>
                      {tab?.nested &&
                        tab.nested[nestedValue]?.columns &&
                        tab.nested[nestedValue]?.data &&
                        !conpanyContractSignedQuery.isLoading && (
                          <AppTable
                            currentTab={currentTab}
                            column={tab.nested[nestedValue].columns}
                            data={
                              nestedValue === 0
                                ? companyContract.clients
                                : companyContract.employees // : JSON.parse(companyContract.employees)
                            }
                            handleClickActionDelete={handleClickDelete}
                            noPagination
                            tableRowClass="app-table-row-contract"
                            isLoading={conpanyContractSignedQuery.isLoading}
                            handleClickDownload={downloadContract}
                          />
                        )}
                      {value !== 0 &&
                        !offShoreContractSignedQuery.isLoading && (
                          <AppTable
                            currentTab={currentTab}
                            column={tab?.columns}
                            data={offShoreContract || []}
                            handleClickActionDelete={handleClickDelete}
                            noPagination
                            tableRowClass="app-table-row-contract"
                            isLoading={offShoreContractSignedQuery.isLoading}
                            handleClickDownload={downloadContract}
                          />
                        )}
                    </Box>
                  </Box>
                  {/* )} */}
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
      <AppConfirmationMadal
        title={CONTRACT_SIGNED?.delete}
        bodyText={CONTRACT_SIGNED?.warning}
        cancelButtonText={CONTRACT_SIGNED?.cancel}
        confirmButtonText={CONTRACT_SIGNED?.delete}
        isOpen={isOpen}
        handleClose={handleClose}
        value={value}
        nestedValue={nestedValue}
        id={deletingContractId}
        setDeletingContractId={setDeletingContractId}
        handleConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
      <AddContractModal
        open={isOpenAddContractModal}
        onClose={handleCloseAddContratcModal}
      />
      <EmployeeContractModal
        open={isOpenEmployeeContractModal}
        onClose={handleCloseEmployeeContratcModal}
      />
      <AddContractHrPortalModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
        endPoint={HR_OFF_SHORE_CONTRACTS}
        currentTab={value}
      />
    </>
  );
};
export default ContractSigned;
