import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { timeManagementFormSchema } from '@/src/components/form/schemas/timeManagementModal';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { timeManagementForm } from '@/src/constants/data/forms/time-management-modal';
import { useFormik } from 'formik';
import { FORM_DATA } from '@/src/constants/form';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_EMP_TIME_AND_LEAVES } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Toast } from '@/src/components/Toast/Toast';
import {
  updateEmpTime,
  updateEmpTimeRequest,
} from '@/src/redux/slices/hrSlices/employeeSlice';

const TimeManagementModal = ({ open, onClose }) => {
  const [check_in, setCheck_in] = useState(null);
  const [check_out, setCheck_out] = useState(null);
  const [newTimeArray, setNewTimeArray] = useState(null);
  const { time } = useSelector((state) => state?.hr?.employees?.timeAndLeaves);
  const { id } = useSelector((state) => state?.hr?.employees?.currentEmployee);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      dispatch(updateEmpTimeRequest());
      return api.updateJSONData(
        `${HR_EMP_TIME_AND_LEAVES}?id=${id}&tab=time`,
        formVals
      );
    },
    onSuccess: () => {
      Toast('success', 'Time updated successfully');
      dispatch(updateEmpTime(newTimeArray));
      setNewTimeArray(null);
      // setIsOpenSavePolicies(false);
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
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
      check_in: time?.[0]?.['check_in'],
      check_out: time?.[0]?.['check_out'],
    },
    validationSchema: timeManagementFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      setNewTimeArray([
        {
          check_in: dayjs(formValues.check_in).format('hh:mm a'),
          check_out: dayjs(formValues.check_out).format('hh:mm a'),
        },
      ]);
      const temp = {
        check_in: dayjs(formValues.check_in).format('hh:mm a'),
        check_out: dayjs(formValues.check_out).format('hh:mm a'),
      };
      console.log({ temp });
      mutate({ ...temp });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  function convert12to24(time12h) {
    const [time, modifier] = time12h?.split(' ') || {};

    let hours = time.split(':')[0];
    const minutes = time.split(':')[1];

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }
  useEffect(() => {
    setCheck_in(convert12to24(values['check_in']));
    setCheck_out(convert12to24(values['check_out']));
  }, [time]);

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
              ml: '15px',
            }}
          >
            {FORM_DATA?.timeManagement}
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
              padding: { xs: '10px 20px', xl: '41px 100px' },
            }}
          >
            {timeManagementForm?.map(
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
                      // value={dayjs(convert12to24(values[name]))}
                      value={dayjs(
                        `2000-01-01T${name === 'check_in' ? check_in : check_out}`
                      )}
                      error={errors[name]}
                      touched={touched}
                      setFieldError={setFieldError}
                      errors={errors}
                      setErrors={setErrors}
                      values={values}
                      nested={nested}
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
                  'Save'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default TimeManagementModal;
