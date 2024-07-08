import { toCamelCase } from '@/src/utils/stringModification';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const AppTableInfoOptionsCell = ({
  row,
  col,
  handleClick,
  handleClickRenderMessageButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <Box
      sx={{
        width: '90px',
        position: 'relative',
      }}
      ref={componentRef}
    >
      <Box
        onClick={() => setIsOpen((ps) => !ps)}
        sx={{
          border: 'solid 1px #ccc',
          borderRadius: '5px',
          backgroundColor: '#fff',
        }}
        justifyContent={'center'}
        p="7px 10px"
        display={'flex'}
        alignItems="center"
      >
        <Box>
          <Image
            src={'/icons/OptionDots.svg'}
            width={20}
            height={20}
            alt="Options"
          />
        </Box>
        <Box>{row[toCamelCase(col || col?.title)]}</Box>
      </Box>
      {isOpen && (
        <Box
          sx={{
            border: 'solid 1px #ccc',
            borderRadius: '5px',
            marginTop: '10px',
            position: 'absolute',
            backgroundColor: '#fff',
            width: '120px',
          }}
        >
          <Box
            onClick={handleClick}
            sx={{
              borderBottom: 'solid 1px #ccc',
              padding: '7px 10px',
              cursor: 'pointer',
            }}
          >
            View details
          </Box>
          <Box
            onClick={handleClickRenderMessageButton}
            sx={{
              padding: '7px 10px',
              cursor: 'pointer',
            }}
          >
            Add member
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AppTableInfoOptionsCell;
