import React from 'react';
import { Box, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import DownloadPolicies from './downloadPolicies';

const PoliciesCard = ({ data, policyData, isLoading }) => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          maxWidth: '900px',
          width: '100%',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridTemplateColumns:
            policyData?.length === 1 ? '1fr' : 'repeat(2, 1fr)',
          '@media (min-width: 280px) and (max-width: 768px)': {
            gridTemplateRows: 'repeat(1, 1fr)',
            gridTemplateColumns: 'repeat(1, 1fr)',
            mx: 0,
          },
          justifyContent:
            data?.length === 1
              ? { xs: 'flex-start', lg: 'center' }
              : { xs: 'flex-start', lg: 'flex-start' },
          columnGap: 3.5,
          rowGap: 3.5,
          flexWrap: 'wrap',
          mx: 'auto',
        }}
      >
        {isLoading ? (
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={5}
            sx={{
              width: '100%',
              display: 'flex',
              mx: 'auto',
            }}
          >
            <Stack
              spacing={5}
              sx={{
                minWidth: { xs: '100%', md: '400px' },
                width: '50%',
                minHeight: '300px',
                border: '1px solid #E4E4E4',
                borderRadius: '10px',
                alignItems: { xs: 'center', sm: 'start' },
                textAlign: { xs: 'center', sm: 'start' },
                padding: '40px 28px',
                '@media (min-width: 769px) and (max-width: 899px)': {
                  width: '340px',
                },
                '@media (min-width: 800px) and (max-width: 1200px)': {
                  maxWidth: '40%',
                  display: 'flex',
                  mx: 'auto',
                },
                '@media (min-width: 600px) and (max-width: 800px)': {
                  maxWidth: '55%',
                  display: 'flex',
                  mx: 'auto',
                },
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Stack spacing={1} width={'30%'}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </Stack>
              <Skeleton variant="rounded" width={120} height={40} />
            </Stack>
            <Stack
              spacing={5}
              sx={{
                minWidth: { xs: '100%', md: '400px' },
                width: '50%',
                minHeight: '300px',
                border: '1px solid #E4E4E4',
                borderRadius: '10px',
                alignItems: { xs: 'center', sm: 'start' },
                textAlign: { xs: 'center', sm: 'start' },
                padding: '40px 28px',
                '@media (min-width: 769px) and (max-width: 899px)': {
                  width: '340px',
                },
                '@media (min-width: 800px) and (max-width: 1200px)': {
                  maxWidth: '40%',
                  display: 'flex',
                  mx: 'auto',
                },
                '@media (min-width: 600px) and (max-width: 800px)': {
                  maxWidth: '55%',
                  display: 'flex',
                  mx: 'auto',
                },
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Stack spacing={1} width={'30%'}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              </Stack>
              <Skeleton variant="rounded" width={120} height={40} />
            </Stack>
          </Stack>
        ) : (
          policyData?.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: { xs: 'start', lg: 'center' },
              }}
            >
              <DownloadPolicies
                key={item.id}
                image={'/images/policies/salary-document.svg'}
                reportHeading={item.policy_name}
                downloadReports={
                  'Generate and download all your payroll reports'
                }
                downloadBtn={'Download'}
                documentLink={item?.policy_doc}
                data={policyData}
              />
            </Box>
          ))
        )}
      </Box>
    </>
  );
};
export default PoliciesCard;
