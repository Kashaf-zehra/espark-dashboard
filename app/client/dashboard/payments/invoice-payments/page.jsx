'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';

import Input from '@/src/components/dashboard/input';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterDataByKeyword } from '@/src/utils/search';
import { changeTab } from '@/src/utils/tabs';
import { paymentStatusTabs } from '@/src/constants/data/tabs/paymentTabs';
import {
  invoicePaymentColumn,
  invoicePaymentData,
  otherPaymentColumn,
  otherPaymentData,
} from '@/src/constants/data/tables/paymentData';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import AppTable from '@/src/components/appTableNew/AppTable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  CLIENT_INVOICE_PAYMENTS,
  DOWNLOAD_EMP_INV,
  DOWNLOAD_OTH_INV,
} from '@/src/services/apiService/apiEndPoints';
import {
  fetchOtherPaidInvoicePaymentsRequestSuccess,
  fetchOtherPendingInvoicePaymentsRequestSuccess,
  fetchOtherProcessingInvoicePaymentsRequestSuccess,
  fetchPaidInvoicePaymentsRequest,
  fetchPaidInvoicePaymentsRequestFailed,
  fetchPaidInvoicePaymentsRequestSuccess,
  fetchPendingInvoicePaymentsRequest,
  fetchPendingInvoicePaymentsRequestFailed,
  fetchPendingInvoicePaymentsRequestSuccess,
  fetchProcessingInvoicePaymentsRequest,
  fetchProcessingInvoicePaymentsRequestFailed,
  fetchProcessingInvoicePaymentsRequestSuccess,
  updateEmpInvStatus,
} from '@/src/redux/slices/clientSlices/invoicePaymentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';

