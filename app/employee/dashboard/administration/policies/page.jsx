'use client';
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import Heading from '@/src/components/global/Heading';
import { POLICIES_DATA } from '@/src/constants/policies';
import PoliciesCard from '@/src/components/policies/policiesCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { EMP_POLICIES } from '@/src/services/apiService/apiEndPoints';
import { useDispatch } from 'react-redux';
import {
  fetchEmpPoliciesDataRequest,
  fetchEmpPoliciesDataRequestFailed,
  fetchEmpPoliciesDataRequestSuccess,
} from '@/src/redux/slices/employeeSlices/empPoliciesSlice';
import { Toast } from '@/src/components/Toast/Toast';

const Policies = () => {
  const dispatch = useDispatch();
  const filteredItems = POLICIES_DATA?.items.filter(
    (item) => item.id !== 4 && item.id !== 5
  );

  const { isLoading, data } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['policiesQuery'],
    queryFn: async () => {
      dispatch(fetchEmpPoliciesDataRequest());
      return api
        .getData(`${EMP_POLICIES}`)
        .then(({ data }) => {
          dispatch(fetchEmpPoliciesDataRequestSuccess(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          dispatch(fetchEmpPoliciesDataRequestFailed());
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
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '10px',
            gap: { xs: '40px', sm: '60px', md: '80px' },
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
            data={filteredItems}
            isLoading={isLoading}
          />
          {/* <PoliciesCard data={POLICIES_DATA?.items} /> */}
        </Box>
      </Grid>
    </>
  );
};
export default Policies;
