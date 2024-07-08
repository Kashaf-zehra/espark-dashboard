import React, { useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';

import { addOnboardFormSchema } from '@/src/components/form/schemas/addOnBoardForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { addOnboardForm } from '@/src/constants/data/forms/add-onboard';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_ON_BOARDING } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';
import { Toast } from '@/src/components/Toast/Toast';
import { addOnBoard } from '@/src/redux/slices/hrSlices/clientSlice';

const AddOnboardModal = ({ open, onClose }) => {
  const { client_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [onBoardFormValues, setOnBoardFormValues] = useState(null);
  const { mutate } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(`${HR_CLIENT_EMP_ON_BOARDING}`, formVals);
    },
    onSuccess: ({ data }) => {
      console.log({ data, onBoardFormValues });
      dispatch(
        addOnBoard({
          ...onBoardFormValues,
          id: data.id,
          action:
            role === 'super_admin' ||
            (role !== 'super_admin' && client_perms?.[0]?.write)
              ? ['Delete']
              : ['-'],
        })
      );
      setOnBoardFormValues(null);
      Toast('success', 'Data posted successfully');
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
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
    handleReset,
  } = useFormik({
    initialValues: {
      country: 'Pakistan',
    },
    validationSchema: addOnboardFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        joining_date: dayjs(formValues.joining_date).format('YYYY-MM-DD'),
        client_id: email,
      };
      console.log({ finalData });
      setOnBoardFormValues(finalData);
      mutate(finalData);
      handleCloseModal();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '1000px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflowY: 'auto',
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
              ml: '10px',
            }}
          >
            {FORM_DATA?.onBoardingForm}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #068987',
              borderRadius: '50%',
              width: '25px',
              height: '25px',
              cursor: 'pointer',
            }}
            onClick={handleCloseModal}
          >
            <Box component="img" src="/icons/Close.svg" />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 100px' },
            }}
          >
            {addOnboardForm?.map(
              (
                {
                  title,
                  placeholder,
                  errorText,
                  prefixIcon,
                  dollarIcon,
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
                      dollarIcon={dollarIcon}
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
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
              >
                {FORM_DATA?.submit}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddOnboardModal;
