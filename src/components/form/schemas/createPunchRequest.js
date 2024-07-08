import * as Yup from 'yup';

// Custom function to validate the date format
const isValidDateFormat = (value) => {
  // Regex pattern for matching the desired date format
  const dateFormatRegex =
    /^[a-zA-Z]{3}\s[a-zA-Z]{3}\s[0-9]{2}\s[0-9]{4}\s[0-9]{2}:[0-9]{2}:[0-9]{2}\sGMT[+-][0-9]{4}\s\(([^)]+)\)$/;
  return dateFormatRegex.test(value);
};

// Custom function to check if date is not greater than maxDate
const isDateNotGreaterThanMaxDate = (value, maxDate) => {
  return new Date(value) <= maxDate;
};

// Schema definition
export const createPunchRequestSchema = Yup.object({
  date: Yup.string()
    .required('Date is required')
    .test('is-valid-date', 'Invalid date format', isValidDateFormat)
    .test(
      'not-greater-than-max-date',
      'Date should not be greater than max date',
      (value) => {
        // Define your maxDate here, for example, let's say it's today's date
        const maxDate = new Date();
        return isDateNotGreaterThanMaxDate(value, maxDate);
      }
    ),
  expectedCheckIn: Yup.string(),
  expectedCheckOut: Yup.string(),
  punchType: Yup.string().required('Punch type is required'),
  punchTime: Yup.string().required('Punch time is required'),
  description: Yup.string().required('Description is required'),
});
