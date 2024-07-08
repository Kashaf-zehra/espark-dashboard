import React from 'react';
import Image from 'next/image';

const LeaveCalendarIcon = ({ props, open }) => {
  return (
    <Image
      {...props}
      src="/images/leave-request/calender-icon.svg"
      width={30}
      height={30}
      alt="calender"
      onClick={open}
    />
  );
};
export default LeaveCalendarIcon;
