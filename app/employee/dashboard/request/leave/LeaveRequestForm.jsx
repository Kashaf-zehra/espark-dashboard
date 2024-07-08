import React, { useEffect } from 'react';
import WideFormInput from '../../../../../src/components/form/ui-elements/WideFormInput';
import { Box, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { createLeaveRequestForm } from '@/src/constants/data/forms/create-leave-request';
import { createLeaveRequestSchema } from '@/src/components/form/schemas/createLeaveRequest';
import { useMutation } from '@tanstack/react-query';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  pascalToSnake,
  snakeToPascalCase,
} from '@/src/utils/stringModification';
import {
  createEmpLeaveRequest,
  createEmpLeaveRequestFailed,
  createEmpLeaveRequestSuccess,
  fetchEmpLeaveRequestData,
  getEmpLeaveRequestDataFailed,
  getEmpLeaveRequestDataSuccess,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';
import { Toast } from '@/src/components/Toast/Toast';

const LeaveRequestForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { empDetails } = useSelector((state) => state?.auth?.userData);
  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const { balance } = useSelector((state) => state?.emp?.leaveReq?.data);
  const getRevampedValues = (vals) => ({
    employee_id: empDetails?.employee_id,
    employee_name: empDetails?.employee_name,
    department: empDetails?.job_title,
    leave_type: vals?.leaveType?.label.split(' ')[0].toLowerCase(),
    requested_at: dayjs().format('YYYY-MM-DD hh:mm A'),
    count: vals?.count,
    status: 'pending',
    start_date: dayjs(vals?.startDate).format('YYYY-MM-DD'),
    end_date: dayjs(vals?.endDate).format('YYYY-MM-DD'),
    reason: vals?.reason,
  });
  const reformData = (dataObj) => {
    const arrayfiedData = Object.entries(dataObj);
    const refinedData = [];
    for (let i = 0; i < arrayfiedData.length; i++) {
      const element = arrayfiedData[i];
      if (i > 0) {
        if (element[1].status !== 'disable') {
          refinedData.push({
            leave_type:
              element[0] === 'hajj_leaves' ? 'hajj_/_umrah_leaves' : element[0],
            ...element[1],
          });
        }
      }
    }
    return refinedData;
  };

  const refreshMutation = useMutation({
    mutationFn: async () => {
      dispatch(fetchEmpLeaveRequestData());
      return api.getData(
        `${EMP_LEAVE_REQUEST}/?workspace=${currentWorkSpace?.email || ''}`
      );
    },
    onSuccess: ({ data }) => {
      const tempData = {
        ...data,
        balance: reformData(data?.balance),
        requests: data?.requests?.length
          ? data?.requests?.map((item) => ({
              ...item,
              requested_at: dayjs(item?.requested_at).format(
                'YYYY-MM-DD hh:mm A'
              ),
            }))
          : [],
      };
      dispatch(getEmpLeaveRequestDataSuccess(tempData));
      console.log(tempData, 'tempData invoked');
      return data;
    },
    onError: (err) => {
      console.log(err.message, 'error invoked');
      dispatch(getEmpLeaveRequestDataFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      dispatch(createEmpLeaveRequest());
      const formData = new FormData();
      for (const key in formVals) {
        formData.append(key, formVals[key]);
      }
      return api.postData(EMP_LEAVE_REQUEST, formData);
    },
    onSuccess: (data) => {
      Toast('success', 'Data posted successfully');
      dispatch(
        createEmpLeaveRequestSuccess({
          ...getRevampedValues(values),
          id: data.id,
          // department: '-',
        })
      );
      handleClose();
      refreshMutation.mutate();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      dispatch(createEmpLeaveRequestFailed());
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
  } = useFormik({
    initialValues: {},
    validationSchema: createLeaveRequestSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log('formValue', formValues);

      const revampFormValues = {
        client_id: currentWorkSpace?.email,
        leave_type: formValues?.leaveType?.label.split(' ')[0].toLowerCase(),
        start_date: dayjs(formValues?.startDate).format('YYYY-MM-DD'),
        end_date: dayjs(formValues?.endDate).format('YYYY-MM-DD'),
        reason: formValues?.reason,
        attachment: formValues?.attachment,
        count: formValues?.count,
      };
      mutate(revampFormValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const getAvailableLeaves = (type) => {
    if (balance?.length) {
      const leavedata = balance.find((el) =>
        el.leave_type.includes(pascalToSnake(type))
      );
      return leavedata?.balance;
    }
  };
  const getOptions = () => {
    console.log({ balance });
    const tempOptions = balance?.map((item) => {
      console.log({ item });
      return {
        label: snakeToPascalCase(item?.leave_type),
        disabled: +item?.balance < 1 ? true : false,
      };
    });
    return tempOptions;
  };
  useEffect(() => {
    if (values?.leaveType?.label) {
      setFieldValue(
        'availableLeaves',
        getAvailableLeaves(values.leaveType.label)
      );
    }
  }, [values.leaveType]);

  const isDateDisabled = () => {
    if (!values['leaveType']) return true;
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box
          sx={{
            padding: { xs: '20px', sm: '26px', md: '28px' },
          }}
        >
          {createLeaveRequestForm?.map(
            (
              {
                title,
                placeholder,
                name,
                suffixIcon,
                type,
                required,
                hideSuffix,
                disabled,
                minDate,
                searchable,
              },
              formIndex
            ) => {
              return (
                <WideFormInput
                  key={formIndex}
                  title={title}
                  placeholder={placeholder}
                  suffixIcon={suffixIcon}
                  type={type}
                  required={required}
                  hideSuffix={hideSuffix}
                  disabled={
                    name === 'startDate' || name === 'endDate'
                      ? isDateDisabled()
                      : disabled
                  }
                  options={getOptions()}
                  darkBack={!(formIndex % 2)}
                  name={name}
                  setFieldValue={setFieldValue}
                  value={values[name]}
                  error={errors[name]}
                  touched={touched}
                  setFieldError={setFieldError}
                  errors={errors}
                  setErrors={setErrors}
                  values={values}
                  minDate={minDate}
                  searchable={searchable}
                />
              );
            }
          )}
        </Box>
      </Box>
      <Box
        display={'flex'}
        sx={{
          padding: '20px 40px',
          marginBottom: '15px',
          justifyContent: { xs: 'center', sm: 'flex-end' },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            ml: { xs: 0, sm: '20px' },
            width: '120px',
            border: '1px solid #029894',
            background: '#FFF',
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            ml: '20px',
            width: '120px',
            '&:hover': {
              background: '#029894',
            },
          }}
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
      </Box>
    </form>
  );
};

export default LeaveRequestForm;
