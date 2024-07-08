import * as Yup from 'yup';

// export const filterModalSchema = Yup.object({
//   from: Yup.string().required('From date is required'),
//   to: Yup.string().required('To date is required'),
//   attendanceStatus: Yup.string(),
//   checkinTimeFrom: Yup.mixed().required('Checkin start time is required'),
//   checkinTimeTo: Yup.mixed().required('Checkin end time is required'),
//   checkoutTimeFrom: Yup.mixed().required('Checkout start time is required'),
//   checkoutTimeTo: Yup.mixed().required('Checkout end time is required'),
// });

export const filterModalSchema = Yup.object({
  from: Yup.string().required('From date is required'),
  to: Yup.string().required('To date is required'),
  attendanceStatus: Yup.string(),
  checkIn: Yup.object().shape({
    from: Yup.string().required('Checkin time is required'),
    to: Yup.string().required('Checkin time is required'),
  }),
  checkOut: Yup.object().shape({
    from: Yup.string().required('Checkout time is required'),
    to: Yup.string().required('Checkout time is required'),
  }),
});
