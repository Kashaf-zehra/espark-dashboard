import React, { useState } from 'react';
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
import { uploadPolicyFormSchema } from '../form/schemas/uploadPolicy';
import { uploadPolicyForm } from '@/src/constants/data/forms/upload-policy';
import { UPLOAD_POLICY } from '@/src/constants/uploadPolicy';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_POLICY } from '@/src/services/apiService/apiEndPoints';
import { useDispatch } from 'react-redux';
import { addPolicy } from '@/src/redux/slices/hrSlices/policy';
import { Toast } from '../Toast/Toast';

const UploadPolicyModal = ({ open, onClose }) => {
  const [policyFormVal, setPolicyFormVal] = useState(null);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(HR_POLICY, formData);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Policy posted successfully');
      dispatch(
        addPolicy({
          ...policyFormVal,
          action: ['Delete'],
          actionStatus: true,
          employee: ['DisabledCheck', 'EnabledCheck', false],
          client: ['DisabledCheck', 'EnabledCheck', false],
          isSelected: false,
          isModulePermissionData: true,
          isPolicyData: true,
          id: data.id,
        })
      );
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
  } = useFormik({
    initialValues: {},
    validationSchema: uploadPolicyFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      setPolicyFormVal(formValues);
      mutate(formValues);
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
          // width: { xs: '90%', sm: '90%', md: '25%' },
          maxWidth: '500px',
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
            {UPLOAD_POLICY?.uploadPolicy}
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
            <Box component="img" src="/icons/Close.svg" />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 80px' },
              '@media (min-width: 120px) and (max-width: 1600px)': {
                p: '15px',
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {uploadPolicyForm?.map(
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
                  <Grid item xs={12} lg={12} key={formIndex}>
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
                sx={{ minWidth: '120px', fontSize: '16px' }}
                variant="contained"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  UPLOAD_POLICY?.upload
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default UploadPolicyModal;
