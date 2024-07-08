import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { contractFormHrPortalSchema } from '@/src/components/form/schemas/contractSignedForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { employeeContractForm } from '@/src/constants/data/forms/contract';
import { useFormik } from 'formik';
import { CONTRACT_SIGNED } from '@/src/constants/contractSigned';
import { FORM_DATA } from '@/src/constants/form';
import { useMutation } from '@tanstack/react-query';
import { HR_COMPANY_CONTRACTS } from '@/src/services/apiService/apiEndPoints';
import { Toast } from '@/src/components/Toast/Toast';
import { api } from '@/src/services/apiService';
import { getEmployeesCompanyContractRequestSuccess } from '@/src/redux/slices/hrSlices/contractSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const EmployeeContractModal = ({ open, onClose }) => {
  const companyContractSignedMutation = useMutation({
    mutationFn: async (status) => {
      return api.getData(`${HR_COMPANY_CONTRACTS}?status=${status}`);
    },
    onSuccess: ({ data }) => {
      const tempData =
        data === ''
          ? []
          : data?.map((item) => ({
              ...item,
              download: 'Download',
              action: ['Delete'],
              contract_doc: item.contract_doc,
            }));
      dispatch(getEmployeesCompanyContractRequestSuccess(tempData));
    },
    onError: (err) => {
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      // console.log({ formValues });
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(`${HR_COMPANY_CONTRACTS}?status=employee`, formData);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Contract uploaded successfully');
      companyContractSignedMutation.mutate('employees');
      setFormData(null);
      resetForm();
      console.log({ data });
      onClose();
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
    resetForm,
  } = useFormik({
    initialValues: {
      date: null,
    },
    validationSchema: contractFormHrPortalSchema,
    enableReinitialize: true,
    onSubmit: (formData) => {
      console.log({ formData });
      setFormData(formData);
      mutate({ ...formData, date: dayjs(formData.date).format('YYYY-MM-DD') });
      // handleCloseModal();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
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
              ml: '10px',
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
              padding: { xs: '30px 20px', lg: '41px 60px' },
            }}
          >
            {employeeContractForm?.map(
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
                  <Grid item xs={12} md={12} lg={5} key={formIndex}>
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
                      handleData={handleData}
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
                sx={{ minWidth: '120px' }}
                variant="contained"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  FORM_DATA?.submit
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EmployeeContractModal;
