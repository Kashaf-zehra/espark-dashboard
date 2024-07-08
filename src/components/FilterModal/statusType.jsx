import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { FILTER } from '@/src/constants/filter';
import { employeeProfileData } from '@/src/constants/employeeProfile';

const StatusType = ({ displayedStatusOptions, setSearchText }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [isInputLabelVisible, setIsInputLabelVisible] = useState(true);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setIsInputLabelVisible(selectedValue === '');
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          color: '#595959',
          marginBottom: '10px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        {FILTER?.status}
      </Typography>
      <FormControl fullWidth>
        <InputLabel
          shrink={false}
          disabled
          sx={{
            display: isInputLabelVisible ? 'block' : 'none',
            marginTop: '-5px',
          }}
        >
          {employeeProfileData?.select}
        </InputLabel>
        <Select
          sx={{
            '&:focus': {
              borderColor: 'teal',
            },
            width: '100%',
            padding: '0px',
            height: '40px',
          }}
          value={selectedValue}
          onChange={handleChange}
          IconComponent={() => (
            <InputAdornment
              sx={{
                marginRight: '10px',
              }}
            >
              <Image
                src={'/images/hiring/rightarrow.png'}
                width={25}
                height={25}
                alt="Dropdown"
              />
            </InputAdornment>
          )}
        >
          <ListSubheader>
            <TextField
              size="small"
              placeholder={FILTER?.searchHere}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      width={20}
                      height={22}
                      alt="Refresh"
                      src={`/images/filter/searchgray.svg`}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedStatusOptions?.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default StatusType;
