import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import AppDropdown from '../dashboard/appDropdown';
import { employmentTerm } from '@/src/constants/data/dropdown.js/startHiring';

const EmployementTerm = () => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Grid item xs={12} lg={6}>
      <Typography
        sx={{
          mb: '10px',
        }}
      >
        {HIRING_FORM_DATA?.employementTerm}
      </Typography>
      <AppDropdown
        data={employmentTerm}
        setIsLoadingList={setIsLoadingTitles}
        isLoadingList={isLoadingTitles}
        selectedItem={selectedJobTitle}
        setSelectedItem={setSelectedJobTitle}
        placeHolder="Select employment terms"
      />
    </Grid>
  );
};
export default EmployementTerm;
