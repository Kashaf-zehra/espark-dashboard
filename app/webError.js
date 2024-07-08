'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

class WebError extends React.Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
  }
  refreshPage() {
    window.location.reload();
  }

  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '600px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#E6F5F4',
            border: '1px solid #029E9C',
            outline: 'none',
            width: '500px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '25px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <ReportGmailerrorredIcon
              sx={{ color: '#029E9C', fontSize: '40px' }}
            />
            <Typography
              sx={{
                fontSize: '25px',
                fontWeight: 500,
                color: ' #029E9C',
              }}
            >
              {this.props.statusCode
                ? `An error ${this.props.statusCode} occurred on server`
                : 'Something went wrong'}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 0 0.1rem  #029E9C',
              width: '150px',
              gap: '5px',
            }}
          >
            <RefreshOutlinedIcon sx={{ color: '#029E9C', fontSize: '40px' }} />
            <Button
              sx={{
                fontSize: '17px',
                fontWeight: 600,
                color: ' #029E9C',
              }}
              onClick={this.refreshPage}
            >
              Try Again
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default WebError;
