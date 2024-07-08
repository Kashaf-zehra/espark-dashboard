import React, { Fragment, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import TableHiddenBody from './appTableHiddenBody';
import { renderCellContent } from './AppTableCell';
import Skeleton from '@mui/material/Skeleton';

const AppTableBody = ({
  data,
  column,
  renderMessage,
  handleClickActionView,
  handleClickRenderMessageButton,
  renderMessageButton,
  handleClick,
  handleClickActionDelete,
  options,
  tableRowClass,
}) => {
  const commonCellStyle = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);
  return (
    <tbody>
      {renderMessage ? (
        <TableHiddenBody
          renderMessage={renderMessage}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
        />
      ) : data?.length ? (
        <>
          {isLoading ? (
            <tr>
              <td className="app-table-row" colSpan={column?.length}>
                <Skeleton
                  animation="wave"
                  width={'100%'}
                  height={40}
                  sx={{ background: '#F6F6F6' }}
                />
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr
                className={tableRowClass ? tableRowClass : 'app-table-row'}
                key={rowIndex}
              >
                {column?.map((col, colIndex) => (
                  <Fragment key={colIndex}>
                    {renderCellContent(
                      row,
                      col,
                      handleClickActionView,
                      commonCellStyle,
                      handleClick,
                      handleClickRenderMessageButton,
                      colIndex,
                      rowIndex,
                      handleClickActionDelete,
                      options
                    )}
                  </Fragment>
                ))}
              </tr>
            ))
          )}
        </>
      ) : (
        <tr>
          <td className="app-table-row" colSpan={column?.length}>
            <Typography variant="caption" sx={{ width: '100%' }}>
              No Records Found
            </Typography>
          </td>
        </tr>
      )}
      {/* {renderMessage ? (
        <TableHiddenBody
          renderMessage={renderMessage}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
        />
      ) : data?.length ? (
        data?.map((row, rowIndex) => (
          <tr
            className={tableRowClass ? tableRowClass : 'app-table-row'}
            key={rowIndex}
          >
            {column?.map((col, colIndex) => (
              <Fragment key={colIndex}>
                {renderCellContent(
                  row,
                  col,
                  handleClickActionView,
                  commonCellStyle,
                  handleClick,
                  handleClickRenderMessageButton,
                  colIndex,
                  rowIndex,
                  handleClickActionDelete,
                  options
                )}
              </Fragment>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td className="app-table-row" colSpan={column?.length}>
            <Typography variant="caption" sx={{ width: '100%' }}>
              No Records Found
            </Typography>
          </td>
        </tr>
      )} */}
    </tbody>
  );
};

export default AppTableBody;
