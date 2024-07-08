import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { uploadOthInvoiceFormSchema } from '@/src/components/form/schemas/uploadInvoice';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { uploadOtherInvoiceForm } from '@/src/constants/data/forms/upload-invoice';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_OTHER_INVOICE } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';
import { Toast } from '@/src/components/Toast/Toast';
import { addOthInvoice } from '@/src/redux/slices/hrSlices/clientSlice';

const UploadOtherInvoiceModal = ({ open, onClose, title }) => {
  const { invoices_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { role } = useSelector((state) => state?.auth?.userData);
  const [othInvoiceFormValues, setOthInvoiceFormValues] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(HR_CLIENT_OTHER_INVOICE, formData);
    },
    onSuccess: ({ data }) => {
      console.log({ data, othInvoiceFormValues });
      Toast('success', 'Data posted successfully');
      dispatch(
        addOthInvoice({
          data: {
            ...othInvoiceFormValues,
            action:
              role === 'super_admin' ||
              (role !== 'super_admin' && invoices_perms?.[0]?.write)
                ? ['Delete']
                : ['-'],
            id: data.id,
            invoice: data?.invoice,
            download: 'Download',
          },
          type: othInvoiceFormValues.payment_status,
        })
      );
      setOthInvoiceFormValues(null);
      handleCloseModal();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

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
      invoice_date: null,
      due_date: null,
    },

    validationSchema: uploadOthInvoiceFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        due_date: dayjs(formValues.due_date).format('YYYY-MM-DD'),
        invoice_date: dayjs(formValues.invoice_date).format('YYYY-MM-DD'),
        client_id: email,
        payment_status: 'pending',
      };
      setOthInvoiceFormValues(finalData);
      mutate(finalData);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
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
          // width: { xs: '90%', sm: '90%', md: '50%' },
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
            }}
          >
            {title || 'Other invoice form'}
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
            {uploadOtherInvoiceForm?.map(
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

export default UploadOtherInvoiceModal;
