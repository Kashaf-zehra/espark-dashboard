import { PUNCH_IN, PUNCH_TYPE } from '@/src/constants/punchIn/createPunch';
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AttendanceDatePicker from '../AtttendanceSummary/attendanceDatePicker';
import Image from 'next/image';
import ReasonDescription from './reasonDescription';
import PunchRequestButton from './punchInButton';

const PunchRequestView = ({ onClose, modalData, createPunch }) => {
  return (
    <>
      <Box
        sx={{
          p: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: '10px', md: '30px' },
            background: '#F6F6F6',
            p: 1,
          }}
        >
          <Typography sx={{ width: '140px' }}>{PUNCH_IN?.date}</Typography>
          <AttendanceDatePicker createPunch={createPunch} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            gap: { xs: '10px', md: '30px' },
          }}
        >
          <Typography sx={{ width: '150px' }}>{PUNCH_IN?.punchTime}</Typography>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <TextField
              sx={{ width: '82%' }}
              disabled={!createPunch && true}
              value={modalData?.punchTime}
            />
            {/* {punchTime}
            </TextField> */}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1,
            background: '#F6F6F6',
          }}
        >
          <Typography sx={{ width: '160px' }}>
            <Typography>{PUNCH_IN?.punchType}</Typography>
          </Typography>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <Select
              required={true}
              disabled={!createPunch && true}
              value={modalData?.punchType}
              sx={{
                height: '50px',
                width: { xs: '80%', md: '80%' },
              }}
              IconComponent={() => (
                <InputAdornment
                  sx={{
                    marginRight: '10px',
                  }}
                >
                  <Image
                    src="/images/hiring/rightarrow.png"
                    width={20}
                    height={20}
                    alt="ArrowRight"
                  />
                </InputAdornment>
              )}
            >
              {PUNCH_TYPE?.map((column, index) => (
                <MenuItem key={index} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <ReasonDescription disabled={!createPunch && true} />
        <PunchRequestButton
          onClose={onClose}
          closeBtn={PUNCH_IN?.close}
          createPunch={createPunch}
        />
      </Box>
    </>
  );
};
export default PunchRequestView;
