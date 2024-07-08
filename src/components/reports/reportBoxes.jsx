import React from 'react';
import { Box, Grid } from '@mui/material';

import DownloadReports from './downloadReports';
import PreviousDateModal from '../requestview/PreviousDateModal';

const ReportBoxes = ({ data }) => {
  return (
    <>
      <Grid container spacing={0}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
            '@media (min-width: 1200px) and (max-width: 1379px)': {
              width: '100%',
            },
            width: { xs: '100%', md: '100%', lg: '90%' },
            mx: 'auto',
          }}
        >
          <PreviousDateModal />
          {data?.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: { sm: 0, md: '25px' },
                '@media (min-width: 900px) and (max-width: 1280px)': {
                  padding: '15px',
                },
              }}
            >
              <DownloadReports
                key={item.id}
                image={item.image}
                reportHeading={item.reportHeading}
                downloadReports={item.downloadReports}
                downloadBtn={item.downloadBtn}
              />
            </Box>
          ))}
        </Box>
      </Grid>
    </>
  );
};
export default ReportBoxes;
