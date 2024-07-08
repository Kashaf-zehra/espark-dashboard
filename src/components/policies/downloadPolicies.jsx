import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Image from 'next/image';
import { DOWNLOAD_POLICY } from '@/src/services/apiService/apiEndPoints';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';

const DownloadPolicies = ({ image, reportHeading, downloadBtn, data }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(`${DOWNLOAD_POLICY}?id=${id}`);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'policy.pdf');
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
  const handleDownloadPolicy = () => {
    console.log({ data });
    mutate(data?.[0]?.id);
  };
  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', lg: '400px' },
        width: '100%',
        minHeight: '300px',
        display: 'flex',
        border: '1px solid #E4E4E4',
        borderRadius: '10px',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-start' },
        textAlign: { xs: 'center', sm: 'start' },
        padding: '40px 28px',
        gap: '23px',
        '@media (min-width: 800px) and (max-width: 1200px)': {
          maxWidth: data?.length === 1 ? '45%' : '100%',
          display: 'flex',
          mx: 'auto',
        },
        '@media (min-width: 600px) and (max-width: 800px)': {
          maxWidth: data?.length === 1 ? '55%' : '100%',
          display: 'flex',
          mx: 'auto',
        },
      }}
    >
      <Image src={image} width={50} height={50} alt={reportHeading} />
      <Typography
        sx={{
          color: '#171717',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        {reportHeading}
      </Typography>
      <Typography
        sx={{
          color: '#595959',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {/* {downloadReports} */}
      </Typography>
      {/* <Button
        variant="primary"
        sx={{
          width: { xs: '120px', md: '120px' },
          height: '40px',
          padding: '8px',
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        {downloadBtn}
      </Button> */}
      <Box
        component={'button'}
        sx={{
          width: { xs: '120px', md: '120px' },
          height: '40px',
          padding: '8px',
          fontSize: '16px',
          fontWeight: 600,
          backgroundColor: isPending ? '#ccc' : '#029E9C',
          textAlign: 'center',
          color: '#fff',
          borderRadius: '5px',
        }}
        disabled={isPending}
        // href={documentLink}
        // target="_blank"
        onClick={handleDownloadPolicy}
      >
        {isPending ? (
          <CircularProgress size={26} color="secondary" />
        ) : (
          downloadBtn
        )}
      </Box>
    </Box>
  );
};
export default DownloadPolicies;
