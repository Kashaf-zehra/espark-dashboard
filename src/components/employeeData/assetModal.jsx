import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import { EDIT_MODAL } from '@/src/constants/employeeProfile';
import FormInput from '../form/ui-elements/FormInput';
import { assetForm } from '@/src/constants/data/forms/asset-form';
import { assetFormSchema } from '../form/schemas/assetForm';
import { useMutation } from '@tanstack/react-query';
import { HR_ADD_EMP_ASSET } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { addEmpAsset } from '@/src/redux/slices/hrSlices/employeeSlice';
import { useDispatch } from 'react-redux';
import { Toast } from '../Toast/Toast';

const AssetForm = ({ onClose, open, empData }) => {
  // const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.postJSONData(`${HR_ADD_EMP_ASSET}`, data);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data posted successfully');
      console.log({ data, values });
      const reformedData = {
        ...values,
        id: data?.id,
        assigned_date: dayjs(values.assigned_date).format('YYYY-MM-DD h:m A'),
        assignee: [values?.assignee_name, values?.assignee_email],
        action: ['Delete'],
      };
      dispatch(addEmpAsset(reformedData));
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      // onClose();
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
    validationSchema: assetFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const reformedData = {
        ...formValues,
        employee_id: empData?.email,
        assigned_date: dayjs(formValues.assigned_date).format(
          'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        ),
      };
      console.log({ reformedData });
      mutate(reformedData);
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
          maxWidth: '850px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          position: 'absolute',
          top: '10%',
          maxHeight: '90%',
          '@media (min-width: 900px) and (max-width: 1440px)': {
            width: '70%',
          },
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
            {EDIT_MODAL?.addassetForm}
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
            sx={{
              padding: { xs: '10px 20px', lg: '41px 60px' },
            }}
          >
            {assetForm?.map(
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
                  <Grid item xs={12} lg={5} key={formIndex}>
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
                      // handleData={handleData}
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default AssetForm;
