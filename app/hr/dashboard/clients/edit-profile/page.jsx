'use client';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Step from '@/src/components/form/step/Step';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import { clientEditForm } from '@/src/constants/data/forms/edit-client-info';
import { editClientSchema } from '@/src/components/form/schemas/editClient';
import { useSelector } from 'react-redux';
import { HR_GET_CLIENT_PROFILE } from '@/src/services/apiService/apiEndPoints';
import dayjs from 'dayjs';
import { countriesList } from '@/src/constants/countries';

const EditClient = () => {
  const [formData, setFormData] = useState({});
  const { currentClient } = useSelector((state) => state?.hr?.clients);
  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    console.log('form', formData);
  }, [formData]);
  const getCountry = (country) => {
    return (
      countriesList.find(({ title }) => title === country) || {
        flag: 'https://flagcdn.com/pk.svg',
        title: 'Pakistan',
      }
    );
  };
  const defaultValues = {
    ...currentClient,
    country: getCountry(currentClient?.country),
  };
  const getFinalData = (values) => {
    const final = {
      ...values,
      country: values.country?.title,
      join_date: dayjs(values?.join_date).format('YYYY-MM-DD'),
    };
    console.log({ values, final });
    return final;
  };

  return (
    <Box>
      <Breadcrumb root="clients" title="Clients /" currentPage="Edit client" />
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
          Edit client profile
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: '550px',
          border: 'solid 1px #ccc',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Step
          form={clientEditForm}
          schema={editClientSchema}
          pmd="50px 95px"
          editProfile
          countries={countriesList}
          handleData={handleData}
          defaultValues={defaultValues}
          isLastStep={true}
          getFinalData={getFinalData}
          // mutationFunction={mutationFunction}
          method="updateData"
          endpoint={`${HR_GET_CLIENT_PROFILE}?id=${currentClient.id}`}
          marginLeft={{
            '@media (min-width: 1200px) and (max-width: 1260px)': {
              marginLeft: '2px',
            },
            '@media (min-width: 600px) and (max-width: 1200px)': {
              marginLeft: '5px',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default EditClient;
