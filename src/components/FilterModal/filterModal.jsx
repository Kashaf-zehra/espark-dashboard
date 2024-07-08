import React, { useMemo, useState } from 'react';
import { Backdrop, Box, Modal, Typography } from '@mui/material';

import { ATTENDANCE_STATUS, FILTER, STATUS } from '@/src/constants/filter';
import { LEAVE_TYPE } from '@/src/constants/requestviewModal';
import CheckinTime from './checkinTime';
import ResetButton from './resetButton';
import LeaveType from './leaveType';
import StatusType from './statusType';
import AttendanceType from './attendanceType';
import DatePicker from './datePicker';

const FilterModal = ({
  open,
  onClose,
  attendanceStatus,
  leaveType,
  clockinOut,
}) => {
  const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const [searchText, setSearchText] = useState('');
  const filterOptions = (options) =>
    options?.filter((option) => containsText(option, searchText));
  const displayedOptions = useMemo(
    () => filterOptions(LEAVE_TYPE),
    [searchText]
  );
  const displayedStatusOptions = useMemo(
    () => filterOptions(STATUS),
    [searchText]
  );
  const displayedAttendanceOptions = useMemo(
    () => filterOptions(ATTENDANCE_STATUS),
    [searchText]
  );
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <Modal
      data-aos="fade-left"
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ click: false }}
      sx={{
        width: '100%',
      }}
      BackdropComponent={(props) => (
        <Backdrop {...props} sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} />
      )}
    >
      <Box onClick={handleModalClick}>
        <Box
          sx={{
            bgcolor: '#fff',
            width: { xs: '90%', md: '20%' },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
            height: { xs: '600px', md: '1500px' },
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '0px',
            position: 'absolute',
            top: '2%',
            right: '0px',
            '@media (min-width: 900px) and (max-width: 1500px)': {
              width: '30%',
            },
            '@media (min-width: 600px) and (max-width: 900px)': {
              width: '45%',
            },
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid #E4E4E4',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '0px',
              p: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              background: '#029E9C',
            }}
          >
            <Box
              sx={{
                width: { xs: '35px', md: '50px' },
                height: { xs: '35px', md: '50px' },
                cursor: 'pointer',
              }}
              src="/images/filter/back.svg"
              component={'img'}
              onClick={onClose}
            />
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                marginLeft: '10px',
                color: '#fff',
              }}
            >
              {FILTER?.title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              overflowY: { xs: 'auto', md: 'hidden' },
              scrollbarWidth: 'thin',
              scrollbarColor: 'green',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Box
              sx={{
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: '20px', md: '20px' },
                width: '100%',
              }}
            >
              {leaveType && (
                <>
                  <LeaveType
                    displayedOptions={displayedOptions}
                    setSearchText={setSearchText}
                  />
                  <StatusType
                    displayedStatusOptions={displayedStatusOptions}
                    setSearchText={setSearchText}
                  />
                </>
              )}
              {clockinOut && (
                <StatusType
                  displayedStatusOptions={displayedStatusOptions}
                  setSearchText={setSearchText}
                />
              )}
              {attendanceStatus && (
                <AttendanceType
                  displayedAttendanceOptions={displayedAttendanceOptions}
                  setSearchText={setSearchText}
                />
              )}
              <DatePicker title={FILTER?.from} />
              <DatePicker title={FILTER?.to} />
              <CheckinTime checkIn={FILTER?.checkIn} />
              <CheckinTime checkIn={FILTER?.checkOut} />
              <ResetButton />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default FilterModal;
