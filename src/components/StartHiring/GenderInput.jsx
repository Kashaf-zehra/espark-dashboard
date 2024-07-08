import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

import EmployementTerm from './EmployementTerm';
import AppDropdown from '../dashboard/appDropdown';
import { gender } from '@/src/constants/data/dropdown.js/startHiring';

const GenderInput = ({ open, SelectOpen, SelectClose }) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Grid
      container
      gap={'20px'}
      sx={{
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
      }}
    >
      <Grid item xs={12} lg={6}>
        <Typography
          sx={{
            mb: '10px',
          }}
        >
          {HIRING_FORM_DATA?.gender}
        </Typography>
        <AppDropdown
          data={gender}
          setIsLoadingList={setIsLoadingTitles}
          isLoadingList={isLoadingTitles}
          selectedItem={selectedJobTitle}
          setSelectedItem={setSelectedJobTitle}
          placeHolder="Select gender"
        />
      </Grid>
      <EmployementTerm
        open={open}
        SelectOpen={SelectOpen}
        SelectClose={SelectClose}
      />
    </Grid>
  );
};
export default GenderInput;
