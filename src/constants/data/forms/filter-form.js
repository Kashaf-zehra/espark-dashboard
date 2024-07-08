export const filterStatusForm = [
  {
    title: 'Status',
    placeholder: 'Select Status',
    name: 'status',
    type: 'select',
    options: [
      {
        label: 'Present',
      },
      {
        label: 'Absent',
      },
      {
        label: 'Missing',
      },
      {
        label: 'Day',
      },
      {
        label: 'Leave',
      },
      {
        label: 'Short Duration',
      },
    ],
    searchable: true,
  },
  {
    title: 'From',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'from',
  },
  {
    title: 'To',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'to',
  },
  {
    title: 'CheckIn Time',
    type: 'timerow',
    name: 'checkIn',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkinTimeFrom',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkinTimeTo',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
  {
    title: 'CheckOut Time',
    type: 'timerow',
    name: 'checkOut',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'checkoutTimeFrom',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'checkoutTimeTo',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
];

export const filterAttendanceForm = [
  {
    title: 'Attendance Status',
    placeholder: 'Select Status',
    name: 'attendanceStatus',
    type: 'select',
    options: [
      {
        label: 'Present',
      },
      {
        label: 'Absent',
      },
      {
        label: 'Missing',
      },
      {
        label: 'Day',
      },
      {
        label: 'Leave',
      },
      {
        label: 'Short Duration',
      },
    ],
    searchable: true,
  },
  {
    title: 'From',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'from',
  },
  {
    title: 'To',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'to',
  },

  {
    title: 'Checkin Time',
    type: 'timerow',
    name: 'checkIn',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'from',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'to',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
  {
    title: 'Checkout Time',
    type: 'timerow',
    name: 'checkOut',
    fieldsName: [
      {
        placeholder: '--:-- --',
        name: 'from',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
      {
        placeholder: '--:-- --',
        name: 'to',
        type: 'time',
        suffixIcon: 'ClockIcon',
      },
    ],
  },
];

export const filterLeaveForm = [
  {
    title: ' Leave Type',
    placeholder: 'Select Leave Type',
    name: 'leaveType',
    type: 'select',
    options: [
      {
        label: 'Casual Leave',
      },
      {
        label: 'Sick Leave',
      },
      {
        label: 'Annual Leave',
      },
      {
        label: 'Paid Leave',
      },
      {
        label: 'Unpaid Leave',
      },
      {
        label: 'Hajj Leave',
      },
    ],
    searchable: true,
  },
  {
    title: ' Status',
    placeholder: 'Select Status',
    name: 'status',
    type: 'select',
    options: [
      {
        label: 'Pending',
      },
      {
        label: 'Completed',
      },
      {
        label: 'Rejected',
      },
    ],
    searchable: true,
  },
  {
    title: 'From',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'from',
  },
  {
    title: 'To',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'to',
  },
  // {
  //   title: 'CheckIn Time',
  //   type: 'timerow',
  //   name: 'checkIn',
  //   fieldsName: [
  //     {
  //       placeholder: '--:-- --',
  //       name: 'checkinTimeFrom',
  //       type: 'time',
  //       suffixIcon: 'ClockIcon',
  //     },
  //     {
  //       placeholder: '--:-- --',
  //       name: 'checkinTimeTo',
  //       type: 'time',
  //       suffixIcon: 'ClockIcon',
  //     },
  //   ],
  // },
  // {
  //   title: 'CheckOut Time',
  //   type: 'timerow',
  //   name: 'checkOut',
  //   fieldsName: [
  //     {
  //       placeholder: '--:-- --',
  //       name: 'checkoutTimeFrom',
  //       type: 'time',
  //       suffixIcon: 'ClockIcon',
  //     },
  //     {
  //       placeholder: '--:-- --',
  //       name: 'checkoutTimeTo',
  //       type: 'time',
  //       suffixIcon: 'ClockIcon',
  //     },
  //   ],
  // },
];
