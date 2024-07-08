import React from 'react';

import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material';
import FormInput from '../form/ui-elements/FormInput';
import { FORM_DATA } from '@/src/constants/form';
import { useFormik } from 'formik';
import { HiringForm } from '@/src/constants/data/forms/start-hiring';
import { hiringFormSchema } from '../form/schemas/hiringForm';
import { HIRING_FORM_DATA } from '@/src/constants/Hiring';
import { api } from '@/src/services/apiService';
import { CLIENT_START_HIRING } from '@/src/services/apiService/apiEndPoints';
import {
  createClientHiringRequest,
  createClientHiringRequestFailed,
  createClientHiringRequestSuccess,
} from '@/src/redux/slices/clientSlices/hiringProgressSlice';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { generateUniqueString } from '@/src/utils/helpers';
import dayjs from 'dayjs';
import { Toast } from '../Toast/Toast';
import { useRouter } from 'next/navigation';
import { countriesList } from '@/src/constants/countries';
const StartHiringForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    setFieldError,
    setErrors,
  } = useFormik({
    initialValues: {
      hiringStartDate: null,
      hiringEndDate: null,
      country: {
        flag: 'https://flagcdn.com/pk.svg',
        title: 'Pakistan',
      },
    },
    validationSchema: hiringFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      // const formVals
      const revampFormValues = {
        job_title: formValues?.jobTitle,
        role_type: formValues?.roleType,
        gender: formValues?.gender,
        employment_term: formValues?.employmentTerm,
        salary_range: {
          minimum: formValues?.salary_range?.minimum,
          maximum: formValues?.salary_range?.maximum,
        },
        country: formValues?.country?.title,
        hiring_start_date: dayjs(formValues?.hiringStartDate).format(
          'YYYY-MM-DD'
        ),
        hiring_end_date: dayjs(formValues?.hiringEndDate).format('YYYY-MM-DD'),
      };

      mutate(revampFormValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const getRevampedValues = (vals) => ({
    job_title: vals?.jobTitle,
    role_type: vals?.roleType,
    gender: vals?.gender,
    employment_term: vals?.employmentTerm,
    salary_range: {
      minimum: vals?.salary_range?.minimum,
      maximum: vals?.salary_range?.maximum,
    },
    hiring_start_date: dayjs(vals?.hiringStartDate).format('YYYY-MM-DD'),
    hiring_end_date: dayjs(vals?.hiringEndDate).format('YYYY-MM-DD'),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      // console.log({ formVals });
      // return {
      //   data: [],
      // };
      dispatch(createClientHiringRequest());
      // const formData = new FormData();
      // for (const key in formVals) {
      //   formData.append(key, formVals[key]);
      // }
      return api.postJSONData(CLIENT_START_HIRING, formVals);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data posted successfully');
      console.log({ values, data });
      dispatch(
        createClientHiringRequestSuccess({
          ...getRevampedValues(values),
          id: generateUniqueString(),
        })
      );
      router.push(`/client/dashboard/hire-onboard/hiring-progress`);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      dispatch(createClientHiringRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });

  return (
    <Box
      sx={{
        width: '750px',
        height: { xs: 'auto' },
        borderRadius: '10px',
        border: '1px solid #E4E4E4',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        py: { xs: '15px', sm: '20px', md: '20px 60px' },
        px: { xs: '5px', sm: '20px', md: '20px 60px' },
        gap: { xs: '10px', md: '30px' },
        '@media (min-width: 750px)': {
          height: '900px',
        },
      }}
    >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            color: '#595959',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            width: '40px',
            p: '8px 0',
            mb: '30px',
          }}
        >
          {HIRING_FORM_DATA?.hire}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container>
          {HiringForm?.map(
            (
              {
                title,
                placeholder,
                errorText,
                prefixIcon,
                type,
                suffixIcon,
                options,
                name,
                nested,
                fields,
                searchable,
                withFlag,
              },
              formIndex
            ) => (
              <>
                <Box
                  sx={{
                    width: '50%',
                    '@media (max-width: 749px)': {
                      width: '100%',
                    },
                  }}
                  key={formIndex}
                >
                  <FormInput
                    title={title}
                    placeholder={placeholder}
                    errorText={errorText}
                    prefixIcon={prefixIcon}
                    type={type}
                    suffixIcon={suffixIcon}
                    options={options}
                    name={name}
                    setFieldValue={setFieldValue}
                    value={values[name]}
                    error={errors[name]}
                    touched={touched}
                    setFieldError={setFieldError}
                    errors={errors}
                    setErrors={setErrors}
                    values={values}
                    nested={nested}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    fields={fields}
                    searchable={searchable}
                    countries={countriesList}
                    width={'100%'}
                    withFlag={withFlag}
                    marginLeft={{
                      '@media (min-width: 600px) and (max-width: 1200px)': {
                        marginLeft: '15px',
                      },
                    }}
                  />
                </Box>
              </>
            )
          )}
          <Box sx={{ width: '100%', px: { xs: '10px', md: 0 } }}>
            <Button
              sx={{
                fontSize: '16px',
                width: '100%',
                padding: '10px',
                fontWeight: 600,
                background: '#fff',
                color: '#029894',
                border: '1px solid #029E9C',
                mt: '25px',
                '&:hover': {
                  background: '#029E9C',
                  color: '#fff',
                },
              }}
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress size={26} color="secondary" />
              ) : (
                FORM_DATA?.submit
              )}
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};
export default StartHiringForm;
