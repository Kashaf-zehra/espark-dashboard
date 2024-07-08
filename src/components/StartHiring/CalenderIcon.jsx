import React from 'react';
import Image from 'next/image';

const CalendarIcon = (props) => {
  return (
    <Image
      {...props}
      src="/images/hiring/calender.svg"
      width={30}
      height={30}
      alt="calender"
    />
  );
};
export default CalendarIcon;
