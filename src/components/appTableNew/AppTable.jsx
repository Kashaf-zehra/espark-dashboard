import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableHead from './AppTableHead';
import AppTableBody from './AppTableBody';
import { Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AppTable = ({
  column,
  data = [],
  renderMessage,
  handleClick,
  renderMessageButton,
  handleClickRenderMessageButton,
  handleClickActionView,
  viewClicked,
  handleClickActionDelete,
  noPagination,
  minWidth,
  options,
  tableRowClass,
  hanldeInvLinkClick,
  updateStatus,
  currentTab,
  updateLeaveStatus,
  approveReq,
  rejectReq,
  isLoading,
  handleClickDownload,
  isPendingDownload,
  commonRowStyle,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currPageData, setCurrPageData] = useState([]);

  useEffect(() => {
    if (viewClicked) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(1);
    }
  }, [currentTab, data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab]);

  useEffect(() => {
    const updatePageData = () => {
      if (!noPagination) {
        const newPageData = data.slice(startIndex, endIndex);
        setCurrPageData((prevPageData) => {
          if (JSON.stringify(prevPageData) !== JSON.stringify(newPageData)) {
            return newPageData;
          }
          return prevPageData;
        });
      }
    };
    updatePageData();
  }, [data, currentPage, noPagination]);

  const itemsPerPage = 10;
  let startIndex = !noPagination && (currentPage - 1) * itemsPerPage;
  let endIndex = !noPagination && startIndex + itemsPerPage;

  const handleClickChangePage = (event, page) => {
    setCurrentPage(page);
    startIndex = !noPagination && (page - 1) * itemsPerPage;
    endIndex = !noPagination && startIndex + itemsPerPage;
    setCurrPageData([...data.slice(startIndex, endIndex)]);
  };
  return (
    <>
      <table
        className={['table', !minWidth && 'table-min-width'].join(' ')}
        style={{ minWidth: minWidth && minWidth }}
      >
        <TableHead column={column} commonRowStyle={commonRowStyle} />
        <AppTableBody
          column={column}
          // data={data}
          data={!noPagination ? currPageData : data}
          renderMessage={renderMessage}
          handleClickActionView={handleClickActionView}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
          handleClick={handleClick}
          handleClickActionDelete={handleClickActionDelete}
          options={options}
          tableRowClass={tableRowClass}
          hanldeInvLinkClick={hanldeInvLinkClick}
          updateStatus={updateStatus}
          updateLeaveStatus={updateLeaveStatus}
          rejectReq={rejectReq}
          approveReq={approveReq}
          isLoading={isLoading}
          handleClickDownload={handleClickDownload}
          isPendingDownload={isPendingDownload}
        />
      </table>
      {!noPagination && (
        <Box my={'20px'} display="flex" justifyContent={'center'}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(data?.length / itemsPerPage) || 1}
              // count={10}
              variant="outlined"
              shape="rounded"
              page={currentPage}
              onChange={handleClickChangePage}
            />
          </Stack>
        </Box>
      )}
    </>
  );
};

AppTable.propTypes = {
  prefixIcon: PropTypes.array,
  suffixIcon: PropTypes.array,
};

export default memo(AppTable);
