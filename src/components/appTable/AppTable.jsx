import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Pagination, Stack } from '@mui/material';
import TableHead from './AppTableHead';
import AppTableBody from './AppTableBody';

const AppTable = ({
  column,
  data,
  renderMessage,
  handleClick,
  renderMessageButton,
  handleClickRenderMessageButton,
  handleClickActionView,
  handleClickActionDelete,
  noPagination,
  minWidth,
  options,
  tableRowClass,
}) => {
  return (
    <>
      <table
        className={['table', !minWidth && 'table-min-width'].join(' ')}
        style={{ minWidth: minWidth && minWidth }}
      >
        <TableHead column={column} />
        <AppTableBody
          column={column}
          data={data}
          renderMessage={renderMessage}
          handleClickActionView={handleClickActionView}
          handleClickRenderMessageButton={handleClickRenderMessageButton}
          renderMessageButton={renderMessageButton}
          handleClick={handleClick}
          handleClickActionDelete={handleClickActionDelete}
          options={options}
          tableRowClass={tableRowClass}
        />
      </table>
      {!noPagination && (
        <Box my={'20px'} display="flex" justifyContent={'center'}>
          <Stack spacing={2}>
            <Pagination count={10} variant="outlined" shape="rounded" />
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
