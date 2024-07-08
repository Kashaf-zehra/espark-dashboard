import dayjs from 'dayjs';
import { trackingStatusTypes } from '../constants/data/tables/timeTracking';

export const generateUniqueString = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 15; i++) {
    if (i === 5 || i === 13) {
      result += '-';
    } else {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  return result;
};

export const getAttendenceShortHand = (title) => {
  const val = trackingStatusTypes?.filter(({ label }) => label === title);
  return val[0].shortForm;
};

export const convertDateFormat = (dateString) => {
  var parts = dateString.split('-');

  // Swap day and month parts
  var temp = parts[0];
  parts[0] = parts[1];
  parts[1] = temp;

  // Construct the new date string in the desired format
  var newDateString = parts.join('-');

  return newDateString;
};

export const countWeekendsHandler = (startDate, endDate) => {
  let start = dayjs(startDate);
  const end = dayjs(endDate);
  let weekendCount = 0;

  while (start.isBefore(end, 'day') || start.isSame(end, 'day')) {
    if (start.day() === 6 || start.day() === 0) {
      weekendCount++;
    }
    start = start.add(1, 'day');
  }

  return weekendCount;
};

// export const restructureNotificationData = (originalData) => {
//   const today = dayjs();

//   const restructuredData = [];

//   // Iterate over each item in the original data
//   originalData.forEach((item) => {
//     const itemDate = dayjs(item.date);
//     let dayLabel;

//     if (itemDate.isSame(today, 'day')) {
//       dayLabel = 'Today';
//     } else if (itemDate.isSame(today.subtract(1, 'day'), 'day')) {
//       dayLabel = 'Yesterday';
//     } else if (itemDate.isAfter(today.subtract(7, 'day'))) {
//       dayLabel = itemDate.format('dddd'); // Day of the week
//     } else {
//       dayLabel = item.date; // Exact date
//     }

//     // Check if the day already exists in the restructured data
//     const existingDay = restructuredData.find((day) => day.day === dayLabel);

//     if (existingDay) {
//       existingDay.data.push(item);
//     } else {
//       restructuredData.push({
//         day: dayLabel,
//         data: [item],
//       });
//     }
//   });

//   return restructuredData;
// };

// export const restructureNotificationData = (originalData) => {
//   const today = dayjs();

//   const restructuredData = [];

//   // Iterate over each item in the original data
//   originalData.forEach((item) => {
//     const itemDate = dayjs(item.date);
//     let dayLabel;

//     if (itemDate.isSame(today, 'day')) {
//       dayLabel = 'Today';
//     } else if (itemDate.isSame(today.subtract(1, 'day'), 'day')) {
//       dayLabel = 'Yesterday';
//     } else if (itemDate.isAfter(today.subtract(7, 'day'))) {
//       dayLabel = itemDate.format('dddd'); // Day of the week
//     } else {
//       dayLabel = item.date; // Exact date
//     }

//     // Check if the day already exists in the restructured data
//     const existingDay = restructuredData.find((day) => day.day === dayLabel);

//     if (existingDay) {
//       existingDay.data.push(item);
//     } else {
//       restructuredData.push({
//         day: dayLabel,
//         data: [item],
//       });
//     }
//   });

//   // Sort the restructuredData array by date in descending order
//   restructuredData.sort((a, b) => {
//     if (a.day === 'Today') return -1;
//     if (b.day === 'Today') return 1;
//     if (a.day === 'Yesterday') return -1;
//     if (b.day === 'Yesterday') return 1;
//     return dayjs(b.day).valueOf() - dayjs(a.day).valueOf();
//   });

//   return restructuredData;
// };

// export const restructureNotificationData = (originalData) => {
//   const today = dayjs();

//   const restructuredData = [];

//   // Iterate over each item in the original data
//   originalData.forEach((item) => {
//     const itemDate = dayjs(item.date);
//     const itemTime = dayjs(item.date + ' ' + item.time);
//     let dayLabel;

//     if (itemDate.isSame(today, 'day')) {
//       dayLabel = 'Today';
//     } else if (itemDate.isSame(today.subtract(1, 'day'), 'day')) {
//       dayLabel = 'Yesterday';
//     } else {
//       dayLabel = itemDate.format('dddd'); // Day of the week
//     }

//     // Convert time to 12-hour format without seconds
//     const formattedTime = itemTime.format('hh:mm A');

//     // Check if the day already exists in the restructured data
//     const existingDay = restructuredData.find((day) => day.day === dayLabel);

//     if (existingDay) {
//       existingDay.data.push({ ...item, time: formattedTime });
//     } else {
//       restructuredData.push({
//         day: dayLabel,
//         data: [{ ...item, time: formattedTime }],
//       });
//     }
//   });

//   // Sort the restructuredData array by date in descending order
//   restructuredData.sort((a, b) => {
//     if (a.day === 'Today') return -1;
//     if (b.day === 'Today') return 1;
//     if (a.day === 'Yesterday') return -1;
//     if (b.day === 'Yesterday') return 1;
//     return dayjs(b.day, 'dddd').valueOf() - dayjs(a.day, 'dddd').valueOf();
//   });

//   return restructuredData;
// };

export const restructureNotificationData = (originalData) => {
  // Check if originalData is empty or not an array
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return [];
  } else {
    // Step 1: Sort data based on the date and time fields
    const sortedData = [...originalData].sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // If dates are different, sort based on date
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB - dateA; // Latest date first
      } else {
        // If dates are same, sort based on time
        const timeA = new Date(`1970-01-01T${a.time}`);
        const timeB = new Date(`1970-01-01T${b.time}`);
        return timeB - timeA; // Latest time first
      }
    });

    // Step 2: Grouping the sorted data by date
    const groupedData = sortedData?.reduce((acc, item) => {
      // Extract date from item
      const date = item.date;

      // Find if there's already an entry with this date
      const existingEntry = acc?.find((entry) => entry.day === date);

      // If yes, add the item to its data array
      if (existingEntry) {
        existingEntry.data.push(item);
      } else {
        // If no, create a new entry
        acc.push({
          day: date,
          data: [item],
        });
      }

      return acc;
    }, []);

    // Function to get the value of day based on the date
    const getDayValue = (date) => {
      const currentDate = dayjs();
      const targetDate = dayjs(date);

      // If the date is today
      if (targetDate.isSame(currentDate, 'day')) {
        return 'Today';
      }

      // If the date is yesterday
      if (targetDate.isSame(currentDate.subtract(1, 'day'), 'day')) {
        return 'Yesterday';
      }

      // If the date is within the current week
      if (targetDate.isAfter(currentDate.subtract(7, 'day'), 'day')) {
        return targetDate.format('dddd'); // Full day name
      }

      // If the date is before one week
      return targetDate.format('YYYY-MM-DD'); // Remain as it is
    };

    // Step 3: Restructure the grouped data with manipulated day values
    const restructuredData = groupedData?.map((entry) => ({
      day: getDayValue(entry.day),
      data: entry.data,
    }));

    // Step 4: Return the restructured data
    return restructuredData;
  }
};
