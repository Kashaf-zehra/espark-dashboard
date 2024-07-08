import dayjs from 'dayjs';

export const createLeaveRequestForm = [
  {
    title: 'Leave type',
    placeholder: 'Select',
    name: 'leaveType',
    type: 'select',
    options: [
      {
        label: 'Sick leave',
      },
      {
        label: 'Casual leave',
      },
      {
        label: 'Annual leave',
      },
      {
        label: 'Unpaid leave',
      },
      {
        label: 'Hajj / Umrah leave',
      },
    ],
    required: true,
    searchable: true,
  },
  {
    title: 'Start date',
    placeholder: 'Enter Date',
    name: 'startDate',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    minDate: dayjs().subtract(1, 'week'),
  },
  {
    title: 'End date',
    placeholder: 'Enter Date',
    name: 'endDate',
    suffixIcon: 'CalendarOutline',
    type: 'date',
    required: true,
    minDate: dayjs().subtract(8, 'days'),
  },
  {
    title: 'Count',
    placeholder: '1',
    name: 'count',
    disabled: true,
    type: 'static',
  },
  {
    title: 'Available leaves',
    placeholder: '0',
    name: 'availableLeaves',
    disabled: true,
    type: 'static',
  },
  {
    title: 'Attachment',
    placeholder: 'Upload Document',
    name: 'attachment',
    type: 'file',
    suffixIcon: '',
    required: true,
  },
  {
    title: 'Reason',
    placeholder: 'Enter reason',
    name: 'reason',
    type: 'text-area',
    required: true,
  },
];
