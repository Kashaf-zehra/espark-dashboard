import AppTable from '@/src/components/appTable/AppTable';
import { addEmployeModalFormSchema } from '@/src/components/form/schemas/addEmployeeModal';
import Navigator from '@/src/components/form/step/Navigator';
import FormInput from '@/src/components/form/ui-elements/FormInput';
import { addEmployeeModalFormSteps } from '@/src/constants/data/forms/add-employee-modal';
import { FORM_DATA } from '@/src/constants/form';
import { Box, Button, Grid, Modal } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';

const AddEmployeeModal = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [modalStep1FormTableState, setModalStep1FormTableState] = useState([]);
  useEffect(() => {
    setModalStep1FormTableState([...addEmployeeModalFormSteps[0].data]);
  }, [addEmployeeModalFormSteps]);

  const handleSelectRow = (employeeId) => {
    const tempForm = [...addEmployeeModalFormSteps[0].data];
    const employeeIndex = tempForm.findIndex((el) => el.id === employeeId);
    tempForm[employeeIndex] = {
      ...tempForm[employeeIndex],
      isSelected: !tempForm[employeeIndex].isSelected,
    };
    setModalStep1FormTableState(tempForm);
    setIsDisabledNext(false);
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
    initialValues: {},
    validationSchema: addEmployeModalFormSchema,
    enableReinitialize: true,
    onSubmit: (formValues) => {
      console.log({ formValues });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  const handleCloseModal = () => {
    handleReset();
    setCurrentStep(2);
    onClose();
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
          width: { xs: '90%', sm: '90%', md: '66%' },
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          overflowY: 'auto',
          maxHeight: '90%',
        }}
      >
        <Navigator
          formSteps={addEmployeeModalFormSteps}
          currentStep={currentStep}
          navigationLabelWidth="80px"
          navigationPadding="14px 0 36px 0"
        />
        <Box
          sx={{
            p: { xs: '20px', md: '30px 100px' },
          }}
        >
          {addEmployeeModalFormSteps?.map(
            ({ form, data, column, countNo }, stepIndex) => {
              if (countNo === currentStep) {
                if (data?.length)
                  return (
                    <Box
                      sx={{
                        maxWidth: '100%',
                        overflowX: 'auto',
                      }}
                      key={stepIndex}
                    >
                      <AppTable
                        column={column}
                        data={modalStep1FormTableState}
                        minWidth="100%"
                        handleClickActionView={handleSelectRow}
                        noPagination
                      />
                      <Box>
                        <Button
                          disabled={isDisabledNext}
                          variant="contained"
                          sx={{ minWidth: '120px' }}
                          onClick={() => setCurrentStep((ps) => ps + 1)}
                        >
                          {FORM_DATA?.add}
                        </Button>
                      </Box>
                    </Box>
                  );
                else if (form.length)
                  return (
                    <form onSubmit={handleSubmit} key={stepIndex}>
                      <Grid container>
                        {form?.map(
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
                                  lg={12}
                                  fields={fields}
                                />
                              </Grid>
                              {formIndex % 2 === 0 && (
                                <Grid item xs={12} lg={2}></Grid>
                              )}
                            </>
                          )
                        )}
                        <Grid item p={'0 10px'} xs={12}>
                          <Button
                            sx={{ minWidth: '120px' }}
                            variant="contained"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  );
              }
            }
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
