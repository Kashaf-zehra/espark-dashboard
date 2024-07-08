import { Box } from '@mui/material';
import React, { Fragment } from 'react';

const TableHead = ({ column }) => {
  return (
    <thead>
      <tr className="app-table-row">
        {column?.map((col, colIndex) => (
          <Fragment key={colIndex}>
            {col?.isIconTitle ? (
              <th
                style={{
                  fontSize: '14px',
                  flex: col?.flex ? col?.flex : 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box component="img" src={col.src} alt="Profile Pic" />
              </th>
            ) : (
              <th
                key={colIndex}
                style={{
                  fontSize: '14px',
                  flex: col?.flex ? col?.flex : 1,
                  textAlign: col?.textAlign || 'center',
                }}
              >
                {col?.title || col}
              </th>
            )}
          </Fragment>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
