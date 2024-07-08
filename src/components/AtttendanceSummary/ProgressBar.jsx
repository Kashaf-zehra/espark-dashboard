import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  width: '100%',
  transform: 'rotate(180deg)',
  '& > .MuiLinearProgress-bar': {
    transform: 'rotate(180deg)',
  },
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F16E61',
    // theme.palette.grey[theme.palette.mode === 'light' ? '#E6F4F4' : 40],
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#068987' : '#308fe8',
  },
}));

export default function ProgressBar({ item }) {
  const { leave_summary } = useSelector((state) => state?.emp?.home?.homeData);

  const getValue = () => {
    const valObj = leave_summary?.[item?.name];
    const value = (valObj?.balance / valObj?.total) * 100;
    return value;
  };
  // console.log({ item, leave: leave_summary, value: getValue() });
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: 'auto',
      }}
    >
      <BorderLinearProgress variant="determinate" value={getValue()} />
    </Box>
  );
}
