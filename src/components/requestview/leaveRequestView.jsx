import React from 'react';
import { Box } from '@mui/material';
import LeaveType from './leaveType';
import LeaveDate from './leaveDate';
import { LEAVE_DATA, REQUESTVIEW_DATA } from '@/src/constants/requestviewModal';
import LeaveDuration from './leaveDuration';
import LeaveCount from './leaveCount';
import LeaveDatePicker from './leaveDatepicker';
import LeaveReason from './leaveReason';
import LeaveRequestButtons from './leaveRequestButton';
import AttachDoc from './attachFile';

const LeaveRequest = ({
  modalType,
  rowType,
  onClose,
  employeeId,
  fromTo,
  modalData,
  isViewingClient,
  isViewingEmployee,
  createLeaveRequest,
}) => {
  const { status, leaveType, employeeName } = modalData || {};
  console.log({ modalData, isViewingClient });
  return (
    <Box sx={{ p: 3.5 }}>
      <LeaveType isViewingClient={isViewingClient} leaveType={leaveType} />
      <LeaveDate
        date={REQUESTVIEW_DATA?.startDate}
        isViewingClient={isViewingClient}
      />
      <LeaveDate
        date={REQUESTVIEW_DATA?.endDate}
        backgroundColor="#F6F6F6"
        isViewingClient={isViewingClient}
      />

      {(isViewingClient || isViewingEmployee) && (
        <LeaveDuration
          employeeId={employeeId}
          employeeName={employeeName}
          fromTo={fromTo}
        />
      )}

      <LeaveCount
        countLabel={REQUESTVIEW_DATA?.count}
        totalNo={LEAVE_DATA?.countNo}
        backgroundColor={isViewingClient ? '#F6F6F6' : '#fff'}
      />
      {isViewingClient && (
        <LeaveCount
          countLabel={REQUESTVIEW_DATA?.sandwichCount}
          component={
            <LeaveDatePicker label={'0'} isViewingClient={isViewingClient} />
          }
        />
      )}
      <LeaveCount
        countLabel={
          isViewingClient
            ? REQUESTVIEW_DATA?.total
            : REQUESTVIEW_DATA?.totalCount
        }
        totalNo={LEAVE_DATA?.totalNo}
        backgroundColor="#F6F6F6"
      />
      {!isViewingClient && (
        <LeaveCount
          countLabel={REQUESTVIEW_DATA?.attachment}
          component={<AttachDoc />}
        />
      )}
      <LeaveCount
        countLabel={
          isViewingClient ? (
            REQUESTVIEW_DATA?.reason
          ) : (
            <>
              {REQUESTVIEW_DATA?.reason}
              <span
                style={{
                  color: 'red',
                  fontSize: '25px',
                  marginLeft: '55px',
                  marginTop: '-25px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                *
              </span>
            </>
          )
        }
        component={<LeaveReason />}
      />
      <LeaveRequestButtons
        modalType={modalType}
        statusType={status}
        isViewingClient={isViewingClient}
        isViewingEmployee={isViewingEmployee}
        rowType={rowType}
        onClose={onClose}
        createLeaveRequest={createLeaveRequest}
      />
    </Box>
  );
};
export default LeaveRequest;
