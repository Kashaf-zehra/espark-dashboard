import React from 'react';

import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLogo = () => {
  const pathName = usePathname();

  return (
    <>
      <Box sx={{ px: 4, py: 2, display: 'flex', justifyContent: 'center' }}>
        <Link
          href={
            pathName.includes('/client/dashboard')
              ? '/client/dashboard'
              : null || pathName.includes('/employee/dashboard')
                ? '/employee/dashboard'
                : null || pathName.includes('/hr/dashboard')
                  ? '/hr/dashboard'
                  : null
          }
        >
          <Image
            src={'/images/sidebar-icons/logo.svg'}
            width={100}
            height={47}
            alt="image"
          />
        </Link>
      </Box>
    </>
  );
};

export default SidebarLogo;
