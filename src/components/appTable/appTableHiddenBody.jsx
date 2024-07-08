import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const TableHiddenBody = ({
  renderMessage,
  renderMessageButton,
  handleClickRenderMessageButton,
}) => {
  return (
    <>
      {[...Array(5)]?.map((_, index) => (
        <tr
          key={index}
          style={{
            background: index === 2 && '#fff',
            display: 'flex',
            justifyContent: 'center',
          }}
          className="app-table-row"
        >
          {index === 2 ? (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '29px',
                  letterSpacing: '0em',
                  textAlign: 'left',
                }}
                variant="body1"
                textAlign={'center'}
              >
                {renderMessage}
              </Typography>
              {renderMessageButton && (
                <Button
                  onClick={handleClickRenderMessageButton}
                  sx={{ marginTop: '20px' }}
                  variant="contained"
                >
                  {renderMessageButton}
                </Button>
              )}
            </Box>
          ) : (
            <td />
          )}
        </tr>
      ))}
    </>
  );
};

export default TableHiddenBody;
