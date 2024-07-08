import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { leaveManagementFormSchema } from '@/src/components/form/schemas/leaveManagementModal';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { leaveManagementForm } from '@/src/constants/data/forms/leave-management-modal';
import { FORM_DATA } from '@/src/constants/form';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_EMP_TIME_AND_LEAVES } from '@/src/services/apiService/apiEndPoints';
import { useState } from 'react';
import {
  updateEmpLeaves,
  updateEmpLeavesRequest,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '@/src/components/Toast/Toast';

const LeaveManagementModal = ({ open, onClose }) => {
  const { leaves } = useSelector(
    (state) => state?.hr?.employees?.timeAndLeaves
  );
  const { id } = useSelector((state) => state?.hr?.employees?.currentEmployee);
  const [newLeavesArray, setNewLeavesArray] = useState(null);
  const getLeave = (type) => {
    const leaveIndex = leaves?.findIndex((e) => e?.leave_type === type);
    return leaves?.[leaveIndex]?.total;
  };
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formVals) => {
      dispatch(updateEmpLeavesRequest());
      return api.updateJSONData(
        `${HR_EMP_TIME_AND_LEAVES}?id=${id}&tab=leaves`,
        formVals
      );
    },
    onSuccess: () => {
      Toast('success', 'Leaves updates successfully');
      dispatch(updateEmpLeaves(newLeavesArray));
      // setNewTimeArray(null);
      // setIsOpenSavePolicies(false);
      onClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to post data');
      // console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const objectifiedData = (data, newVals) => {
    const transformedData = {};

    data.forEach((item) => {
      transformedData[item.leave_type] = {
        total: newVals[item.leave_type],
        availed: item.availed,
        balance: item.balance - (item.total - newVals[item.leave_type]),
        status: item.status.toLowerCase() === 'enabled' ? 'enable' : 'disable',
      };
    });

    return transformedData;
  };
  const reformData = (dataObj) => {
    const arrayfiedData = Object.entries(dataObj);
    const refinedData = [];
    for (let i = 0; i < arrayfiedData.length; i++) {
      const element = arrayfiedData[i];
      refinedData.push({
        ...element[1],
        leave_type: element[0],
        total: +element[1].total,
        availed: +element[1].availed,
        balance: +element[1].balance,
        status: element[1].status == 'enable' ? 'Enabled' : 'Disabled',
      });
    }
    console.log({ arrayfiedData, dataObj, refinedData });
    return refinedData;
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
      annual_leaves: getLeave('annual_leaves'),
      unpaid_leaves: getLeave('unpaid_leaves'),
      paid_leaves: getLeave('paid_leaves'),
      hajj_leaves: getLeave('hajj_leaves'),
      sick_leaves: getLeave('sick_leaves'),
      casual_leaves: getLeave('casual_leaves'),
    },
    validationSchema: leaveManagementFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({
        formValues,
        leaves,
        vals: objectifiedData(leaves, formValues),
        reformed: reformData(objectifiedData(leaves, formValues)),
      });
      setNewLeavesArray(reformData(objectifiedData(leaves, formValues)));
      mutate(objectifiedData(leaves, formValues));
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    onClose();
  };
  const getMin = (name) => {
    const leaveIndex = leaves?.findIndex((e) => e?.leave_type === name);
    return leaves?.[leaveIndex]?.availed;
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
            {FORM_DATA?.leaveManagement}
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
            {leaveManagementForm?.map(
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
                  max,
                },
                formIndex
              ) => (
                <>
                  <Grid item xs={12} lg={5} key={formIndex}>
                    <FormInput
                      max={max}
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
                      sm={12}
                      md={12}
                      lg={12}
                      fields={fields}
                      min={getMin(name)}
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

export default LeaveManagementModal;
