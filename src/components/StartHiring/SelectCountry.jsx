import React, { useState } from 'react';
import {
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import { COUNTRY_OPTIONS } from '@/src/constants/countryCode';
import SalaryRange from './SalaryRangle';
import Image from 'next/image';
import FlagIcon from '@/src/constants/Flag';

const CountryDropdown = () => {
  const [selectedValue, setSelectedValue] = useState(COUNTRY_OPTIONS[2].label);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Grid
      container
      sx={{
        flexWrap: { xs: 'wrap', lg: 'nowrap' },
      }}
      gap={'20px'}
    >
      <Grid item xs={12} lg={6} className="country-custom-dropdown">
        <Typography sx={{ marginLeft: '4px', mb: '10px' }}>
          {HIRING_FORM_DATA?.country}
        </Typography>
        <Select
          sx={{
            '&:focus': {
              borderColor: 'teal',
            },
            width: '100%',
            padding: '0px',
          }}
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
          IconComponent={() => (
            <InputAdornment
              sx={{
                marginRight: '10px',
              }}
            >
              {isOpen ? (
                <Image
                  src={'/images/hiring/icon-down.svg'}
                  width={25}
                  height={25}
                  alt="Dropdown"
                />
              ) : (
                <Image
                  src={'/icons/Dropdown.svg'}
                  width={15}
                  height={15}
                  alt="Dropdown"
                />
              )}
            </InputAdornment>
          )}
          MenuProps={{
            style: {
              maxHeight: '300px',
              maxWidth: { xs: '100%', md: '40%' },
            },
          }}
          open={isOpen}
          onClick={handleClick}
        >
          {COUNTRY_OPTIONS?.map((option) => (
            <MenuItem key={option?.value} value={option?.label}>
              <FlagIcon countryCode={option?.value} />
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <SalaryRange />
    </Grid>
  );
};
export default CountryDropdown;
