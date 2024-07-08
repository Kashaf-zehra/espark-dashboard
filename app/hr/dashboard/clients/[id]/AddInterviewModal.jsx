import { addNewInterviewFormSchema } from '@/src/components/form/schemas/addNewInterviewForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { Toast } from '@/src/components/Toast/Toast';
import { addNewInterviewForm } from '@/src/constants/data/forms/add-new-interview';
import { FORM_DATA } from '@/src/constants/form';
import { addInterviewSchedule } from '@/src/redux/slices/hrSlices/clientSlice';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_INTERVIEW_SCHEDULE } from '@/src/services/apiService/apiEndPoints';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddInterviewModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const [interviewFormValues, setInterviewFormValues] = useState(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}`, formVals);
    },
    onSuccess: ({ data }) => {
      console.log({ data, interviewFormValues });
      Toast('success', 'Data posted successfully');
      dispatch(
        addInterviewSchedule({
          ...interviewFormValues,
          id: data.id,
          status: 'pending',
          action: ['Delete'],
        })
      );
      setInterviewFormValues(null);
      handleCloseModal();
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
    validationSchema: addNewInterviewFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        interview_date_time: dayjs(formValues.hiring_start_date).format(
          'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
        ),
        client_id: email,
      };
      console.log({ finalData });
      setInterviewFormValues(finalData);
      mutate(finalData);
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
            Interview schedule form
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
            <Box component="img" src="/icons/Close.svg" sx={{}} />
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            sx={{
              padding: { xs: '10px 20px', lg: '41px 100px' },
            }}
          >
            {addNewInterviewForm?.map(
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

export default AddInterviewModal;
