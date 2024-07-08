export const clientEditForm = [
  {
    title: 'First name',
    placeholder: 'Enter first name',
    name: 'first_name',
  },
  {
    title: 'Last name',
    placeholder: 'Enter first name',
    name: 'last_name',
  },
  {
    title: 'Company',
    placeholder: 'eSparkTalent',
    name: 'company_name',
  },
  {
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
    disabled: true,
  },
  {
    title: 'Phone number',
    placeholder: 'Enter phone number',
    name: 'phone_number',
  },
  {
    title: 'Join date',
    placeholder: 'DD-MM-YYYY',
    name: 'join_date',
    suffixIcon: 'calender',
    type: 'date',
  },
  {
    title: 'Country',
    placeholder: 'Select',
    name: 'country',
    type: 'select',
    searchable: true,
    withFlag: true,
  },
  {
    title: 'Address',
    placeholder: '15 Sellamuttu Avenue, 03, Colombo',
    name: 'address',
  },
  {
    title: 'Picture',
    placeholder: 'john.png',
    name: 'image',
    prefixIcon: 'upload',
    type: 'file',
  },
];
