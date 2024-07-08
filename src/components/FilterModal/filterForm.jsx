import React, { useState } from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';

import { useFormik } from 'formik';
import FormInput from '../form/ui-elements/FormInput';
import { FILTER } from '@/src/constants/filter';
import ResetButton from './resetButton';
import { api } from '@/src/services/apiService';
import { EMP_TIME_SHEET } from '@/src/services/apiService/apiEndPoints';
import {
  getTimeSheetData,
  getTimeSheetDataFailed,
  getTimeSheetDataSuccess,
} from '@/src/redux/slices/employeeSlices/timeSheetSlice';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { convertDateFormat, getAttendenceShortHand } from '@/src/utils/helpers';
import { filterModalSchema } from '../form/schemas/filterModal';
import { onCheckDateValidation } from '@/src/utils/onCheckDateValidation';

const FilterFormModal = ({
  open,
  onClose,
  filterForm,
  url,
  dispatchFunction,
}) => {
  const [filterFormValues, setfilterFormValues] = useState(null);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const dispatch = useDispatch();
  // function isWithinRange(timeStr, startTimeStr, endTimeStr) {
  //   const time = new Date('1970-01-01 ' + timeStr);
  //   const startTime = new Date('1970-01-01 ' + startTimeStr);
  //   const endTime = new Date('1970-01-01 ' + endTimeStr);
  //   return time >= startTime && time <= endTime;
  // }
  const { mutate } = useMutation({
    mutationFn: async (args) => {
      dispatch(getTimeSheetData());
      let endpoint;
      if (url) {
        endpoint = `${url}&from=${args.from}&to=${args.to}`;
      } else {
        endpoint = `${EMP_TIME_SHEET}?workspace=${currentWorkSpace?.email || ''}&from=${
          args.from
        }&to=${args.to}`;
      }
      return api.getData(endpoint);
    },
    onSuccess: ({ data }) => {
      if (url) {
        dispatchFunction(
          data,
          getAttendenceShortHand(filterFormValues?.attendanceStatus),
          filterFormValues?.checkIn,
          filterFormValues?.checkOut
        );
      } else {
        // const newData =
        //   data === '' || !Object.keys(data?.time_sheet)?.length
        //     ? []
        //     : Object.entries(data?.time_sheet)?.map((item) => ({
        //         ...item[1],
        //         day: dayjs(convertDateFormat(item[0])).format('dddd'),
        //         status: Object.entries(item[1]?.status)
        //           ?.map((st) => {
        //             if (!st[1]) return;
        //             else return getAttendenceShortHand(st[0]);
        //           })
        //           .filter((el) => el !== undefined),
        //         date: convertDateFormat(item[0]),
        //         action: ['View'],
        //         attendenceShortHand: true,
        //         actionStatus: true,
        //       }));
        const newData1 =
          data === '' || !Object.keys(data?.time_sheet)?.length
            ? []
            : Object.entries(data?.time_sheet)
                ?.map((item) => ({
                  ...item[1],
                  day: dayjs(convertDateFormat(item[0])).format('dddd'),
                  status: Object.entries(item[1]?.status)
                    ?.map((st) => {
                      if (!st[1]) return;
                      else return getAttendenceShortHand(st[0]);
                    })
                    .filter((el) => el !== undefined),
                  longStatus: Object.entries(item[1]?.status)
                    ?.map((st) => {
                      if (!st[1]) return;
                      else return st[0];
                    })
                    .filter((el) => el !== undefined),
                  date: convertDateFormat(item[0]),
                  action: ['View'],
                  attendenceShortHand: true,
                  actionStatus: true,
                }))
                .filter((el) => {
                  if (values?.attendanceStatus) {
                    return el.longStatus.includes(values?.attendanceStatus);
                  }
                  if (values?.checkinTimeFrom || values?.checkinTimeTo) {
                    const checkInTime = dayjs(el.check_in, 'HH:mm');
                    return checkInTime.isBetween(
                      dayjs(values.checkinTimeFrom, 'HH:mm'),
                      dayjs(values?.checkinTimeTo, 'HH:mm'),
                      null,
                      '[)'
                    );
                  } else return el;
                });

        const isWithinRange = (timeStr, startTimeStr, endTimeStr) => {
          const time = new Date('1970-01-01 ' + timeStr);
          const startTime = new Date('1970-01-01 ' + startTimeStr);
          const endTime = new Date('1970-01-01 ' + endTimeStr);
          return time >= startTime && time <= endTime;
        };
        const filteredData = newData1.filter(
          (record) =>
            isWithinRange(
              record.check_in,
              filterFormValues.checkIn.from,
              filterFormValues.checkIn.to
            ) &&
            isWithinRange(
              record.check_out,
              filterFormValues.checkOut.from,
              filterFormValues.checkOut.to
            )
        );
        dispatch(
          getTimeSheetDataSuccess({
            ...data,
            time_sheet: {
              ...data.time_sheet,
              record: filteredData,
            },
          })
        );
      }
    },
    onError: (err) => {
      dispatch(getTimeSheetDataFailed());
      console.log({ err });
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const resetMutation = useMutation({
    mutationFn: async () => {
      dispatch(getTimeSheetData());
      let endpoint;
      if (url) {
        endpoint = `${url}`;
      } else {
        endpoint = `${EMP_TIME_SHEET}?workspace=${currentWorkSpace?.email || ''}`;
      }
      return api.getData(endpoint);
    },
    onSuccess: ({ data }) => {
      if (url) {
        dispatchFunction(
          data,
          filterFormValues &&
            getAttendenceShortHand(filterFormValues?.attendanceStatus),
          filterFormValues?.checkIn,
          filterFormValues?.checkOut
        );
      } else {
        // const newData =
        //   data === '' || !Object.keys(data?.time_sheet)?.length
        //     ? []
        //     : Object.entries(data?.time_sheet)?.map((item) => ({
        //         ...item[1],
        //         day: dayjs(convertDateFormat(item[0])).format('dddd'),
        //         status: Object.entries(item[1]?.status)
        //           ?.map((st) => {
        //             if (!st[1]) return;
        //             else return getAttendenceShortHand(st[0]);
        //           })
        //           .filter((el) => el !== undefined),
        //         date: convertDateFormat(item[0]),
        //         action: ['View'],
        //         attendenceShortHand: true,
        //         actionStatus: true,
        //       }));
        const newData1 =
          data === '' || !Object.keys(data?.time_sheet)?.length
            ? []
            : Object.entries(data?.time_sheet)
                ?.map((item) => ({
                  ...item[1],
                  day: dayjs(convertDateFormat(item[0])).format('dddd'),
                  status: Object.entries(item[1]?.status)
                    ?.map((st) => {
                      if (!st[1]) return;
                      else return getAttendenceShortHand(st[0]);
                    })
                    .filter((el) => el !== undefined),
                  longStatus: Object.entries(item[1]?.status)
                    ?.map((st) => {
                      if (!st[1]) return;
                      else return st[0];
                    })
                    .filter((el) => el !== undefined),
                  date: convertDateFormat(item[0]),
                  action: ['View'],
                  attendenceShortHand: true,
                  actionStatus: true,
                }))
                .filter((el) => {
                  if (values?.attendanceStatus) {
                    return el.longStatus.includes(values?.attendanceStatus);
                  }
                  if (values?.checkinTimeFrom || values?.checkinTimeTo) {
                    const checkInTime = dayjs(el.check_in, 'HH:mm');
                    return checkInTime.isBetween(
                      dayjs(values.checkinTimeFrom, 'HH:mm'),
                      dayjs(values?.checkinTimeTo, 'HH:mm'),
                      null,
                      '[)'
                    );
                  } else return el;
                });
        const isWithinRange = (timeStr, startTimeStr, endTimeStr) => {
          const time = new Date('1970-01-01 ' + timeStr);
          const startTime = new Date('1970-01-01 ' + startTimeStr);
          const endTime = new Date('1970-01-01 ' + endTimeStr);
          return time >= startTime && time <= endTime;
        };
        const filteredData = newData1.filter(
          (record) =>
            isWithinRange(
              record.check_in,
              filterFormValues.checkIn.from,
              filterFormValues.checkIn.to
            ) &&
            isWithinRange(
              record.check_out,
              filterFormValues.checkOut.from,
              filterFormValues.checkOut.to
            )
        );
        dispatch(
          getTimeSheetDataSuccess({
            ...data,
            time_sheet: {
              ...data.time_sheet,
              record: filteredData,
            },
          })
        );
      }
    },
    onError: (err) => {
      dispatch(getTimeSheetDataFailed());
      console.log({ err });
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
    setValues,
  } = useFormik({
    initialValues: {
      from: null,
      to: null,
    },
    validationSchema: filterModalSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      if (
        formValues?.from === 'Invalid Date' ||
        formValues?.to === 'Invalid Date'
      ) {
        setErrors(onCheckDateValidation(formValues));
      } else {
        setfilterFormValues(formValues);
        mutate({
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
  const handleClickReset = () => {
    setValues({
      from: null,
      to: null,
      checkIn: {
        from: '',
        to: '',
      },
      checkOut: {
        from: '',
        to: '',
      },
    });
    setErrors({});
    resetMutation.mutate();
  };
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
            overflowY: { xs: 'auto', md: 'auto' },
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

                      // searchable,
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
                          // searchable={searchable}
                          sm={12}
                          md={12}
                          lg={12}
                          fieldsName={fieldsName}
                          setValues={setValues}
                        />
                      </Grid>
                    </>
                  )
                )}
                <Grid
                  item
                  sx={{
                    p: { xs: '50px 10px', sm: '100px 10px', md: '100px 10px' },
                  }}
                  xs={12}
                >
                  <ResetButton handleReset={handleClickReset} />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default FilterFormModal;
