import dayjs from 'dayjs';

import { filterAttendance } from './filterAttendance';

import { convertDateFormat, getAttendenceShortHand } from './helpers';

export const getTimeSheet = (
  timeSheetData,
  attendanceStatus,
  checkInRange,
  checkOutRange
) => {
  let finalData;
  const newData = Object.entries(timeSheetData)?.map((recItem) => {
    return {
      ...recItem[1],
      date: recItem[0],
      day: dayjs(convertDateFormat(recItem[0])).format('dddd'),
      status: Object.entries(recItem[1]?.status)
        ?.map((st) => {
          if (!st[1]) return;
          else return getAttendenceShortHand(st[0]);
        })
        .filter((el) => el !== undefined),
      action: ['View'],
      attendenceShortHand: true,
      actionStatus: true,
    };
  });
  if (attendanceStatus || checkInRange || checkOutRange) {
    finalData = filterAttendance(
      newData,
      attendanceStatus,
      checkInRange,
      checkOutRange
    );
  } else {
    finalData = newData;
  }

  return finalData;
};
