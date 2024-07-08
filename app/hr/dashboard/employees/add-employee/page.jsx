'use client';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-employee';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  addEmployeeFormData,
  clearEmployeeFormData,
  removeAddEmpForm,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { HR_ADD_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { useRouter } from 'next/navigation';
import { Toast } from '@/src/components/Toast/Toast';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { addEmployeeForm } = useSelector((state) => state.hr?.employees);
  // useEffect(() => {
  //   if (employee_perms[0].write) return;
  //   else {
  //     router.push('/hr/dashboard/employees');
  //   }
  // }, [employee_perms]);

  const handleGoNext = () => {
    if (currentStep === formSteps.length) return;
    setCurrentStep((ps) => ps + 1);
  };
  const handleGoPrev = () => {
    if (currentStep === 1) return;
    setCurrentStep((ps) => ps - 1);
  };
  const defaultValues = {
    ...addEmployeeForm,
    dob: addEmployeeForm?.dob || null,
    joining_date: addEmployeeForm?.joining_date || null,
    annual_leaves: addEmployeeForm?.annual_leaves || 0,
    unpaid_leaves: addEmployeeForm?.unpaid_leaves || 0,
    paid_leaves: addEmployeeForm?.paid_leaves || 0,
    hajj_leaves: addEmployeeForm?.hajj_leaves || 0,
    sick_leaves: addEmployeeForm?.sick_leaves || 0,
    casual_leaves: addEmployeeForm?.casual_leaves || 0,
    country: addEmployeeForm?.country || {
      flag: 'https://flagcdn.com/pk.svg',
      title: 'Pakistan',
    },
  };
  const getFinalData = (values) => ({
    first_name: values.first_name,
    last_name: values.last_name,
    gender: values.gender,
    dob: dayjs(values.dob).format('YYYY-MM-DD'),
    phone_number: values.phone_number,
    email: values.email.trim().toLowerCase(),
    marital_status: values.marital_status,
    image: values.image,
    emergency_no: values.emergency_no,
    resume: values.resume,
    emergency_contact: JSON.stringify({
      primary: {
        name: values.name1,
        relation: values.relation1,
        phone_number: values.phoneNumber1,
      },
      secondary: {
        name: values.name2,
        relation: values.relation2,
        phone_number: values.phoneNumber2,
      },
    }),
    joining_date: dayjs(values.joining_date).format('YYYY-MM-DD'),
    role: values.role,
    job_title: values.job_title,
    company: values.company,
    employee_id: values.employee_id,
    password: values.password,
    confirm_password: values.confirm_password,
    punch_timings: JSON.stringify({
      check_in: dayjs(values.check_in).format('hh:mm A'),
      check_out: dayjs(values.check_out).format('hh:mm A'),
    }),
    casual_leaves: values.casual_leaves,
    sick_leaves: values.sick_leaves,
    annual_leaves: values.annual_leaves,
    hajj_leaves: values.hajj_leaves,
    paid_leaves: values.paid_leaves,
    unpaid_leaves: values.unpaid_leaves,
  });
  const dispatchFunction = (values) => {
    dispatch(addEmployeeFormData(values));
  };
  const handleNavigate = () => {
    router.push('/hr/dashboard/employees');
  };
  const clearForm = () => {
    dispatch(clearEmployeeFormData());
  };
  const handleToast = () => {
    Toast('success', 'Employee created successfully');
  };
  const handleErrorToast = (msg) => {
    Toast('error', msg || 'Failed to create employee');
  };
  const handleDispatch = () => {
    dispatch(removeAddEmpForm());
  };

  return (
    <Box>
      <Breadcrumb
        dispatchFunction={handleDispatch}
        title="Employees /"
        currentPage="Add employee"
      />
      <Box mb={'40px'}>
        <Typography
          sx={{
            color: '#171717',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
          }}
        >
          Add employee
        </Typography>
      </Box>
      <Box
        sx={{
          height: '100%',
          border: 'solid 1px #ccc',
          borderRadius: '10px 10px 0 0',
          background: '#fff',
        }}
      >
        <Navigator
          formSteps={formSteps}
          currentStep={currentStep}
          navigationLabelWidth="75px"
        />
        <Box
          sx={{
            height: '100%',
            minHeight: '650px',
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'gray',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {formSteps?.map(
            ({ schema, form, countNo, isMultiColumn }, stepIndex) => {
              if (countNo === currentStep) {
                return (
                  <Step
                    key={stepIndex}
                    isLastStep={currentStep === formSteps.length}
                    currentStep={currentStep}
                    countNo={countNo}
                    form={form}
                    schema={schema}
                    isMultiColumn={isMultiColumn}
                    handleGoNext={handleGoNext}
                    handleGoPrev={handleGoPrev}
                    defaultValues={defaultValues}
                    getFinalData={getFinalData}
                    dispatchFunction={dispatchFunction}
                    method="postData"
                    endpoint={HR_ADD_EMPLOYEES}
                    navigateFunc={handleNavigate}
                    clearForm={clearForm}
                    toast={handleToast}
                    errorToast={handleErrorToast}
                    setCurrentStep={setCurrentStep}
                    marginLeft="5px"
                    marginRight={'10px'}
                  />
                );
              }
            }
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployee;
