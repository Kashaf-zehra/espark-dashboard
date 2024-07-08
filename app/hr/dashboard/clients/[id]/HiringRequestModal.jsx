import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { hiringRequestSchema } from '@/src/components/form/schemas/hiringRequestForm';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { hringRequestForm } from '@/src/constants/data/forms/hiring-request';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_CLIENT_EMP_HIRING_REQUEST } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';
import { Toast } from '@/src/components/Toast/Toast';
import { addHiringRequest } from '@/src/redux/slices/hrSlices/clientSlice';

const HiringRequestModal = ({ open, onClose }) => {
  const { client_perms } =
    useSelector((state) => state?.hr?.home?.homeData) || {};
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const [hiringValues, setHiringValues] = useState(null);
  const { role } = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      return api.postJSONData(`${HR_CLIENT_EMP_HIRING_REQUEST}`, formVals);
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data posted successfully');
      console.log({ data, values, hiringValues });
      dispatch(
        addHiringRequest({
          ...hiringValues,
          salary_range: `${hiringValues?.salary_range?.minimum}$ - ${hiringValues?.salary_range?.maximum}$`,
          id: data.id,
          action:
            role === 'super_admin' ||
            (role !== 'super_admin' && client_perms?.[0]?.write)
              ? ['Delete']
              : ['-'],
        })
      );
      handleCloseModal();
      setHiringValues(null);
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      console.log({ err, errm: err.message, name: err.name, stack: err.stack });
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
      hiring_end_date: null,
      hiring_start_date: null,
    },
    validationSchema: hiringRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      const finalData = {
        ...formValues,
        hiring_start_date: dayjs(formValues.hiring_start_date).format(
          'YYYY-MM-DD'
        ),
        hiring_end_date: dayjs(formValues.hiring_end_date).format('YYYY-MM-DD'),
        client_id: email,
        salary_range: {
          minimum: formValues?.salary_range.minimum,
          maximum: formValues?.salary_range.maximum,
        },
      };
      setHiringValues(finalData);
      mutate({
        ...finalData,
        // salary_range: `${finalData.salary_range.minimum}$ - ${finalData.salary_range.maximum}$`,
        // salary_range: {
        //   minimum: finalData.salary_range.minimum,
        //   maximum: finalData.salary_range.maximum,
        // },
      });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  // console.log({ values, errors });
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
              ml: '10px',
            }}
          >
            Hiring request form
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
            {hringRequestForm?.map(
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

export default HiringRequestModal;
