import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const ResourceCard = ({ data }) => {
  return (
    <Grid container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: { xs: '30px', sm: '45px', md: '80px' },
          width: { xs: '100%', md: '100%' },
          alignItems: 'center',
          '@media (min-width: 900px) and (max-width: 1490px)': {
            gap: '55px',
          },
        }}
      >
        {data?.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Link href={`${item?.link || '#'}`} target="_blank">
              <Box
                sx={{
                  height: '100%',
                  minHeight: { xs: '375px', md: '350px' },
                  borderRadius: '20px',
                  background: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: { xs: '25px', sm: '70px', md: '18px' },
                  border: '1px solid #E4E4E4',
                  '@media (min-width: 900px) and (max-width: 924px)': {
                    height: '320px',
                  },
                  '@media (min-width: 1150px) and (max-width: 1220px)': {
                    height: '320px',
                  },
                  '&:hover': {
                    boxShadow: '0px 0px 2px 2px #E4E4E4',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '30px',
                    padding: { lg: '30px' },
                  }}
                >
                  <Box>
                    <Image
                      src={item?.image}
                      width={70}
                      height={70}
                      alt="search"
                    />
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: 'center', color: '#171717' }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#595959',
                      width: { xs: '100%', md: '80%' },
                    }}
                  >
                    {item?.description}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
};
export default ResourceCard;
