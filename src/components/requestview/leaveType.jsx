import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Image from 'next/image';

import { LEAVE_TYPE, REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';

const LeaveType = ({ isViewingClient, leaveType }) => {
  const [selectedValue, setSelectedValue] = useState();
  console.log(setSelectedValue);

  return (
    <Box
      sx={{
        background: '#F6F6F6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        gap: '5px',
      }}
    >
      <Typography sx={{ width: '90px' }}>
        {isViewingClient ? (
          REQUESTVIEW_DATA?.leaveTypes
        ) : (
          <>
            {REQUESTVIEW_DATA?.leaveTypes}
            <span
              style={{
                color: 'red',
                fontSize: '25px',
                marginLeft: '73px',
                marginTop: '-25px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              *
            </span>
          </>
        )}
      </Typography>

      <Select
        value={selectedValue}
        placeholder={isViewingClient ? 'Select' : leaveType}
        required={true}
        disabled={isViewingClient}
        sx={{
          height: '50px',
          width: { xs: '100%', md: '600px' },
          '@media (min-width: 900px) and (max-width: 1400px)': {
            width: '100%',
          },
        }}
        IconComponent={() => (
          <InputAdornment
            sx={{
              marginRight: '10px',
            }}
          >
            {open ? (
              <Image
                src="/images/hiring/icon-down.svg"
                width={20}
                height={20}
                alt="ArrowDown"
              />
            ) : (
              <Image
                src="/images/hiring/rightarrow.png"
                width={20}
                height={20}
                alt="ArrowRight"
              />
            )}
          </InputAdornment>
        )}
      >
        {LEAVE_TYPE?.map((column, index) => (
          <MenuItem key={index} value={column}>
            {column}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
export default LeaveType;
