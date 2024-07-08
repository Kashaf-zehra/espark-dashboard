import * as Yup from 'yup';

export const passwordChangeSchema = Yup.object({
  current_password: Yup.string().required('Password is required'),
  new_password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .notOneOf(
      [Yup.ref('current_password'), null],
      'New password cannot be the same as the current password'
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
