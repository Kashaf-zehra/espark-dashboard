'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import { POLICIES_DATA } from '@/src/constants/policies';
import PoliciesCard from '@/src/components/policies/policiesCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { CLIENT_POLICY } from '@/src/services/apiService/apiEndPoints';
import {
  fetchClientPoliciesRequestFailed,
  fetchClientPoliciesRequestSuccess,
} from '@/src/redux/slices/clientSlices/policiesSlice';
import { useDispatch } from 'react-redux';
import { Toast } from '@/src/components/Toast/Toast';

const Policies = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['policiesQuery'],
    queryFn: async () => {
      // dispatch(fetchClientPoliciesRequest());
      return api
        .getData(`${CLIENT_POLICY}`)
        .then(({ data }) => {
          dispatch(fetchClientPoliciesRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchClientPoliciesRequestFailed());
          console.log({ err });
        });
    },
  });

  if (!data && !isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          sx={{
            fontSize: '30px',
            fontFamily: 'sans-serif',
          }}
        >
          Policy Data is not available.
        </Typography>
      </Box>
    );
  }
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '10px',
            gap: '80px',
            width: '100%',
          }}
        >
          <Heading
            title={POLICIES_DATA?.title}
            description={POLICIES_DATA?.description}
            isLoading={isLoading}
            containerStyles={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'center' },
            }}
          />
          <PoliciesCard
            policyData={data}
            data={POLICIES_DATA?.items}
            isLoading={isLoading}
          />
        </Box>
      </Grid>
    </>
  );
};
export default Policies;
