import React from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { formEmployeeCredential } from '@/src/constants/data/forms/employee-credential';
import { editEmployeeCredentialSchema } from '../form/schemas/employeeCredential';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_UPDATE_EMP_CREDS } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '../Toast/Toast';
import { useSelector } from 'react-redux';

const EditEmployeeCredential = ({ onClose, open }) => {
  const { employee_id } = useSelector(
    (state) => state?.hr?.employees?.currentEmployee
  );
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(`${HR_UPDATE_EMP_CREDS}`, {
        employee_id: employee_id,
        ...data,
      });
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data deleted successfully');
      console.log({ data });
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
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
    validationSchema: editEmployeeCredentialSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      mutate(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          // width: { xs: '90%', md: '40%' },
          maxWidth: '812px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          position: 'absolute',
          top: '30%',
          maxHeight: '75%',
          // '@media (min-width: 900px) and (max-width: 1440px)': {
          //   width: '70%',
          // },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '25px',
              fontWeight: 600,
              marginLeft: '20px',
            }}
          >
            {EDIT_MODAL?.editEmployeeCredentials}
          </Typography>
          <Box
            src="/images/leave-request/close.svg"
            component={'img'}
            onClick={onClose}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              padding: { xs: '10px 20px', lg: '41px 60px' },
            }}
          >
            {formEmployeeCredential?.map(
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
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                    />
                  </Grid>
                  {/* {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>} */}
                </>
              )
            )}
            <Grid
              item
              p={'0 10px'}
              xs={12}
              sx={{
                '@media (min-width: 280px) and (max-width: 1200px)': {
                  paddingBottom: '20px',
                },
              }}
            >
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
              >
                {EDIT_MODAL?.save}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default EditEmployeeCredential;
