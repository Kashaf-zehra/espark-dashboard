import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import FormInput from '@/src/components/form/ui-elements/FormInput';
import { useFormik } from 'formik';
import {
  Profile_Edit_Section,
  User_Detail,
  User_Password,
} from '@/src/constants/profileEditData';
import { generalSettingFormSchema } from '../form/schemas/generalDetails';
import { settingForm } from '@/src/constants/data/forms/setting-form';
import Image from 'next/image';
import {
  CLIENT_UPDATE_COMPANY,
  CLIENT_UPDATE_PIC,
} from '@/src/services/apiService/apiEndPoints';
import { api } from '@/src/services/apiService';
import { useMutation } from '@tanstack/react-query';
import { Toast } from '../Toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchClientHomeDataRequestSuccess,
  updateClientImage,
} from '@/src/redux/slices/clientSlices/homeSlice';

const GeneralSettings = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const { data } = useSelector((state) => state?.client?.home);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const updateCompanyPromise = imageFile
        ? api
            .postData(`${CLIENT_UPDATE_PIC}`, { picture: data.picture })
            .then((resp) => {
              dispatch(updateClientImage(resp?.data?.image));
              Toast('success', 'Data posted successfully');
              return api.updateJSONData(CLIENT_UPDATE_COMPANY, {
                company_name: data.companyName,
              });
            })
        : api.updateJSONData(CLIENT_UPDATE_COMPANY, {
            company_name: data.companyName,
          });

      return updateCompanyPromise.then((response) => {
        const updatedHomeData = {
          ...data,
          username: data?.companyName,
        };
        dispatch(fetchClientHomeDataRequestSuccess(updatedHomeData || {}));
        return response;
      });
    },
    onSuccess: ({ data }) => {
      console.log({ data });
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
  } = useFormik({
    initialValues: {
      email: data?.email || 'test@example.com',
      companyName: data?.username || '',
    },
    validationSchema: generalSettingFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
      mutate(formValues);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null);
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageFile(reader.result);
        const formData = new FormData();
        formData.append('picture', file);
        setIsUploading(true);
        const resp = await api.postData(`${CLIENT_UPDATE_PIC}`, formData);
        setIsUploading(false);

        dispatch(updateClientImage(resp?.data?.image));
        Toast('success', 'Image uploaded successfully');
        const updatedImageData = {
          ...data,
          client_image: resp?.data?.image,
        };
        dispatch(fetchClientHomeDataRequestSuccess(updatedImageData || {}));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      Toast('error', error.message || 'Failed to upload image');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            color: '#171717',
            fontWeight: 400,
            fontSize: '16px',
          }}
        >
          {Profile_Edit_Section?.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Avatar
            src={imageFile || data?.client_image}
            width={50}
            height={50}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
            required
            name="picture"
          />
          <Button
            type="file"
            onClick={handleButtonClick}
            disabled={isUploading}
            sx={{
              width: isUploading ? '100px' : '160px',
              height: '40px',
              fontSize: { xs: '12px', md: '16px' },
              whiteSpace: 'nowrap',
              fontWeight: 600,
              background: isUploading ? '#EBEBE4' : '#029894',
              borderRadius: '5px',
              color: isUploading ? '#c6c6c6' : '#fff',
              '&:hover': {
                background: '#029894',
              },
            }}
            startIcon={
              <Image
                src={Profile_Edit_Section?.buttonIcon}
                width={24}
                height={24}
                alt={'upload'}
              />
            }
          >
            {isUploading ? (
              <CircularProgress size={26} color="secondary" />
            ) : (
              Profile_Edit_Section?.buttonText
            )}
          </Button>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            my: 3,
            width: { xs: '100%', md: '80%' },
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: '#171717', fontWeight: '400' }}
          >
            {User_Detail?.title}
          </Typography>
          <Grid sx={{ marginLeft: '-7px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: { xs: '100%', md: '65%' },
                }}
              >
                {settingForm?.map(
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
                      disabled,
                      suffixIconOutsideWithTooltip,
                    },
                    formIndex
                  ) => (
                    <>
                      <Grid item xs={12} lg={6} key={formIndex}>
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
                          md={6}
                          lg={6}
                          fields={fields}
                          disabled={disabled}
                          suffixIconOutsideWithTooltip={
                            suffixIconOutsideWithTooltip
                          }
                        />
                      </Grid>
                    </>
                  )
                )}
              </Box>
              <Grid item p={'0 10px'} xs={12} lg={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'flex-start', md: 'center' },
                    paddingRight: { xs: '0', md: '15px' },
                    marginTop: { xs: '0px', md: '125px' },
                  }}
                >
                  <Button
                    sx={{
                      minWidth: '120px',
                      background: '#888888',
                      color: '#fff',
                      marginLeft: { xs: '0px', md: '30px' },
                      '&:hover': {
                        background: '#888888',
                        color: '#fff',
                      },
                      '&.Mui-disabled': {
                        background: '#EBEBE4',
                        color: '#C6C6C6',
                      },
                    }}
                    disabled={true}
                    type="submit"
                  >
                    {isPending ? (
                      <CircularProgress size={26} color="secondary" />
                    ) : (
                      User_Password?.buttonText
                    )}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </form>
    </>
  );
};
export default GeneralSettings;
