import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { SETTING } from '@/src/constants/SettingHr';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';

const Step = ({
  handleGoPrev,
  handleGoNext,
  form,
  isMultiColumn,
  schema,
  pmd = '95px 90px',
  editProfile,
  countries,
  mt,
  gap,
  midScreenGap,
  isLastStep,
  countNo,
  defaultValues,
  getFinalData,
  dispatchFunction,
  method,
  endpoint,
  clearForm,
  navigateFunc,
  toast,
  setCurrentStep,
  errorToast,
  marginLeft,
  marginRight,
  onSave,
  btnSave,
  fontSize,
  miniFontSize,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      console.log({ formVals });
      const formDataVals = new FormData();
      for (const key in formVals) {
        formDataVals.append(key, formVals[key]);
      }
      return api[method](endpoint, formDataVals);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      setCurrentStep?.(0);
      toast?.();
      clearForm?.();
      navigateFunc?.();
      onSave();
    },
    onError: (err) => {
      let errToast;
      const responseValues = Object.values(err?.response?.data);
      const firstResponseValue =
        responseValues.length > 0 ? responseValues[0] : null;

      if (firstResponseValue) {
        if (['/hr_add_emp/', '/hr_add_client/'].includes(endpoint)) {
          if (
            Array.isArray(firstResponseValue) &&
            firstResponseValue.length > 0
          ) {
            errToast = firstResponseValue[0];
          } else {
            errToast = firstResponseValue;
          }
        } else {
          errToast = Array.isArray(firstResponseValue)
            ? firstResponseValue[0]
            : firstResponseValue;
        }
      } else {
        errToast = 'An unknown error occurred';
      }
      console.log({
        errorDetails: err,
        errorMessage: err.message,
        errorName: err.name,
        errorStack: err.stack,
      });
      if (errToast) {
        errorToast(errToast);
      }
    },
  });

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
      ...defaultValues,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      dispatchFunction?.(formValues);
      handleGoNext?.();
      if (isLastStep) {
        const newData = getFinalData({ ...defaultValues, ...formValues });
        console.log({ fV: formValues, newData });
        mutate(newData);
      }
      btnSave(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handeClickBack = () => {
    console.log({ values, errors });
    dispatchFunction?.(values);
    handleGoPrev();
  };

  {
    console.log({ errors, values });
  }

  if (isMultiColumn)
    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            p: { xs: '20px', md: '95px 90px' },
            '@media (min-width: 350px) and (max-width: 900px)': {
              p: '40px',
            },
          }}
        >
          <Grid container columnSpacing={'40px'} p={'0 10px'}>
            {form?.map(({ label, fields }, sectionIndex) => (
              <Grid
                sx={{ mb: { xs: sectionIndex === 0 && '40px', md: 0 } }}
                xs={12}
                md={6}
                item
                key={sectionIndex}
              >
                <Box
                  sx={{
                    border: 'solid 1px #E4E4E4',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      background: '#CFF0F0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: '10px 0',
                      mb: '20px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#171717',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                  <Box>
                    <Grid
                      container
                      sx={{
                        p: { xs: '20px 20px', xl: '35px 100px' },
                      }}
                    >
                      {fields?.map(
                        (
                          {
                            title,
                            placeholder,
                            errorText,
                            name,
                            accept,
                            disabled,
                          },
                          fieldIndex
                        ) => (
                          <FormInput
                            key={fieldIndex}
                            title={title}
                            placeholder={placeholder}
                            errorText={errorText}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            name={name}
                            setFieldValue={setFieldValue}
                            value={values[name]}
                            error={errors[name]}
                            touched={touched}
                            setFieldError={setFieldError}
                            errors={errors}
                            setErrors={setErrors}
                            values={values}
                            width={'70%'}
                            accept={accept}
                            disabled={disabled}
                            marginLeft={marginLeft}
                            marginRight={marginRight}
                          />
                        )
                      )}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Box
              p={'0 10px'}
              mt={'20px'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                onClick={handeClickBack}
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  mb: { xs: '20px', md: '0' },
                  fontSize: '16px',
                }}
                variant={countNo === 1 ? 'outlined' : 'contained'}
              >
                {FORM_DATA?.back}
              </Button>
              <Button
                type="submit"
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  fontSize: '16px',
                }}
                variant="contained"
              >
                {FORM_DATA?.next}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        spacing={0}
        container
        sx={{
          p: { xs: '20px', md: pmd },
          display: 'flex',
          gap: gap ? gap : 0,
          '@media (min-width: 280px) and (max-width: 1460px)': {
            gap: midScreenGap ? midScreenGap : 0,
          },
        }}
      >
        {form?.map(
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
              col,
              searchable,
              accept,
              withFlag,
              min,
              max,
              disabled,
              filelabel,
            },
            formIndex
          ) => (
            <FormInput
              key={formIndex}
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
              lg={col}
              countries={countries}
              withFlag={withFlag}
              searchable={searchable}
              accept={accept}
              min={min}
              max={max}
              disabled={disabled}
              filelabel={filelabel}
              marginLeft={marginLeft}
              marginRight={marginRight}
              fontSize={fontSize}
              miniFontSize={miniFontSize}
            />
          )
        )}
        {editProfile ? (
          <Grid item xs={12}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={'0 10px'}
              mt={'20px'}
            >
              <Button
                type="submit"
                sx={{
                  minWidth: '120px',
                  marginTop: mt,
                  fontSize: '16px',
                  backgroundColor: '#029894',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#029894',
                    color: '#fff',
                  },
                }}
                variant="contained"
                disabled={isLastStep && isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  SETTING?.save
                )}
              </Button>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Box
              p={'0 10px'}
              mt={'20px'}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              {countNo > 1 ? (
                <Button
                  onClick={handeClickBack}
                  sx={{
                    minWidth: { xs: '100%', sm: '120px' },
                    mb: { xs: '20px', md: '0' },
                    fontSize: '16px',
                    mt: { xs: '0px', md: countNo === 2 ? mt : '0px' },
                  }}
                  variant={countNo === 1 ? 'outlined' : 'contained'}
                >
                  {FORM_DATA?.back}
                </Button>
              ) : (
                <Box />
              )}
              <Button
                type="submit"
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  fontSize: '16px',
                  mt: { xs: '0px', md: countNo === 2 ? mt : '0px' },
                }}
                disabled={isLastStep && isPending}
                variant="contained"
              >
                {!isLastStep ? (
                  'Next'
                ) : isLastStep && isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  'Submit'
                )}
                {/* {isLastStep ? 'Submit' : 'Next'} */}
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default Step;
