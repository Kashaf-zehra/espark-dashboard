import * as Yup from 'yup';

const timeFormatRegex =
  /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([\w\s]+\)$/;

const customTimeValidator = Yup.string()
  .required('Required')
  .matches(timeFormatRegex, 'Invalid time format');

export const timeManagementFormSchema = Yup.object({
  check_in: customTimeValidator,
  check_out: customTimeValidator,
});