const Dashboard = () => {
  const { data, otherInvoicesData } = useSelector(
    (state) => state?.client?.invoicePayments
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState('Pending');
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchOthPay, setSearchOthPay] = useState('');
  const [empInvPendingDataState, setEmpInvPendingDataState] = useState([]);
  const [empInvProcessingDataState, setEmpInvProcessingDataState] = useState(
    []
  );
  const [empInvPaidDataState, setEmpInvPaidDataState] = useState([]);
  const [othInvDataState, setOthInvDataState] = useState([]);
  const [updateStatusType, setUpdateStatusType] = useState({
    currentVal: null,
    newVal: null,
    currentInvData: null,
  });
  const [updateRowID, setUpdateRowID] = useState(null);

  const pendingInvoice = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['pendingInvoicePayments'],
    queryFn: async () => {
      dispatch(fetchPendingInvoicePaymentsRequest());
      // dispatch(fetchOtherPendingInvoicePaymentsRequest());
      return api
        .getData(`${CLIENT_INVOICE_PAYMENTS}?payment_status=pending`)
        .then(({ data }) => {
          const tempData =
            data === ''
              ? []
              : data?.employee_invoices?.map((item) => ({
                  ...item,
                  download: 'Download',
                  contract_doc: item?.download,
                  inv_type: 'employee_invoice',
                }));
          const tempOthInvData =
            data === ''
              ? []
              : data?.other_payments?.map((item) => ({
                  ...item,
                  download: 'Download',
                  contract_doc: item?.download,
                  inv_type: 'other_payment',
                }));
          dispatch(fetchPendingInvoicePaymentsRequestSuccess(tempData));
          dispatch(
            fetchOtherPendingInvoicePaymentsRequestSuccess(tempOthInvData)
          );
          return tempOthInvData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchPendingInvoicePaymentsRequestFailed());
          // dispatch(fetchOtherPendingInvoicePaymentsRequestFailed());
          console.log({ err });
        });
    },
  });
  const processingInvoice = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['processingInvoicePayments'],
    queryFn: async () => {
      dispatch(fetchProcessingInvoicePaymentsRequest());
      // dispatch(fetchOtherProcessingInvoicePaymentsRequest());
      return api
        .getData(`${CLIENT_INVOICE_PAYMENTS}?payment_status=processing`)
        .then(({ data }) => {
          console.log({ processData: data });
          const tempData =
            data === ''
              ? []
              : data?.employee_invoices?.map((item) => ({
                  ...item,
                  download: 'Download',
                  contract_doc: item?.download,
                  inv_type: 'employee_invoice',
                }));
          const tempOthInvData =
            data === ''
              ? []
              : data?.other_payments?.map((item) => ({
                  ...item,
                  download: 'Download',
                  contract_doc: item?.download,
                  inv_type: 'other_payment',
                }));
          dispatch(fetchProcessingInvoicePaymentsRequestSuccess(tempData));
          dispatch(
            fetchOtherProcessingInvoicePaymentsRequestSuccess(tempOthInvData)
          );
          return tempOthInvData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchProcessingInvoicePaymentsRequestFailed());
          // dispatch(fetchOtherProcessingInvoicePaymentsRequestFailed());
          console.log({ err });
        });
    },
  });
  const paidInvoice = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['paidInvoicePayments'],
    queryFn: async () => {
      dispatch(fetchPaidInvoicePaymentsRequest());
      // dispatch(fetchOtherPaidInvoicePaymentsRequest());
      return api
        .getData(`${CLIENT_INVOICE_PAYMENTS}?payment_status=paid`)
        .then(({ data }) => {
          const tempData =
            data === ''
              ? []
              : data?.employee_invoices?.map((item) => ({
                  ...item,
                  download: 'Download',
                  contract_doc: item?.download,
                  inv_type: 'employee_invoice',
                }));
          const tempOthInvData =
            data === ''
              ? []
              : data?.other_payments?.map((item) => ({
                  ...item,
                  download: 'Download',
                  contract_doc: item?.download,
                  inv_type: 'other_payment',
                }));
          dispatch(fetchPaidInvoicePaymentsRequestSuccess(tempData));
          dispatch(fetchOtherPaidInvoicePaymentsRequestSuccess(tempOthInvData));
          return tempOthInvData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchPaidInvoicePaymentsRequestFailed());
          // dispatch(fetchOtherPaidInvoicePaymentsRequestFailed());
          console.log({ err });
        });
    },
  });

  useEffect(() => {
    const tempData =
      value === 0 ? data?.pending : value === 1 ? data?.processing : data?.paid;
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(
        tempData,
        search || '',
        value === 0
          ? setEmpInvPendingDataState
          : value === 1
            ? setEmpInvProcessingDataState
            : setEmpInvPaidDataState,
        data
      );
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value, data]);
  useEffect(() => {
    const tempData = [
      ...otherInvoicesData.pending,
      ...otherInvoicesData.processing,
      ...otherInvoicesData.paid,
    ];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(tempData, searchOthPay || '', setOthInvDataState);
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchOthPay, otherInvoicesData]);

  const handleChange = (event, newValue) => {
    changeTab({
      tabs: paymentStatusTabs,
      event,
      newValue,
      setSearch,
      setCurrentTab,
      setValue,
      teamMembersData: invoicePaymentData,
      filterTableRowsWRTTab,
      filterBy: 'paymentStatus',
    });
  };

  useEffect(() => {
    const data = [
      ...filterTableRowsWRTTab(invoicePaymentData, {
        paymentStatus: currentTab,
      }),
    ];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, search || '');
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, value, currentTab]);
  useEffect(() => {
    const data = [...filterTableRowsWRTTab(otherPaymentData)];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(data, searchOthPay || '');
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchOthPay]);
  const updateInvoiceStatusMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(
        `${CLIENT_INVOICE_PAYMENTS}?id=${data?.id}`,
        data?.values
      );
    },
    onSuccess: () => {
      Toast('success', 'Status updated successfully');
      dispatch(
        updateEmpInvStatus({
          currentVal: updateStatusType.currentVal,
          id: updateRowID,
          newVal: updateStatusType.newVal,
          data: updateStatusType?.currentInvData,
        })
      );
      setUpdateStatusType({
        currentInvData: null,
        newVal: null,
        currentVal: null,
      });
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
    },
  });
  const updateInvoiceStatus = (data, newVal) => {
    setUpdateRowID(data?.id);
    setUpdateStatusType({
      currentVal: data.payment_status,
      newVal: newVal,
      currentInvData: data,
    });
    const tempData = {
      id: data?.id,
      values: {
        category: data?.inv_type,
        payment_status: newVal.toLowerCase(),
      },
    };
    updateInvoiceStatusMutation.mutate(tempData);
  };
  useEffect(() => {
    setEmpInvPendingDataState(data?.pending);
    setEmpInvProcessingDataState(data?.processing);
    setEmpInvPaidDataState(data?.paid);
    setOthInvDataState([
      ...otherInvoicesData.pending,
      ...otherInvoicesData.processing,
      ...otherInvoicesData.paid,
    ]);
  }, [
    data?.pending,
    data?.processing,
    data?.paid,
    otherInvoicesData.pending,
    otherInvoicesData.processing,
    otherInvoicesData.paid,
  ]);
  const downloadInvoiceMutation = useMutation({
    mutationFn: async (data) => {
      return api.downloadFile(`${data.url}?id=${data.id}`);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
      console.log({ err });
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const downloadInvoice = (id, url) => {
    downloadInvoiceMutation.mutate({ id, url });
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
          <Box sx={{ width: '100%' }}>
            <DashboardHeading title={'Invoice payments'} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
              >
                {paymentStatusTabs?.map(({ label, prop }, i) => (
                  <Tab
                    key={i}
                    label={`${label}`}
                    disableRipple={true}
                    {...prop}
                    sx={{
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
              {isLoading ||
              paidInvoice.isLoading ||
              processingInvoice.isLoading ||
              pendingInvoice.isLoading ? (
                <Skeleton
                  variant="text"
                  width={'200px'}
                  height={30}
                  sx={{ background: '#F6F6F6', fontSize: '2.5rem' }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 400,
                    marginBottom: '20px',
                    color: '#171717',
                  }}
                >
                  Employee invoices
                </Typography>
              )}

              <Input
                setIsLoading={setIsLoading}
                handleChange={setSearch}
                value={search}
                prefixIcon="SearchIcon.svg"
                suffixIcon="QuestionMarkIcon.svg"
                tooltip="Enter the relevant field type and easily filter the relevant data to search"
              />
            </Box>
            {paymentStatusTabs?.map((_, i) => (
              <CustomTabPanel value={value} key={i} index={i}>
                <Box
                  sx={{
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <AppTable
                    column={invoicePaymentColumn}
                    data={
                      value === 0
                        ? empInvPendingDataState.filter(
                            (item) =>
                              item?.inv_type?.toLowerCase() ==
                              'employee_invoice'
                          )
                        : value === 1
                          ? empInvProcessingDataState.filter(
                              (item) =>
                                item?.inv_type?.toLowerCase() ==
                                'employee_invoice'
                            )
                          : empInvPaidDataState.filter(
                              (item) =>
                                item?.inv_type?.toLowerCase() ==
                                'employee_invoice'
                            )
                    }
                    updateStatus={updateInvoiceStatus}
                    handleClickDownload={(id) =>
                      downloadInvoice(id, DOWNLOAD_EMP_INV)
                    }
                    isLoading={isLoading}
                  />
                </Box>
              </CustomTabPanel>
            ))}
          </Box>
        </Box>
      </Grid>
      <br />
      <hr />
      <br />
      <br />
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
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {isLoading ? (
              <Skeleton
                variant="text"
                width={'200px'}
                height={30}
                sx={{
                  background: '#F6F6F6',
                  fontSize: '2.5rem',
                  marginTop: '20px',
                }}
              />
            ) : (
              <Typography
                sx={{ fontSize: '20px', fontWeight: 400, color: '#171717' }}
              >
                Other Payments
              </Typography>
            )}
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box my={4}>
              <Input
                handleChange={setSearchOthPay}
                value={searchOthPay}
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
                column={otherPaymentColumn}
                data={othInvDataState}
                // data={getOtherInvData()}
                updateStatus={updateInvoiceStatus}
                handleClickDownload={(id) =>
                  downloadInvoice(id, DOWNLOAD_OTH_INV)
                }
                isLoading={isLoading}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
export default Dashboard;
