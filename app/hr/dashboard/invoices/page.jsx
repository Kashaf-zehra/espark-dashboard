'use client';
import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import Image from 'next/image';

import AppTable from '@/src/components/appTableNew/AppTable';
import { invoicePageColumn } from '@/src/constants/data/tables/hr/invoicesPageData';
import Input from '@/src/components/dashboard/input';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  HR_GET_CLIENT_PROFILE,
  HR_INVOICES,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { getInvoicesData } from '@/src/redux/slices/hrSlices/invoices';
import {
  getCurrentClientData,
  getCurrentClientDataFailed,
  getCurrentClientDataSuccess,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { useRouter } from 'next/navigation';
import { Toast } from '@/src/components/Toast/Toast';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';

const Page = () => {
  const router = useRouter();
  const { data } = useSelector((state) => state.hr.invoices);
  const [status, setStatus] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-invoices-query'],
    queryFn: async () => {
      return api
        .getData(`${HR_INVOICES}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  emp_inv_link: 'Link',
                  oth_inv_link: 'Link',
                }))
              : [];
          dispatch(getInvoicesData(tempData));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          // dispatch(fetchClientPoliciesRequestFailed());
          console.log({ err });
        });
    },
  });

  const clientInfoMutation = useMutation({
    mutationFn: async (id) => {
      dispatch(getCurrentClientData());
      console.log({ mutationID: id });
      return api.getData(`${HR_GET_CLIENT_PROFILE}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      console.log({ selectedClient, data });
      dispatch(getCurrentClientDataSuccess(data));
      router.push(`/hr/dashboard/clients/${selectedClient}`);
      return data;
    },
    onError: (err) => {
      dispatch(getCurrentClientDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  const handleClickLink = (row, colTitle) => {
    const { id } = row;
    setSelectedClient(row?.id);
    clientInfoMutation.mutate(row?.id);
    if (colTitle === 'Employee invoices') {
      window.location.href = `/hr/dashboard/clients/${id}?param=employee_invoices`;
    } else if (colTitle === 'Other invoices') {
      window.location.href = `/hr/dashboard/clients/${id}?param=other_invoices`;
    } else {
      window.location.href = `/hr/dashboard/clients/${id}`;
    }
  };

  const handleSearch = () => {
    const filtered = data?.filter((item) => {
      const companyNameMatch =
        name === '' ||
        item.company_name.toLowerCase().includes(name.toLowerCase());
      const statusMatch =
        status === null
          ? item
          : status === 'Active'
            ? item.is_active
            : !item.is_active;

      return companyNameMatch && statusMatch;
    });
    setFilteredData(filtered);
  };

  const handleButtonClick = () => {
    handleSearch();
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (!name) {
      setFilteredData(data);
    }
  }, [name]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <DashboardHeading title={`Invoices`} />
        <Grid
          container
          sx={{
            marginTop: '20px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '20px',
            },
          }}
          spacing={3}
        >
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Client name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <AppDropdown
              selectedItem={status}
              setSelectedItem={setStatus}
              lg={12}
              type="select"
              placeHolder={'Select status'}
              data={[
                {
                  label: 'Active',
                },
                {
                  label: 'Inactive',
                },
              ]}
              isLoadingList={isLoadingList}
              setIsLoadingList={setIsLoadingList}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={1} xl={1}>
            <Button
              disableRipple
              sx={{
                backgroundColor: '#029894',
                color: '#FFF',
                height: '40px',
                width: '100%',
                '&:hover': {
                  backgroundColor: '#029894',
                  color: '#FFF',
                },
                '@media (min-width: 900px) and (max-width: 1200px)': {
                  maxWidth: '530px',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0px auto',
                },
              }}
              onClick={handleButtonClick}
            >
              <Image
                width={24}
                height={24}
                alt="Refresh"
                src={`/icons/searchIconWhite.svg`}
              />
            </Button>
          </Grid>
        </Grid>
        {Array?.isArray(filteredData) && (
          <Box
            sx={{
              maxWidth: '100%',
              overflowX: 'auto',
              my: '20px',
            }}
          >
            <AppTable
              hanldeInvLinkClick={handleClickLink}
              column={invoicePageColumn}
              data={filteredData}
              isLoading={isLoading}
            />
          </Box>
        )}
      </Box>
    </>
  );
};
export default Page;
