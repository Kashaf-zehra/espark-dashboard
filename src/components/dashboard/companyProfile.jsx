import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { COMPANY_ONBOARDING } from '@/src/constants/dashboard';

const CompanyProfile = () => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          borderRadius: '5px',
          background: '#E6F4F4',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            color: '#595959',

            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          {COMPANY_ONBOARDING.completeProfile}
        </Typography>
        <Image
          src="/images/dashboard/tick.svg"
          width={24}
          height={24}
          alt="tick"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '5px',
          border: '1px solid #029894',
          padding: '3px',
          width: '100%',
        }}
      >
        <Button
          sx={{
            color: '#595959',

            fontSize: '14px',
            fontWeight: 400,
            textTransform: 'math-auto',
          }}
          onClick={() =>
            router.push('/client/dashboard/hire-onboard/start-hiring')
          }
        >
          {COMPANY_ONBOARDING.startHiring}
        </Button>
        <Button
          sx={{
            color: '#595959',

            fontSize: '14px',
            fontWeight: 300,
            textTransform: 'capitalize',
            textDecoration: 'underline',
          }}
          onClick={() =>
            router.push('/client/dashboard/hire-onboard/start-hiring')
          }
        >
          {COMPANY_ONBOARDING.newHire}
        </Button>
      </Box>
    </>
  );
};
export default CompanyProfile;
