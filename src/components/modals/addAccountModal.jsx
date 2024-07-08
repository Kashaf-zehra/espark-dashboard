import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import { accountInfoSchema } from '../form/schemas/addAccount';
import { accountForm } from '@/src/constants/data/forms/add-account';
import { SETTING } from '@/src/constants/SettingHr';
import { FORM_DATA } from '@/src/constants/form';
// import { generateString } from '@/src/utils/genericAccountsId';
// import { processImage } from '@/src/utils/imageUrl';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_ACCOUNTS } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '../Toast/Toast';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '@/src/redux/slices/hrSlices/settingsSlice';

const AddAccountModal = ({
  open,
  onClose,
  // handleAdd
}) => {
  const [accountFormValues, setAccountFormValues] = useState(null);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(`${HR_ACCOUNTS}`, formData);
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      Toast('success', 'Data posted successfully');
      dispatch(
        addAccount({
          ...accountFormValues,
          action: ['Delete', 'View'],
          image: data?.image,
          id: data?.id,
        })
      );
      setAccountFormValues(null);
      // handleClose();
      // setModalData({});
      handleCloseModal();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      // dispatch(deleteClientHiringRequestFailed());
      // handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  // const handleGenericString = () => {
  //   const generateId = generateString();
  //   return generateId;
  // };
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
    initialValues: {},
    validationSchema: accountInfoSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (formValues) => {
      console.log({ formValues });
      const tempFormVals = {
        account_name: formValues.account_name,
        email: formValues.email,
        password: formValues.password,
      };
      setAccountFormValues(tempFormVals);
      mutate(formValues);
    },
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
          // width: { xs: '90%', sm: '90%', md: '45%' },
          maxWidth: '850px',
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
              marginLeft: '8px',
            }}
          >
            {SETTING?.addAccount}
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
              marginRight: '8px',
            }}
            onClick={handleCloseModal}
          >
            <Box component="img" src="/icons/Close.svg" sx={{}} />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 80px' },
              display: 'flex',
            }}
          >
            {accountForm?.map(
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
                  accept,
                  filelabel,
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
                      accept={accept}
                      filelabel={filelabel}
                    />
                  </Grid>
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
                  FORM_DATA?.add
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAccountModal;
