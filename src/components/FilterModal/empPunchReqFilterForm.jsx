import React from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { FILTER } from '@/src/constants/filter';
import ResetButton from './resetButton';
import { api } from '@/src/services/apiService';
import { EMP_PUNCH_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { empPunchReqfilterModalSchema } from '../form/schemas/empPunchReqfilterModal';
import {
  fetchEmpPunchRequestData,
  getEmpPunchRequestDataFailed,
  getEmpPunchRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/punchRequestSlice';
import { Toast } from '../Toast/Toast';
import { onCheckDateValidation } from '@/src/utils/onCheckDateValidation';
// import { filterModalSchema } from '../form/schemas/filterModal';

const EmpPunchReqFilterFormModal = ({ open, onClose, filterForm }) => {
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (args) => {
      dispatch(fetchEmpPunchRequestData());
      return api.getData(
        `${EMP_PUNCH_REQUEST}?workspace=${
          currentWorkSpace?.email || ''
        }&tab=${args.status.toLowerCase()}&from=${args.from}&to=${args.to}`
      );
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      dispatch(
        getEmpPunchRequestDataSuccess(
          data || {
            requests: [],
            pending: 0,
            completed: 0,
            rejected: 0,
            all: 0,
          }
        )
      );
    },
    onError: (err) => {
      dispatch(getEmpPunchRequestDataFailed());
      Toast('error', err?.message || 'Failed to fetch data');
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
    setValues,
  } = useFormik({
    initialValues: {
      from: null,
      to: null,
    },
    validationSchema: empPunchReqfilterModalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      if (
        formValues?.from === 'Invalid Date' ||
        formValues?.to === 'Invalid Date'
      ) {
        setErrors(onCheckDateValidation(formValues));
      } else {
        mutate({
          status: formValues.status.label,
          from: dayjs(formValues?.from).format('YYYY-MM-DD'),
          to: dayjs(formValues?.to).format('YYYY-MM-DD'),
        });
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  const resetMutation = useMutation({
    mutationFn: async () => {
      // dispatch(getTimeSheetData());
      return api.getData(
        `${EMP_PUNCH_REQUEST}/?workspace=${currentWorkSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      dispatch(
        getEmpPunchRequestDataSuccess(
          data || {
            requests: [],
            pending: 0,
            completed: 0,
            rejected: 0,
            all: 0,
          }
        )
      );
    },
    onError: (err) => {
      dispatch(getEmpPunchRequestDataFailed());
      Toast('error', err?.message || 'Failed to fetch data');
    },
  });

  const handleClickReset = () => {
    setValues({
      from: null,
      to: null,
    });
    setErrors({});
    resetMutation.mutate();
  };
  console.log({ errors, values });
  return (
    <Modal
      data-aos="fade-left"
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
          width: { xs: '300px', sm: '330px', md: '350px' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          height: '100%',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '0px',
          position: 'absolute',
          right: '0px',
          '@media (min-width: 270px) and (max-width: 320px)': {
            width: '260px',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #E4E4E4',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '0px',
            p: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            background: '#029E9C',
          }}
        >
          <Box
            sx={{
              width: { xs: '35px', md: '50px' },
              height: { xs: '35px', md: '50px' },
              cursor: 'pointer',
            }}
            src="/images/filter/back.svg"
            component={'img'}
            onClick={onClose}
          />
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              marginLeft: '10px',
              color: '#fff',
            }}
          >
            {FILTER?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            overflowY: { xs: 'auto', md: 'hidden' },
            scrollbarWidth: 'thin',
            scrollbarColor: 'green',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            sx={{
              py: '22px',
              px: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', md: '20px' },
              width: '100%',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container>
                {filterForm?.map(
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
                      fieldsName,

                      searchable,
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
                          searchable={searchable}
                          sm={12}
                          md={12}
                          lg={12}
                          fieldsName={fieldsName}
                        />
                      </Grid>
                    </>
                  )
                )}
                <Grid
                  item
                  sx={{
                    p: { xs: '150px 10px', sm: '200px 10px', md: '200px 10px' },
                  }}
                  xs={12}
                >
                  <ResetButton
                    // handleReset={() => resetMutation.mutate()}
                    handleReset={handleClickReset}
                    isLoadingReset={resetMutation.isPending}
                    isLoadingSubmit={isPending}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default EmpPunchReqFilterFormModal;
