import dayjs from 'dayjs';

export const createPunchRequestForm = [
  {
    title: 'Date',
    placeholder: 'Enter Date',
    name: 'date',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    maxDate: dayjs().subtract(0, 'day'),
  },
  {
    title: 'Expected check in',
    placeholder: '10:00 AM',
    name: 'expectedCheckIn',
    type: 'static',
    hideSuffix: true,
    disabled: true,
  },
  {
    title: 'Expected check out',
    placeholder: '07:00 PM',
    name: 'expectedCheckOut',
    type: 'static',
    hideSuffix: true,
    disabled: true,
  },
  {
    title: 'Punch type',
    placeholder: 'Select punch type',
    name: 'punchType',
    type: 'select',
    options: [
      {
        label: 'Check in',
      },
      {
        label: 'Check out',
      },
    ],
    required: true,
  },
  {
    title: 'Punch time',
    placeholder: '07:00 PM',
    name: 'punchTime',
    type: 'time',
    hideSuffix: true,
    required: true,
  },
  {
    title: 'Description',
    placeholder: 'Write your description',
    name: 'description',
    type: 'text-area',
    required: true,
  },
];
