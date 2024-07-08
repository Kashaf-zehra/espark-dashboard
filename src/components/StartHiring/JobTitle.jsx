import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import RoleType from './RoleType';
import AppNestedDropdown from '../dashboard/appDropdown';
import { jobTitles } from '@/src/constants/data/dropdown.js/startHiring';

const JobTitle = ({
  open,
  SelectOpen,
  SelectClose,
  showRoleType,
  gap,
  title,
}) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  return (
    <Grid
      container
      gap={gap}
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
          {title}
        </Typography>
        <AppNestedDropdown
          data={jobTitles}
          setIsLoadingList={setIsLoadingTitles}
          isLoadingList={isLoadingTitles}
          selectedItem={selectedJobTitle}
          setSelectedItem={setSelectedJobTitle}
          nested
          placeHolder="Select job."
        />
      </Grid>
      {showRoleType && (
        <RoleType
          open={open}
          SelectOpen={SelectOpen}
          SelectClose={SelectClose}
        />
      )}
    </Grid>
  );
};

export default JobTitle;
