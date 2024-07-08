import * as Yup from 'yup';

export const editEmployeeCredentialSchema = Yup.object({
  // employee_id: Yup.string().required('Required'),
  current_password: Yup.string().required('Current Password is required'),
  new_password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters long')
    .notOneOf(
      [Yup.ref('current_password'), null],
      'New password cannot be the same as the current password'
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
