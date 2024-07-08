export const filterAttendance = (
  data,
  attendanceStatus,
  checkInRange,
  checkOutRange
) => {
  // Function to convert 12-hour time format to minutes
  const timeToMinutes = (t) => {
    const [time, period] = t.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const adjustedHours =
      period === 'PM' && hours !== 12
        ? hours + 12
        : period === 'AM' && hours === 12
          ? 0
          : hours;
    return adjustedHours * 60 + minutes;
  };

  const isWithinRange = (time, range) => {
    if (time === '-' || range.from === '-' || range.to === '-') {
      return true;
    }
    const timeMinutes = timeToMinutes(time);
    const fromMinutes = timeToMinutes(range.from);
    const toMinutes = timeToMinutes(range.to);
    return timeMinutes >= fromMinutes && timeMinutes <= toMinutes;
  };

  const final = data.filter((entry) => {
    // Check if the attendanceStatus matches if attendanceStatus is provided
    const statusMatches = attendanceStatus
      ? entry.status.includes(attendanceStatus)
      : true;

    // Extract the times in 'hh:mm:ss AM/PM' format from check_in and check_out
    const checkInTime = entry.check_in !== '-' ? entry.check_in : '-';
    const checkOutTime = entry.check_out !== '-' ? entry.check_out : '-';

    // Check if check-in and check-out times are within the specified range if ranges are provided
    const checkInMatches = checkInRange
      ? checkInTime === '-' || isWithinRange(checkInTime, checkInRange)
      : true;
    const checkOutMatches = checkOutRange
      ? checkOutTime === '-' || isWithinRange(checkOutTime, checkOutRange)
      : true;

    // console.log({ statusMatches, checkInMatches, checkOutMatches });

    return statusMatches && checkInMatches && checkOutMatches;
  });
  // console.log({ final, data, attendanceStatus, checkInRange, checkOutRange });
  return final;
};
