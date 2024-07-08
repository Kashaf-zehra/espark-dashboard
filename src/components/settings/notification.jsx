import React, { useState } from 'react';
import { Box, FormControlLabel, Grid, Switch } from '@mui/material';

import { NotificationData } from '@/src/constants/data/tables/notifications';

const Notification = () => {
  const [switchStates, setSwitchStates] = useState(
    NotificationData?.map(() => false)
  );
  const handleToggle = (index) => {
    setSwitchStates((prevSwitchStates) => {
      const updatedSwitchStates = [...prevSwitchStates];
      updatedSwitchStates[index] = !updatedSwitchStates[index];
      return updatedSwitchStates;
    });
  };
  return (
    <Grid container>
      {NotificationData?.map((item, index) => (
        <Grid container spacing={2} alignItems="center" key={index}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: '#ffff',
                padding: '5px',
                height: '35px',
                width: '20px',
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                background: '#f8f8f8',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '5px',
              }}
            >
              <Box>{Object.values(item)}</Box>
              <Box>
                <FormControlLabel
                  label=""
                  control={
                    <Switch
                      checked={switchStates[index]}
                      onChange={() => handleToggle(index)}
                      size="normal"
                      sx={{
                        '& .MuiSwitch-switchBase': {
                          color: '#f8f8f8',
                          '&.Mui-checked': {
                            color: '#fff',
                          },
                          '&.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#198f51 !important',
                          },
                          //   '& .MuiSwitch-thumb': {
                          //     width: 25,
                          //     height: 25,
                          //       },
                        },
                      }}
                    />
                  }
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
export default Notification;
