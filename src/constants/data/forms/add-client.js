import {
  basicInformationSchemaClient,
  securitySchemaClient,
} from '@/src/components/form/schemas/addClient';

const formElements = [
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
    title: 'Company name',
    placeholder: 'Enter company name',
    name: 'company_name',
  },
  {
    title: 'Email',
    placeholder: 'Enter email',
    name: 'email',
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
    placeholder: 'Enter company address',
    name: 'address',
  },
  {
    title: 'Image',
    placeholder: 'Upload image',
    name: 'image',
    prefixIcon: 'upload',
    type: 'file',
    filelabel: 'Accept .png or .jpg files only',
    accept: 'image/png, image/jpg',
  },
];
const formElementsStep4 = [
  {
    title: 'Client ID',
    placeholder: 'Enter client id',
    name: 'client_id',
  },
  {
    title: 'Password',
    placeholder: 'Enter password',
    name: 'password',
    type: 'password',
  },
  {
    title: 'Confirm password',
    placeholder: 'Confirm password',
    name: 'confirm_password',
    type: 'password',
  },
];
export const formSteps = [
  {
    title: 'Basic Information',
    countNo: 1,
    schema: basicInformationSchemaClient,
    form: formElements,
  },
  {
    title: 'Security',
    countNo: 2,
    schema: securitySchemaClient,
    form: formElementsStep4,
  },
];
