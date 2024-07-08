import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
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
  hanldeInvLinkClick,
  updateStatus,
  updateLeaveStatus,
  rejectReq,
  approveReq,
  isLoading = false,
  handleClickDownload,
}) => {
  const commonCellStyle = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
  };

  const sortedData = data?.slice()?.sort((a, b) => b?.id - a?.id);

  return (
    <tbody>
      {renderMessage ? (
        <TableHiddenBody
          renderMessage={renderMessage}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
        />
      ) : sortedData?.length ? (
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
            sortedData?.map((row, rowIndex) => (
              <tr
                className={tableRowClass ? tableRowClass : 'app-table-row-empl'}
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
                      options,
                      hanldeInvLinkClick,
                      updateStatus,
                      updateLeaveStatus,
                      approveReq,
                      rejectReq,
                      handleClickDownload
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
    </tbody>
  );
};

export default AppTableBody;
