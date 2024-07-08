import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import AppCustomDropdown from '../dashboard/appCustomDropdown';
import { toCamelCase } from '@/src/utils/stringModification';
import { trackingStatusTypes } from '@/src/constants/data/tables/timeTracking';
import AppTableInfoOptionsCell from './AppTableInfoOptionsCell';
import { modulepermissionColumn } from '@/src/constants/data/tables/modulePermission';

const renderAssigneeCell = (row, col, commonCellStyle) => {
  const [avatar, name, subtitle] = row.assignee;
  return (
    <td key={col.index} style={{ ...commonCellStyle, flex: col?.flex || 1 }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Box component="img" alt="Avatar" src={avatar} />
        </Box>
        <Box ml={'5px'}>
          <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: '10px', fontWeight: '300', textAlign: 'left' }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </td>
  );
};
const renderUserAvatar = (row, col, commonCellStyle) => {
  return (
    <td
      key={col.index}
      style={{
        ...commonCellStyle,
        flex: col?.flex || 1,
      }}
    >
      <Box component="img" src={row?.pic} />
    </td>
  );
};
const renderActions = (
  row,
  col,
  handleClickActionView,
  commonCellStyle,
  colIndex,
  rowIndex,
  handleClickActionDelete
) => {
  if (row?.formActionStatus) {
    if (row?.isModulePermissionData) {
      return (
        <td
          key={colIndex}
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '12px',
            flex: col?.flex || 1,
          }}
        >
          <Image
            onClick={() => {
              handleClickActionView(row?.id, col || col?.title);
            }}
            style={{
              margin: rowIndex === 1 && '0 5px',
              cursor: 'pointer',
            }}
            width={30}
            height={30}
            alt="Icon"
            src={`/icons/${
              row[toCamelCase(col || col?.title)][2] === true
                ? 'EnabledCheck'
                : 'DisabledCheck'
            }.svg`}
          />
        </td>
      );
    }
    return (
      <td
        key={colIndex}
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '12px',
          flex: col?.flex || 1,
        }}
      >
        <Image
          onClick={() => {
            handleClickActionView(row?.id);
          }}
          style={{
            margin: rowIndex === 1 && '0 5px',
            cursor: 'pointer',
          }}
          width={25}
          height={25}
          alt="Icon"
          src={`/icons/${
            row?.isSelected ? row?.action[1] : row?.action[0]
          }.svg`}
        />
      </td>
    );
    // }
  }
  return (
    <td key={col.index} style={{ ...commonCellStyle, flex: col?.flex || 1 }}>
      <>
        {row[toCamelCase(col || col?.title)]?.map((item, rowIndex) => (
          <Image
            onClick={() => {
              if (item === 'View') {
                handleClickActionView({ row, item });
              } else if (item === 'Delete') {
                handleClickActionDelete();
              }
              return;
            }}
            key={rowIndex}
            style={{
              margin: rowIndex === 1 && '0 5px',
              cursor: 'pointer',
            }}
            width={25}
            height={25}
            alt="Icon"
            src={`/icons/${item}.svg`}
          />
        ))}
      </>
    </td>
  );
};
const renderCheckActions = (
  row,
  col,
  handleClickActionView,
  colIndex,
  rowIndex,
  commonCellStyle
) => {
  if (row?.isPolicyData) {
    if (row?.isModulePermissionData) {
      return (
        <td
          key={colIndex}
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '12px',
            flex: col?.flex || 1,
          }}
        >
          <Image
            onClick={() => {
              handleClickActionView(row?.id, col || col?.title);
            }}
            style={{
              margin: rowIndex === 1 && '0 5px',
              cursor: 'pointer',
            }}
            width={30}
            height={30}
            alt="Icon"
            src={`/icons/${
              row[toCamelCase(col || col?.title)][2] === true
                ? 'EnabledCheck'
                : 'DisabledCheck'
            }.svg`}
          />
        </td>
      );
    }
    return (
      <td
        key={colIndex}
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '12px',
          flex: col?.flex || 1,
        }}
      >
        <Image
          onClick={() => {
            handleClickActionView(row?.id);
          }}
          style={{
            margin: rowIndex === 1 && '0 5px',
            cursor: 'pointer',
          }}
          width={25}
          height={25}
          alt="Icon"
          src={`/icons/${
            row?.isSelected ? row?.action[1] : row?.action[0]
          }.svg`}
        />
      </td>
    );
  } else {
    return (
      <td
        key={col.index}
        style={{
          ...commonCellStyle,
          flex: col?.flex || 1,
          justifyContent: col?.textAlign || 'center',
        }}
      >
        {col.title?.toLowerCase() === 'employee invoices' ||
        col.title?.toLowerCase() === 'other invoices' ? (
          row[toCamelCase(col?.title || col)] === null ? (
            '-'
          ) : (
            <Link
              href="/hr/dashboard/clients/client-profile"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              {row[toCamelCase(col?.title || col)]}
            </Link>
          )
        ) : row[toCamelCase(col?.title || col)] === null ? (
          '-'
        ) : (
          row[toCamelCase(col?.title || col)]
        )}
      </td>
    );
  }
};
const renderAttendenceStatus = (statusType, index) => {
  const status = trackingStatusTypes?.find(
    ({ shortForm }) => shortForm === statusType
  );
  return (
    <Box
      key={index}
      sx={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: status.background,
        color: '#fff',
      }}
      mr={'10px'}
      display={'flex'}
      fontSize={'12px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {statusType}
    </Box>
  );
};

