import React, { Fragment } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';

const SalaryRange = () => {
  const numberOfFields = HIRING_FORM_DATA?.numberOfFields;
  return (
    <Grid item xs={12} lg={6} flexDirection={'column'} display={'flex'}>
      <Typography
        sx={{
          mb: '10px',
        }}
      >
        {HIRING_FORM_DATA?.salaryRange}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {Array.from({ length: numberOfFields }, (_, index) => (
          <Fragment key={index}>
            <TextField
              className="text-field-custom"
              required={true}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: '5px',
                '@media (min-width: 960px) and (max-width: 1200px)': {
                  width: '50%',
                },
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                  {
                    display: 'none',
                  },
                '&:focus': {
                  borderColor: 'teal',
                  border: '0px solid',
                },
                '& fieldset': {},
              }}
              variant="outlined"
              type="number"
              placeholder={'0$'}
              InputProps={{
                '& input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                style: {
                  '& input:placeholder': {
                    marginTop: '-10px',
                  },
                },
              }}
            />
            {index < numberOfFields - 1 && (
              <Box p={'0 8.57px'}>
                <Box
                  sx={{
                    width: '4px',
                    height: '1px',
                    background: '#000',
                  }}
                />
              </Box>
            )}
          </Fragment>
        ))}
      </Box>
    </Grid>
  );
};
export default SalaryRange;
