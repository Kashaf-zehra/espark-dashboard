'use client';
import React from 'react';
import { Grid, Box } from '@mui/material';

import { REPORT_DATA } from '@/src/constants/report';
import Heading from '@/src/components/global/Heading';
import ReportBoxes from '@/src/components/reports/reportBoxes';

const Reports = () => {
  return (
    <>
      <Grid container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '10px',
            gap: '20px',
            width: '100%',
          }}
        >
          <Heading
            title={REPORT_DATA?.title}
            description={REPORT_DATA?.description}
            containerStyles={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          />
          <ReportBoxes data={REPORT_DATA?.items} />
        </Box>
      </Grid>
    </>
  );
};
export default Reports;
