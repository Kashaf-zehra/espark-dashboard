export const Attendance_Summary_Title = 'Attendance Summary';
export const Leave_Summary_Title = 'Leave Summary';
export const Clock_Title = 'Clock';
export const Clock_Dial = '/images/sidebar-icons/clock-dial.svg';
export const Summary_Slider_Breakpoints = {
  280: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  500: {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  650: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  800: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  900: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1000: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  // When window width is >= 480px
  1100: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  // When window width is >= 640px
  1200: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  // When window width is >= 768px
  1350: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  1550: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1920: {
    slidesPerView: 4.5,
    spaceBetween: 20,
  },
};
export const Summary_Boxes = [
  {
    title: 'Shifts',
    count: `08`,
    horizontalLineColor: '#068987',
    backgroundColor: '#E6F4F4',
    name: 'shifts',
  },
  {
    title: 'Expected minutes',
    count: `08`,
    horizontalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
    name: 'expected_minutes',
  },
  {
    title: 'Worked minutes',
    count: `08`,
    horizontalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
    name: 'worked_minutes',
  },
  {
    title: 'Short minutes',
    count: `08`,
    horizontalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
    name: 'short_minutes',
  },
  {
    title: 'Leaves',
    count: `08`,
    horizontalLineColor: '#006C9C',
    backgroundColor: '#E6F4F4',
    name: 'leaves',
  },
  // {
  //   title: 'Travels',
  //   count: `08`,
  //   horizontalLineColor: '#7A0916',
  //   backgroundColor: '#F6ECED',
  //   name: 'travel'
  // },

  {
    title: 'Absents',
    count: `08`,
    horizontalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
    name: 'absents',
  },
  {
    title: 'Presents',
    count: `08`,
    horizontalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
    name: 'presents',
  },
  {
    title: 'Missings',
    count: `08`,
    horizontalLineColor: '#068987',
    backgroundColor: '#E6F4F4',
    name: 'missings',
  },
  {
    title: 'Days Off',
    count: `08`,
    horizontalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
    name: 'days_off',
  },
  // {
  //   title: 'Rest days',
  //   count: `08`,
  //   horizontalLineColor: '#FFBE3B',
  //   backgroundColor: '#FFF8EB',
  //   name:''
  // },
  // {
  //   title: 'Rexations',
  //   count: `08`,
  //   horizontalLineColor: '#006C9C',
  //   backgroundColor: '#E0F6FA',
  //   name:''
  // },
  // {
  //   title: 'Early left',
  //   count: `08`,
  //   horizontalLineColor: '#068987',
  //   backgroundColor: '#E6F4F4',
  //   name:''
  // },
  {
    title: 'Over time',
    count: `08`,
    horizontalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
    name: 'overtimes',
  },
  {
    title: 'Break minutes',
    count: `08`,
    horizontalLineColor: '#7A0916',
    backgroundColor: '#F5ECED',
    name: 'break_minutes',
  },
  {
    title: 'Late arrival',
    count: `08`,
    horizontalLineColor: '#FFBE3B',
    backgroundColor: '#FFF8EB',
    name: 'late_arrivals',
  },
  {
    title: 'Short duration',
    count: 15,
    horizontalLineColor: '#006C9C',
    backgroundColor: '#E0F6FA',
    name: 'short_durations',
  },
];

export const Leave_Summary_Boxes = [
  {
    title: 'Casual Leaves',
    name: 'casual_leaves',
    subtitle: '(LRT-00001)',
    leaveType: [
      { name: 'total', title: 'Total:', quantity: 12, circleColor: '' },
      {
        name: 'availed',
        title: 'Availed:',
        quantity: 0,
        circleColor: '#F16E61',
      },
      {
        name: 'pending',
        title: 'Pending:',
        quantity: 0,
        circleColor: '#F4B844',
      },
      {
        name: 'balance',
        title: 'Available:',
        quantity: 0,
        circleColor: '#136E91',
      },
    ],
  },
  {
    title: 'Sick Leaves',
    subtitle: '(LRT-00002)',
    name: 'sick_leaves',
    leaveType: [
      { name: 'total', title: 'Total:', quantity: 8, circleColor: '' },
      {
        name: 'availed',
        title: 'Availed:',
        quantity: 0,
        circleColor: '#F16E61',
      },
      {
        name: 'pending',
        title: 'Pending:',
        quantity: 0,
        circleColor: '#F4B844',
      },
      {
        name: 'balance',
        title: 'Available:',
        quantity: 0,
        circleColor: '#136E91',
      },
    ],
  },
  {
    title: 'Annual Leave',
    subtitle: '(LRT-00006)',
    name: 'annual_leaves',
    leaveType: [
      { name: 'total', title: 'Total:', quantity: 20, circleColor: '' },
      {
        name: 'availed',
        title: 'Availed:',
        quantity: 0,
        circleColor: '#F16E61',
      },
      {
        name: 'pending',
        title: 'Pending:',
        quantity: 0,
        circleColor: '#F4B844',
      },
      {
        name: 'balance',
        title: 'Available:',
        quantity: 0,
        circleColor: '#136E91',
      },
    ],
  },
  {
    title: 'Unpaid Leaves',
    subtitle: '(LRT-00007)',
    name: 'unpaid_leaves',
    leaveType: [
      { name: 'total', title: 'Total:', quantity: 365, circleColor: '' },
      {
        name: 'availed',
        title: 'Availed:',
        quantity: 0,
        circleColor: '#F16E61',
      },
      {
        name: 'pending',
        title: 'Pending:',
        quantity: 0,
        circleColor: '#F4B844',
      },
      {
        name: 'balance',
        title: 'Available:',
        quantity: 0,
        circleColor: '#136E91',
      },
    ],
  },
  {
    title: 'Paid Leaves',
    subtitle: '(LRT-00007)',
    name: 'paid_leaves',
    leaveType: [
      { name: 'total', title: 'Total:', quantity: 10, circleColor: '' },
      {
        name: 'availed',
        title: 'Availed:',
        quantity: 0,
        circleColor: '#F16E61',
      },
      {
        name: 'pending',
        title: 'Pending:',
        quantity: 0,
        circleColor: '#F4B844',
      },
      {
        name: 'balance',
        title: 'Available:',
        quantity: 0,
        circleColor: '#136E91',
      },
    ],
  },
  {
    title: 'Hajj / Umrah Leaves',
    subtitle: '(LRT-00005)',
    name: 'hajj_leaves',
    leaveType: [
      { name: 'total', title: 'Total:', quantity: 20, circleColor: '' },
      {
        name: 'availed',
        title: 'Availed:',
        quantity: 0,
        circleColor: '#F16E61',
      },
      {
        name: 'pending',
        title: 'Pending:',
        quantity: 0,
        circleColor: '#F4B844',
      },
      {
        name: 'balance',
        title: 'Available:',
        quantity: 0,
        circleColor: '#136E91',
      },
    ],
  },
];

export const Statistics_Data = [
  {
    title: 'Today',
    hoursCompleted: '3.45',
    totalHours: '8',
    remainingBack: '#E6F4F4',
    background: '#FEDB41',
    name: 'today',
  },
  {
    title: 'This week',
    hoursCompleted: '28',
    totalHours: '40',
    remainingBack: '#E6F4F4',
    background: '#F4B844',
    name: 'this_week',
  },
  {
    title: 'This month',
    hoursCompleted: '90',
    totalHours: '160',
    remainingBack: '#E6F4F4',
    background: '#2D9C98',
    name: 'this_month',
  },
  {
    title: 'Remaining',
    hoursCompleted: '90',
    totalHours: '160',
    remainingBack: '#E6F4F4',
    background: '#B24057',
    name: 'remaining',
  },
  {
    title: 'Overtime',
    hoursCompleted: '4',
    totalHours: '20',
    remainingBack: '#E6F4F4',
    background: '#338CB2',
    name: 'overtime',
  },
];

export const Timeline_Data = [
  {
    id: 1,
    title: 'Check in',
    time: '10:00 AM',
    name: 'check_in',
  },
  {
    id: 2,
    title: 'Break at',
    time: '10:00 AM',
    description: 'Description of Event 2.',
    name: 'break',
  },
  {
    id: 3,
    title: 'Resumed at',
    time: '10:00 AM',
    name: 'resume',
  },
  {
    id: 3,
    title: 'Check out',
    time: '10:00 AM',
    name: 'check_out',
  },
];
export const Mark_CLock_Title = {
  title: 'Mark clock in/ clock out',
  clock_icon: '/icons/ClockIcon.svg',
  expected_start_time: 'Exp: 10:00 AM',
  expected_end_time: 'Exp: 07:00 PM',
  default_time: '--:-- --',
  break_out_icon: '/icons/TeaIcon1.svg',
};
