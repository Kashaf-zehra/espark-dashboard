'use client';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import Step from '@/src/components/form/step/Step';
import { formSteps } from '@/src/constants/data/forms/add-client';
import Navigator from '@/src/components/form/step/Navigator';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { EMPLOYEE_DATA } from '@/src/constants/AllEmployee';
import { useDispatch, useSelector } from 'react-redux';
import { HR_ADD_ClIENT } from '@/src/services/apiService/apiEndPoints';
import {
  addClientFormData,
  removeClientFormData,
} from '@/src/redux/slices/hrSlices/clientSlice';
import dayjs from 'dayjs';
import { Toast } from '@/src/components/Toast/Toast';
import { useRouter } from 'next/navigation';
import { countriesList } from '@/src/constants/countries';

const AddEmployee = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const { addClientForm } = useSelector((state) => state.hr?.clients);
  const handleGoNext = () => {
    if (currentStep === formSteps.length) return;
    setCurrentStep((ps) => ps + 1);
  };
  const handleGoPrev = () => {
    if (currentStep === 1) return;
    setCurrentStep((ps) => ps - 1);
  };

  const defaultValues = {
    ...addClientForm,
    join_date: addClientForm?.join_date || null,
    country: addClientForm?.country || {
      flag: 'https://flagcdn.com/pk.svg',
      title: 'Pakistan',
    },
  };
  const dispatchFunction = (values) => {
    console.log({ values });
    dispatch(
      addClientFormData({
        ...values,
        join_date: dayjs(values.join_date).format('YYYY-MM-DD'),
      })
    );
  };
  const handleNavigate = () => {
    router.push('/hr/dashboard/clients');
  };
  const getFinalData = (values) => {
    return {
      first_name: values?.first_name,
      last_name: values?.last_name,
      address: values?.address,
      join_date: values?.join_date,
      phone_number: values?.phone_number,
      email: values?.email,
      image: values?.image,
      company_name: values?.company_name,
      client_id: values?.client_id,
      password: values?.password,
      confirm_password: values?.confirm_password,
      country: values?.country.title,
      // // ...values,
      // // country: values.country.title,
    };
  };
  const handleToast = () => {
    Toast('success', 'Client created successfully');
  };
  const handleErrorToast = (message) => {
    Toast('error', message || 'Failed to create client');
  };
  const clearForm = () => {
    dispatch(removeClientFormData());
  };
  return (
    <Box>
      <Breadcrumb root="clients" title="Clients /" currentPage="Add client" />
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
          {EMPLOYEE_DATA?.addClient}
        </Typography>
      </Box>
      <Box
        sx={{
          // maxWidth: '1480px',
          // width: '95%',
          minHeight: '550px',
          border: 'solid 1px #ccc',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Navigator formSteps={formSteps} currentStep={currentStep} />
        {formSteps?.map(
          ({ schema, form, countNo, isMultiColumn }, stepIndex) => {
            if (countNo === currentStep) {
              return (
                <Step
                  key={stepIndex}
                  currentStep={currentStep}
                  form={form}
                  schema={schema}
                  countNo={countNo}
                  isMultiColumn={isMultiColumn}
                  handleGoNext={handleGoNext}
                  handleGoPrev={handleGoPrev}
                  isLastStep={currentStep === formSteps?.length}
                  countries={countriesList}
                  defaultValues={defaultValues}
                  dispatchFunction={dispatchFunction}
                  getFinalData={getFinalData}
                  method="postData"
                  endpoint={HR_ADD_ClIENT}
                  toast={handleToast}
                  mt={25}
                  errorToast={handleErrorToast}
                  clearForm={clearForm}
                  navigateFunc={handleNavigate}
                  marginLeft={'10px'}
                  marginRight={'10px'}
                />
              );
            }
          }
        )}
      </Box>
    </Box>
  );
};

export default AddEmployee;
