import { Box } from '@mui/material';
import React from 'react';
import AppTable from '../appTable/AppTable';
import {
  contractColumn,
  contractData,
} from '@/src/constants/data/tables/hr/contract';

const Contract = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable column={contractColumn} data={contractData} noPagination />
      </Box>
    </>
  );
};

export default Contract;
