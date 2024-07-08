import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import { OffShContractFormHrPortalSchema } from '../form/schemas/contractSignedForm';
import { contractFormHrPortal } from '@/src/constants/data/forms/contract';
import FormInput from '../form/ui-elements/FormInput';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { useMutation } from '@tanstack/react-query';
import { addOffShoreContract } from '@/src/redux/slices/hrSlices/contractSlice';
import { useDispatch } from 'react-redux';
import { api } from '@/src/services/apiService';
import dayjs from 'dayjs';
import { Toast } from '../Toast/Toast';

const AddContractHrPortalModal = ({ open, onClose, endPoint }) => {
  const [contractFormValues, setContractFormValues] = useState({});
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const url = endPoint;
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(`${url}`, formData);
      // return [];
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Contract posted successfully');
      console.log({ data, values, contractFormValues });
      dispatch(
        addOffShoreContract({
          ...contractFormValues,
          download: 'Download',
          action: ['Delete'],
          contract_doc: data?.contract_doc,
          id: data.id,
        })
      );
      handleCloseModal();
      setContractFormValues(null);
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
      date: null,
    },
    validationSchema: OffShContractFormHrPortalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      const tempVals = {
        ...formValues,
        date: dayjs(formValues.date).format('YYYY-MM-DD'),
      };
      setContractFormValues(tempVals);
      mutate(tempVals);
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
          maxWidth: '850px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: 'auto',
          maxHeight: '90%',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
          '&::-webkit-scrollbar': {
            display: 'none',
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
              px: '10px',
            }}
          >
            {CONTRACT_SIGNED?.contractForm}
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
              padding: { xs: '30px 20px', lg: '50px 80px' },
            }}
          >
            {contractFormHrPortal?.map(
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
                      accept={accept}
                      filelabel={filelabel}
                    />
                  </Grid>
                  {formIndex % 2 === 0 && <Grid item xs={12} lg={2}></Grid>}
                </>
              )
            )}
            <Grid item p={'0 10px'} xs={12}>
              <Button
                sx={{
                  minWidth: '120px',
                  mt: '25px',
                }}
                variant="contained"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  CONTRACT_SIGNED?.submit
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default AddContractHrPortalModal;
