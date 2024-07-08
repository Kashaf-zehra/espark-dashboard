'use client';
import React, { useState } from 'react';

import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ActionBarComponent from './actionbarComponent';
import PreviousDateModal from './PreviousDateModal';
import dayjs from 'dayjs';
import Image from 'next/image';

const LeaveDatePicker = ({ label }) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentView, setCurretView] = useState('day');
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(handleOpenModal);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date.isBefore(dayjs(), 'day')) {
      console.log(open);
      console.log('Selected date is before the current date');
      setOpenModal(true);
    } else {
      setOpen(false);
    }
  };
  const handleCurrentView = (view) => {
    setCurretView(view);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className="custom-date-time-picker"
          label={label || ''}
          sx={{
            background: '#F6F6F6',
            width: '100%',
            height: '40px',
          }}
          openTo="month"
          views={['year', 'month', 'day']}
          open={isOpenDatePicker}
          value={selectedDate}
          onChange={handleDateChange}
          onClose={handleClose}
          onViewChange={handleCurrentView}
          slots={{
            openPickerIcon: () => (
              <Image
                src={'/icons/CalendarOutline.svg'}
                width={20}
                height={20}
                alt="Date"
                sx={{
                  display: 'block',
                }}
                onClick={() => setIsOpenDatePicker((ps) => !ps)}
              />
            ),
            actionBar: () =>
              currentView === 'day' ? (
                <ActionBarComponent onClose={handleCloseDatePicker} />
              ) : null,
          }}
        />
      </LocalizationProvider>
      {openModal && (
        <PreviousDateModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};
export default LeaveDatePicker;
