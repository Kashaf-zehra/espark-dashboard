import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { changePasswordFormSchema } from '../form/schemas/changePassword';
import { changePasswordForm } from '@/src/constants/data/forms/change-password';
import { User_Password } from '@/src/constants/profileEditData';
import { useMutation } from '@tanstack/react-query';
import { CLIENT_UPDATE_PASSWORD } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { Toast } from '../Toast/Toast';

const ChangePassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(`${CLIENT_UPDATE_PASSWORD}`, data);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data updated successfully');
      console.log({ data });
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
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
    initialValues: {},
    validationSchema: changePasswordFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      mutate(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        my: { xs: 3, md: -4 },
        width: { xs: '100%', md: '50%' },
      }}
    >
      <Typography variant="body2" sx={{ color: '#171717', fontWeight: '400' }}>
        {User_Password?.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid sx={{ marginLeft: '-7px' }}>
          {changePasswordForm?.map(
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
                disabled,
                suffixIconOutsideWithTooltip,
              },
              formIndex
            ) => (
              <>
                <Grid item xs={12} lg={6} key={formIndex}>
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
                    md={12}
                    lg={12}
                    fields={fields}
                    disabled={disabled}
                    suffixIconOutsideWithTooltip={suffixIconOutsideWithTooltip}
                  />
                </Grid>
                {formIndex % 1 === 0 && <Grid item xs={12} lg={6}></Grid>}
              </>
            )
          )}
          <Grid item p={'0 10px'} xs={12} marginTop={-2}>
            <Button
              sx={{
                minWidth: '120px',
                background: '#888888',
                color: '#fff',
                '&:hover': {
                  background: '#888888',
                  color: '#fff',
                },
                '&.Mui-disabled': {
                  background: '#EBEBE4',
                  color: '#C6C6C6',
                },
              }}
              type="submit"
              disabled={true}
            >
              {isPending ? (
                <CircularProgress size={26} color="secondary" />
              ) : (
                User_Password?.buttonText
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ChangePassword;
