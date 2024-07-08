'use client';
import * as React from 'react';

import AuthForm from './AuthForm';
import {
  Auth_Images,
  Auth_Fields,
  Auth_Signin,
  Trouble_Modal,
} from '@/src/constants/authConstant';
import { Box, Grid } from '@mui/material';
import HavingTroubleModal from '../modals/HavingTroubleModal';

export default function Authentication() {
  const [troubleModal, setTroubleModal] = React.useState(false);

  const handleOpenTroubleModal = () => setTroubleModal(true);
  const handleCloseTroubleModal = () => setTroubleModal(false);
  return (
    <>
      <Grid container>
        <Grid
          item
          md={4.5}
          sx={{
            display: { xs: 'none', lg: 'block' },
            borderRadius: '1rem 0 0 1rem',
            overflow: 'hidden',
            alignItems: 'center',
            backgroundColor: '#e6f5f4',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src={Auth_Images?.rocket}
              alt="rocket img"
              style={{
                width: '40%',
                height: 'auto',
                position: 'absolute',
                top: -25,
                left: -50,
                zIndex: 1,
              }}
            />
            <img
              src={Auth_Images?.half_round}
              alt="shape"
              style={{
                width: '26%',
                height: 'auto',
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 3,
              }}
            />
            <img
              src={Auth_Images?.emp_img}
              alt="employee img"
              style={{
                width: '78%',
                height: 'auto',
                objectFit: 'cover',
                position: 'absolute',
                right: 45,
                zIndex: 5,
                marginTop: '40px',
              }}
            />
            <img
              src={Auth_Images?.round_shape}
              alt="shape"
              style={{
                width: '82%',
                height: 'auto',
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 4,
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            mx: 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AuthForm
            uiData={Auth_Signin}
            fields={Auth_Fields}
            handleOpenTroubleModal={handleOpenTroubleModal}
          />
          <HavingTroubleModal
            data={Trouble_Modal}
            open={troubleModal}
            onClose={handleCloseTroubleModal}
          />
        </Grid>
      </Grid>
    </>
  );
}
