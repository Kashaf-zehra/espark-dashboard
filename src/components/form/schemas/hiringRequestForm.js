import * as Yup from 'yup';

export const hiringRequestSchema = Yup.object({
  job_title: Yup.string().required('Job title is required'),
  role_type: Yup.string().required('Role type is required'),
  gender: Yup.string().required('Gender is required'),
  country: Yup.string().required('Country is required'),
  salary_range: Yup.object()
    .shape({
      minimum: Yup.number()
        .required('Min range is required')
        .min(0, 'Minimum value must be greater than or equal to 0'),
      maximum: Yup.number().when('minimum', (minimum, schema) =>
        minimum
          ? schema
              .required('Max range is required')
              .min(
                minimum,
                'Maximum value must not be less than the minimum value'
              )
          : schema
      ),
    })
    .required('Salary range is required'),
  employment_term: Yup.string().required('Employement term is required'),
  hiring_start_date: Yup.string().required('Hiring start date is required'),
  hiring_end_date: Yup.string()
    .required('Hiring end date is required')
    .test(
      'is-greater',
      'End date must be greater than start date',
      function (endDate) {
        const { hiring_start_date } = this.parent;
        if (!hiring_start_date || !endDate) return true; // If any date is missing, skip validation
        return new Date(endDate) >= new Date(hiring_start_date);
      }
    ),
});
