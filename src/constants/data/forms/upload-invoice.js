export const uploadInvoiceForm = [
  {
    title: 'Employee ID',
    placeholder: 'Enter employee ID',
    name: 'employee_id',
  },
  {
    title: 'Invoice date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'invoice_date',
  },
  {
    title: 'Due date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'due_date',
  },
  {
    title: 'Invoice amount',
    placeholder: '',
    name: 'invoice_amount',
    dollarIcon: '$',
  },
  {
    title: 'Upload',
    placeholder: 'Upload invoice',
    prefixIcon: 'upload',
    type: 'file',
    name: 'invoice',
    accept: '.pdf',
    filelabel: 'Accept .pdf file only',
  },
  // {
  //   title: 'Payment Status',
  //   placeholder: 'Status',
  //   name: 'payment_status',
  //   type: 'select',
  //   options: [
  //     {
  //       label: 'pending',
  //     },
  //     {
  //       label: 'processing',
  //     },
  //     {
  //       label: 'paid',
  //     },
  //   ],
  // },
];
export const uploadOtherInvoiceForm = [
  {
    title: 'Invoice reference',
    placeholder: 'Invoice Reference',
    name: 'invoice_reference',
  },
  {
    title: 'Invoice date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'invoice_date',
  },
  {
    title: 'Due date',
    placeholder: 'DD-MM-YYYY',
    suffixIcon: 'calender',
    type: 'date',
    name: 'due_date',
  },
  {
    title: 'Invoice amount',
    placeholder: '',
    name: 'invoice_amount',
    dollarIcon: '$',
  },
  {
    title: 'Upload',
    placeholder: 'Upload invoice',
    prefixIcon: 'upload',
    type: 'file',
    name: 'invoice',
    accept: '.pdf',
    filelabel: 'Accept .pdf file only',
  },
  // {
  //   title: 'Payment Status',
  //   placeholder: 'Status',
  //   name: 'payment_status',
  //   type: 'select',
  //   options: [
  //     {
  //       label: 'pending',
  //     },
  //     {
  //       label: 'processing',
  //     },
  //     {
  //       label: 'paid',
  //     },
  //   ],
  // },
];
