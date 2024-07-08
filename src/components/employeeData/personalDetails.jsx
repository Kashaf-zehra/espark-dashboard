import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import JobTitle from '../StartHiring/JobTitle';
import { EDIT_MODAL, MARITAL_STATUS } from '@/src/constants/employeeProfile';
import DatePicker from './Datepicker';

const PersonalDetails = ({ handleClick, SelectOpen, SelectClose, isOpen }) => {
  const showRoleType = false;
  const [selectedValue, setSelectedValue] = useState(MARITAL_STATUS[0].label);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '38px',
        width: { xs: '100%', md: '100%' },
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
          {EDIT_MODAL?.employeeName}
        </Typography>
        <TextField
          sx={{ width: '82%' }}
          inputProps={{
            style: {
              height: '10px',
            },
          }}
          placeholder={EDIT_MODAL?.namePlaceholder}
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
          {EDIT_MODAL?.birthDate}
        </Typography>
        <DatePicker />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
          {EDIT_MODAL?.email}
        </Typography>
        <TextField
          sx={{
            width: '82%',
          }}
          inputProps={{
            style: {
              height: '10px',
            },
          }}
          placeholder={EDIT_MODAL?.emailPlaceholder}
        />
      </Box>
      <JobTitle title={'Job title'} gap={'0px'} showRoleType={showRoleType} />
      <Box sx={{ width: '100%', marginTop: '-40px' }}>
        <Typography sx={{ color: '#595959', marginBottom: '10px' }}>
          {EDIT_MODAL?.maritalStatus}
        </Typography>
        <Select
          sx={{
            '&:focus': {
              borderColor: 'teal',
            },
            width: '82%',
            padding: '0px',
            height: '45px',
          }}
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
          IconComponent={() => (
            <InputAdornment
              sx={{
                marginRight: '10px',
              }}
            >
              <Image
                src={
                  isOpen
                    ? '/images/hiring/icon-down.svg'
                    : '/images/hiring/rightarrow.png'
                }
                width={25}
                height={25}
                alt="Dropdown"
                onClick={handleClick}
              />
            </InputAdornment>
          )}
          onOpen={SelectOpen}
          onClose={SelectClose}
        >
          {MARITAL_STATUS?.map((option) => (
            <MenuItem key={option?.value} value={option?.label}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
export default PersonalDetails;
