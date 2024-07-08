'use client';
import React, { useEffect } from 'react';
import { Box, Grid, Skeleton, Stack } from '@mui/material';

import DashboardHeading from '@/src/components/dashboard/dashboardHeading';
import HrAccess from '@/src/components/dashboard/hrAccess';
import { DASHBOARD_DATA } from '@/src/constants/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { Summary_Boxes } from '@/src/constants/data/hrDashboard';
import { useMutation } from '@tanstack/react-query';
import {
  getHomeData,
  getHomeDataRequest,
} from '@/src/redux/slices/hrSlices/homeSlice';
import { api } from '@/src/services/apiService';
import { HR_HOME } from '@/src/services/apiService/apiEndPoints';

const Dashboard = () => {
  const dispatch = useDispatch();
  const getData = () => {
    const tempData = JSON.parse(JSON.stringify(Summary_Boxes))?.map((item) => ({
      ...item,
      count: homeData[item.name],
    }));
    return tempData;
  };
  const hrHomeMutation = useMutation({
    mutationFn: async (url) => {
      dispatch(getHomeDataRequest());
      return api.getData(url);
    },
    onSuccess: ({ data }) => {
      dispatch(getHomeData(data));
      return data;
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  useEffect(() => {
    hrHomeMutation.mutate(HR_HOME);
  }, []);
  const { homeData, isLoading } = useSelector((state) => state?.hr?.home);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: '100%',
            }}
          >
            {homeData.user ? (
              <DashboardHeading
                isLoading={isLoading}
                title={`Hello ${homeData.user || 'Super Admin'}`}
                dashboardDescription={DASHBOARD_DATA?.dashboard}
              />
            ) : (
              <Stack spacing={1.5} sx={{ width: { xs: '100%', md: '200px' } }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} />
              </Stack>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <HrAccess isHr={true} data={getData()} isLoading={isLoading} />
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
