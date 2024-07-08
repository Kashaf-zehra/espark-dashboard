// import * as Yup from 'yup';

// export const createLeaveRequestSchema = Yup.object({
//   leaveType: Yup.string().required('Required'),
//   startDate: Yup.string()
//     .required('Required')
//     .matches(
//       /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
//       'Invalid date format'
//     ) // Enforce ISO 8601 format
//     .transform((value) => new Date(value).toISOString()), // Normalize to UTC
//   endDate: Yup.string()
//     .required('Required')
//     // .matches(
//     //   /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/,
//     //   'Invalid date format'
//     // )
//     .transform((value) => new Date(value).toISOString())
//     .min(Yup.ref('startDate'), 'End date must be after start date'),
//   count: Yup.string(),
//   availableLeaves: Yup.string(),
//   attachment: Yup.mixed(),
//   reason: Yup.string().required('Required'),
// });

import * as Yup from 'yup';

export const createLeaveRequestSchema = Yup.object({
  leaveType: Yup.mixed().required('Leave type is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be greater than start date'),
  count: Yup.string(),
  availableLeaves: Yup.string(),
  attachment: Yup.mixed().required('Attachment is required'),
  reason: Yup.string().required('Reason is required'),
});
