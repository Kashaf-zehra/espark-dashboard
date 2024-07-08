'use client';
import React, { useEffect } from 'react';
import { Grid, Box, Stack, Skeleton } from '@mui/material';

import OnBoarding from '@/src/components/dashboard/onBoarding';
import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import DiscoverTalentPlatform from '@/src/components/dashboard/discoverTalent';
import { DASHBOARD_DATA } from '@/src/constants/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/src/services/apiService';
import {
  fetchClientHomeDataRequest,
  fetchClientHomeDataRequestSuccess,
} from '@/src/redux/slices/clientSlices/homeSlice';
import { useMutation } from '@tanstack/react-query';
import { CLIENT_HOME } from '@/src/services/apiService/apiEndPoints';

const Dashboard = () => {
  const { username } = useSelector((state) => state?.client?.home?.data);
  const dispatch = useDispatch();

  const clientHomeMutation = useMutation({
    mutationFn: async (url) => {
      dispatch(fetchClientHomeDataRequest());
      return api.getData(url);
    },
    onSuccess: ({ data }) => {
      dispatch(fetchClientHomeDataRequestSuccess(data));
      return data;
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  useEffect(() => {
    clientHomeMutation.mutate(CLIENT_HOME);
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
              width: '100%',
            }}
          >
            {username ? (
              <DashboardHeading
                title={`Hello ${username},` || 'World'}
                dashboardDescription={DASHBOARD_DATA?.updates}
                // isLoading={isLoading}
              />
            ) : (
              <Stack spacing={1.5} sx={{ width: { xs: '100%', md: '200px' } }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
              </Stack>
            )}

            <Grid item xs={12}>
              <DiscoverTalentPlatform
              //  isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <OnBoarding />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
