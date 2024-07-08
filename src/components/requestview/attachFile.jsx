import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';
import styles from '@/src/components/requestview/image.module.css';

const AttachDoc = () => {
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  };
  return (
    <TextField
      sx={{
        width: '600px',
        borderRadius: '5px',
        border: '1px solid #E4E4E4',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Image
              src="/images/leave-request/attach-icon.svg"
              className={styles.image}
              width={30}
              height={30}
              alt="attach"
              onClick={handleImageClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default AttachDoc;