const renderStatusCell = (row, col, commonCellStyle, options) => {
  const getStatusStyle = (backgroundColor, borderColor, color) => ({
    borderRadius: '30px',
    padding: '4px 0',
    display: 'block',
    width: '110px',
    background: backgroundColor,
    border: `solid 1px ${borderColor}`,
    color: color,
  });

  const statusMap = {
    Pending: getStatusStyle('#F6E9D0', '#CB8822', '#CB8822'),
    Completed: getStatusStyle('#E6F5F4', '#068987', '#068987'),
    Default: getStatusStyle('#FFD6D6', '#A72A45', '#A72A45'),
    Enabled: getStatusStyle('#E6F5F4', '#068987', '#068987'),
  };

  const statusStyle = statusMap[row.status] || statusMap.Default;

  if (row?.attendenceShortHand) {
    return (
      <td key={col.index} style={{ ...commonCellStyle, flex: col?.flex || 1 }}>
        {row[toCamelCase(col || col?.title)]?.map((item, index) =>
          renderAttendenceStatus(item, index)
        )}
      </td>
    );
  } else if (row?.dropdownStatus) {
    return renderDropdownCell(row, col, commonCellStyle, options);
  }

  return (
    <td key={col.index} style={{ ...commonCellStyle, flex: col?.flex || 1 }}>
      <span style={statusStyle}>{row[toCamelCase(col?.title || col)]}</span>
    </td>
  );
};

const renderDropdownCell = (row, col, commonCellStyle, options) => {
  const dropdownOpts = options || [
    { label: 'Pending' },
    { label: 'Processing' },
    { label: 'Paid' },
  ];

  return (
    <td key={col.index} style={{ ...commonCellStyle, flex: col?.flex || 1 }}>
      <AppCustomDropdown
        col={col.title}
        colIndex={col.index}
        row={row}
        options={dropdownOpts}
      />
    </td>
  );
};
const renderDownloadButton = (row, col, commonCellStyle) => {
  return (
    <td key={col.index} style={{ ...commonCellStyle, flex: col?.flex || 1 }}>
      <span
        style={{
          borderRadius: '30px',
          padding: '5px 0',
          display: 'block',
          width: '120px',
          background: '#E6F5F4',
          border: 'solid 1px #068987',
          color: '#068987',
        }}
      >
        {row[toCamelCase(col || col?.title)]}
      </span>
    </td>
  );
};
const renderInfoOptions = (
  row,
  col,
  commonCellStyle,
  handleClick,
  handleClickRenderMessageButton
) => {
  return (
    <td
      key={col.index}
      style={{
        ...commonCellStyle,
        flex: col?.flex || 1,
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <AppTableInfoOptionsCell
        row={row}
        col={col || col?.title}
        handleClick={handleClick}
        handleClickRenderMessageButton={handleClickRenderMessageButton}
      />
    </td>
  );
};

export const renderCellContent = (
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
) => {
  switch (col.title || col) {
    case 'Picture':
      return renderUserAvatar(row, col, commonCellStyle);
    case 'Assignee':
      return renderAssigneeCell(row, col, commonCellStyle);
    case 'Write':
    case 'Read':
    case 'Create':
    case 'Delete':
    case 'Download':
      if (modulepermissionColumn?.includes(col)) {
        return renderActions(
          row,
          col,
          handleClickActionView,
          commonCellStyle,
          colIndex,
          rowIndex,
          handleClickActionDelete
        );
      } else {
        return renderDownloadButton(row, col, commonCellStyle);
      }
    case 'Client':
    case 'Employee':
      return renderCheckActions(
        row,
        col,
        handleClickActionView,
        commonCellStyle,
        colIndex,
        rowIndex,
        handleClickActionDelete,
        commonCellStyle
      );

    case 'Action':
      return renderActions(
        row,
        col,
        handleClickActionView,
        commonCellStyle,
        colIndex,
        rowIndex,
        handleClickActionDelete
      );

    case 'Actions':
      return renderActions(
        row,
        col,
        handleClickActionView,
        commonCellStyle,
        colIndex,
        rowIndex,
        handleClickActionDelete
      );
    case 'Status':
      return renderStatusCell(row, col, commonCellStyle, options);
    case 'Payment status':
      return renderDropdownCell(row, col, commonCellStyle);
    case 'Team members':
      return renderInfoOptions(
        row,
        col,
        commonCellStyle,
        handleClick,
        handleClickRenderMessageButton
      );
    default:
      return (
        <td
          key={col.index}
          style={{
            ...commonCellStyle,
            flex: col?.flex || 1,
            justifyContent: col?.textAlign || 'center',
          }}
        >
          {col.title?.toLowerCase() === 'employee invoices' ||
          col.title?.toLowerCase() === 'other invoices' ? (
            row[toCamelCase(col?.title || col)] === null ? (
              '-'
            ) : (
              <Link
                href="/hr/dashboard/clients/client-profile"
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                {row[toCamelCase(col?.title || col)]}
              </Link>
            )
          ) : row[toCamelCase(col?.title || col)] === null ? (
            '-'
          ) : (
            row[toCamelCase(col?.title || col)]
          )}
        </td>
      );
  }
};
