'use client';
import { Button, Grid } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../dashboard/input';
import Image from 'next/image';
import ClientView from './ClientView';
import { EMPLOYEE_DATA } from '@/src/constants/AllEmployee';
import { HR_GET_CLIENTS } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '../Toast/Toast';
import { getClientsData } from '@/src/redux/slices/hrSlices/clientSlice';
import DashboardHeading from '../dashboard/dashboardHeading';

const AllClients = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { client_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const { clients } = useSelector((state) => state?.hr?.clients);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [search, setSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const theme = useTheme();

  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['clientsQuery'],
    queryFn: () => {
      return api
        .getData(HR_GET_CLIENTS)
        .then(({ data }) => {
          console.log({ data });
          dispatch(getClientsData(data));
          return data || [];
        })
        .catch((error) => {
          Toast('error', error.message || 'Failed to get data');
          console.log({ error });
        });
    },
  });

  const searchFunction = () => {
    const filteredData =
      clients === ''
        ? []
        : clients?.filter((item) => {
            return (
              item.client_id.toLowerCase().includes(id.toLowerCase()) &&
              item.name.toLowerCase().includes(name.toLowerCase())
            );
          });
    return filteredData;
  };

  useEffect(() => {
    if (!id && !name) {
      setFilteredData(clients);
    }
  }, [id, name, clients]);

  const handleSearch = () => {
    setSearch(true);
    setFilteredData(searchFunction());
  };

  return (
    <>
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
        <DashboardHeading title={`Clients`} />
        {(role === 'super_admin' ||
          (role !== 'super_admin' && client_perms?.[0]?.write)) && (
          <Button
            sx={{
              backgroundColor: '#029894',
              width: { xs: '100%', sm: '160px' },
              color: '#FFF',
              textTransform: 'math-auto',
              fontSize: '16px',
              height: '40px',
              '&:hover': {
                backgroundColor: '#029894',
                color: '#FFF',
              },
            }}
            onClick={() => router.push('/hr/dashboard/clients/add-client')}
          >
            {EMPLOYEE_DATA?.addClient}
          </Button>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid
          container
          sx={{
            marginTop: '-5px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '60px',
            },
          }}
          spacing={3}
        >
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Client ID'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Client name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'name'}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={0.5}>
            <Button
              onClick={handleSearch}
              style={{
                backgroundColor: '#029894',
                color: '#FFF',
                height: '40px',
                width: '100%',
              }}
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
        <Box sx={{ maxWidth: '1480px' }}>
          {filteredData && filteredData.length > 0 && (
            <ClientView
              search={search}
              id={id}
              name={name}
              status={'All'}
              data={filteredData}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default AllClients;
