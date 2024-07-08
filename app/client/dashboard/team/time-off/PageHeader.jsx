import { Toast } from '@/src/components/Toast/Toast';
import { TIME_REQUEST } from '@/src/constants/timeSheet';
import { api } from '@/src/services/apiService';
import { DOWNLOAD_REPORT } from '@/src/services/apiService/apiEndPoints';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';

const PageHeader = () => {
  const { tabData } = useSelector((state) => state?.client?.timeOff);
  const resolveURL = () => {
    let url;
    if (tabData?.currentReqTypeTab === 'Leave Requests') {
      url = `${DOWNLOAD_REPORT}?tab=lr`;
    } else if (tabData?.currentReqTypeTab === 'Clockin/out Requests') {
      url = `${DOWNLOAD_REPORT}?tab=cio`;
    } else {
      url = `${DOWNLOAD_REPORT}?tab=lb`;
    }
    return url;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return api.downloadFile(resolveURL());
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // dispatchFunction?.(data);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
      // dispatch(getTimeSheetDataFailed());
      console.log({ err });
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleDownloadReport = () => {
    mutate();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        alignItems: { xs: 'flex-start', md: 'center' },
      }}
    >
      <Box display={'flex'} flexDirection={'column'}>
        <Typography variant="h3">Time off Request</Typography>
        <Box display={'flex'} flexDirection={'column'} marginY={'20px'}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '17px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#595959',
              marginBottom: '10px',
            }}
            variant="caption"
          >
            {TIME_REQUEST?.manage}
          </Typography>
          {/* <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '17px',
              letterSpacing: '0em',
              textAlign: 'left',
              color: '#595959',
            }}
            variant="caption"
          >
            {TIME_REQUEST?.link}{' '}
            <Link
              style={{
                textDecoration: 'underline',
              }}
              href="/"
            >
              <span
                style={{
                  color: 'black',
                  fontWeight: 400,
                  fontSize: '14px',
                }}
              >
                {' '}
                {TIME_REQUEST?.holiday}
              </span>
            </Link>
          </Typography> */}
        </Box>
      </Box>
      <Button
        sx={{
          marginX: '10px',
          minWidth: '220px',
          color: '#029894',
          border: '1px solid #029894',
          background: isPending && '#ccc',
          fontSize: '16px',
          fontWeight: '600',
          mb: '100px',
          '&:hover': {
            background: isPending ? '#ccc' : '#E6F5F4',
          },
        }}
        onClick={handleDownloadReport}
        disabled={isPending}
      >
        {isPending ? (
          <CircularProgress size={26} color="secondary" />
        ) : (
          TIME_REQUEST?.downloadReport
        )}
      </Button>
    </Box>
  );
};

export default PageHeader;
