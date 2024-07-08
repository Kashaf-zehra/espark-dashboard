'use client';
import React, { useRef, useState } from 'react';
import { Grid, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';

import AppDropdown from '../../dashboard/appDropdown';
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
  DesktopDateTimePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppSearchableDropdown from '../../dashboard/appSearchableDropdown';
import useMediaQuery from '@mui/material/useMediaQuery';

const DateTimePickerComponent = (props) => {
  const isXsScreen = useMediaQuery('(max-width:600px)');
  if (isXsScreen) {
    return <MobileDateTimePicker {...props} />;
  }
  return <DesktopDateTimePicker {...props} />;
};

const FormInput = ({
  xs = 12,
  sm = 6,
  md = 4,
  lg = 3,
  title,
  width,
  placeholder,
  prefixIcon,
  dollarIcon,
  type = 'text',
  suffixIcon,
  options,
  nested,
  name,
  setFieldValue,
  value,
  values,
  error,
  setFieldError,
  errors,
  setErrors,
  fields,
  suffixIconOutside,
  suffixIconOutsideWithTooltip,
  onClickTogglePhoneNumber,
  countries,
  searchable,
  suffixIconInside,
  readOnly,
  withFlag,
  fieldsName,
  accept = '.png',
  min,
  max,
  disabled,
  setValues,
  filelabel,
  handleJobTitleClick,
  handleJobTitleSelect,
  fontSize,
  miniFontSize,
}) => {
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isCopied, setIsCopied] = useState();
  const [imageSrc, setImageSrc] = useState(
    `/images/hiring/${suffixIconInside}.svg`
  );
  const handleSelectItem = (item) => {
    const tempErrors = { ...errors };
    if (Object.hasOwnProperty.call(tempErrors, name)) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue(name, item);
    // handleData(name, item);
  };
  const handleChangeInput = (field, value) => {
    const tempErrors = { ...errors };
    if (value.length) {
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(value);
        if (result) {
          delete tempErrors[name];
        }
      } else {
        delete tempErrors[name];
      }
    }
    // else {
    //   tempErrors[name] = 'Required';
    // }
    setErrors({ ...tempErrors });
    setFieldValue?.(field, value);
    // handleData(field, value);
  };

  const handleChangeFileInput = (field, value) => {
    const tempErrors = { ...errors };
    if (value?.name) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue?.(field, value);
    // handleData(field, value);
  };

  const handleClickCounter = (type, name, value, min) => {
    switch (type) {
      case 'Sub':
        switch (value) {
          case min || 0:
            break;
          default:
            setFieldValue(name, value - 1);
            // handleData(name, value - 1);
            break;
        }
        break;

      case 'Add':
        switch (value) {
          case max || 10:
            break;
          default:
            setFieldValue(name, value + 1);
            // handleData(name, value + 1);
            break;
        }
        break;
      default:
        break;
    }
  };

  const textRef = useRef();
  const copyToClipboard = () => {
    const copyText = textRef.current.value;
    const isCopy = copy(copyText);
    if (isCopy) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
    setImageSrc(`/images/hiring/copy.svg`);
  };

  const handleSelectCheckbox = (e, item) => {
    const { checked } = e.target;
    const fieldName = `${name}.${item.name}`;
    setFieldValue(fieldName, checked);
  };

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      sx={{
        position: 'relative',
        mb: { xs: '30px', md: '30px' },
        padding: '0 10px',
      }}
    >
      {title && (
        <>
          {type === 'timerow' ? (
            <Box>
              <Typography
                sx={{
                  color:
                    errors['checkinTime1'] ||
                    errors['checkinTime2'] ||
                    errors['checkoutTime1'] ||
                    errors['checkoutTime2']
                      ? 'red'
                      : '#595959',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  mb: '10px',
                }}
              >
                {title}
              </Typography>
            </Box>
          ) : (
            <Box display={'flex'} sx={{ mb: '10px' }} alignItems={'end'}>
              <Typography
                sx={{
                  color: error ? 'red' : '#595959',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  '@media (min-width: 1200px) and (max-width: 1250px)': {
                    fontSize: '11.9px',
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              ></Typography>
              {filelabel && (
                <Typography
                  sx={{
                    fontSize: '10px',
                    ml: '5px',

                    '@media (min-width: 1210px) and (max-width: 1370px)': {
                      fontSize: fontSize,
                    },
                    '@media (min-width: 1200px) and (max-width: 1210px)': {
                      fontSize: miniFontSize,
                    },
                  }}
                >
                  {filelabel}
                </Typography>
              )}
            </Box>
          )}
        </>
      )}

      {type === 'select' ? (
        <>
          {searchable ? (
            <AppSearchableDropdown
              data={countries || options}
              selectedItem={value}
              setSelectedItem={handleSelectItem}
              setIsLoadingList={setIsLoadingList}
              isLoadingList={isLoadingList}
              md={12}
              width={width}
              withFlag={withFlag}
              error={error}
              placeholder={placeholder}
            />
          ) : (
            <AppDropdown
              handleJobTitleClick={handleJobTitleClick}
              handleJobTitleSelect={handleJobTitleSelect}
              data={options}
              placeHolder={placeholder}
              selectedItem={value}
              setSelectedItem={handleSelectItem}
              isLoadingList={isLoadingList}
              setIsLoadingList={setIsLoadingList}
              nested={nested}
              mb={'0px'}
              error={error}
              isForm
              setFieldError={setFieldError}
              name={name}
            />
          )}
        </>
      ) : type === 'date' ? (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DesktopDatePicker
                className={[
                  error ? 'error-border' : 'no-error-border',
                  'form-date-picker-component',
                ].join(' ')}
                slots={{
                  openPickerIcon: () => (
                    <Box
                      component={'img'}
                      src="/images/hiring/calender.svg"
                      width={30}
                      height={30}
                      alt="calender"
                      className="calendar-icon"
                      sx={{
                        mx: 'auto',
                        marginRight: '3px',
                      }}
                    />
                  ),
                }}
                format={placeholder}
                placeholder={placeholder}
                slotProps={{
                  openPickerButton: {
                    disableRipple: true,
                  },
                  textField: {
                    placeholder: placeholder,
                    sx: {
                      '& input': {
                        color: '#888888',
                        padding: '9.95px 10px',
                        width: '99%',
                      },
                      '& .MuiIconButton-edgeEnd': {
                        backgroundColor: 'none !important',
                        background: 'none !important',
                      },
                    },
                  },
                }}
                sx={{
                  width: '100%',
                  height: '40px',
                  '@media (min-width: 900px) and (max-width: 1400px)': {
                    width: '100%',
                  },
                }}
                // value={value}
                maxDate={
                  name === 'from'
                    ? values['to']
                      ? dayjs(values['to'])
                      : null
                    : null
                }
                minDate={
                  name === 'to'
                    ? values['from']
                      ? dayjs(values['from'])
                      : null
                    : null
                }
                value={dayjs(value || null)}
                onChange={(e) => {
                  handleChangeInput(name, `${e}`);
                }}
              />
            </Box>
          </LocalizationProvider>
        </>
      ) : type === 'date-and-time' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePickerComponent
            className={[
              error ? 'error-border' : 'no-error-border',
              'form-date-picker-component',
            ].join(' ')}
            slots={{
              openPickerIcon: () => (
                <Image
                  src={`/icons/${suffixIcon}.svg`}
                  width={30}
                  height={30}
                  alt="calender"
                />
              ),
            }}
            placeholder={placeholder}
            slotProps={{
              textField: {
                placeholder: placeholder,
                sx: {
                  '& input': {
                    color: '#88888',
                    padding: '9.95px 10px',
                    width: '100%',
                  },
                },
              },
            }}
            sx={{
              width: '100%',
              height: '40px',
              '@media (min-width: 900px) and (max-width: 1400px)': {
                width: '100%',
              },
            }}
            value={value}
            onChange={(e) => {
              handleChangeInput(name, `${e?.$d}`);
            }}
          />
        </LocalizationProvider>
      ) : type === 'time' ? (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker
              className={[
                error ? 'error-border' : 'no-error-border',
                'form-date-picker-component',
              ].join(' ')}
              slots={{
                openPickerIcon: () => (
                  <Image
                    src={`/icons/ClockIcon.svg`}
                    width={30}
                    height={30}
                    alt="calendar"
                  />
                ),
              }}
              placeholder={placeholder}
              slotProps={{
                openPickerButton: {
                  disableRipple: true,
                },
                textField: {
                  placeholder: placeholder,
                  sx: {
                    '& input': {
                      color: '#888888',
                      padding: '9.95px 10px',
                      width: '100%',
                    },
                    '& .MuiIconButton-edgeEnd': {
                      backgroundColor: 'none !important',
                      background: 'none !important',
                    },
                  },
                },
              }}
              sx={{
                width: '100%',
                height: '40px',
                '@media (min-width: 900px) and (max-width: 1400px)': {
                  width: '100%',
                },
              }}
              value={value}
              // value={dayjs('2022-04-17T22:00')}
              // value={dayjs('2000-01-01T22:00')}
              // value={dayjs(convert12to24(value))}
              // value={'10:00 PM'}
              // defaultValue={new Date()}
              onChange={(e) => {
                handleChangeInput(name, `${e?.$d}`);
              }}
            />
          </LocalizationProvider>
        </>
      ) : type === 'timerow' ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              rowGap: 2,
            }}
          >
            {fieldsName?.map((field, fieldIndex) => {
              return (
                <>
                  {fieldIndex === 1 && (
                    <Box
                      key={`separator-${fieldIndex}`}
                      sx={{
                        width: '70px',
                        height: '40px',
                        background: '#E4E4E4',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: { xs: 'none', sm: 'flex' },
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>-</Typography>
                    </Box>
                  )}
                  <Box
                    key={`box-${fieldIndex}`}
                    sx={{
                      border: `1px solid ${
                        errors?.[name]?.[field?.name] ? 'red' : '#E4E4E4'
                      }`,
                      borderRadius: '5px',
                      display: 'flex',
                      overflow: 'hidden',
                      height: '40px',
                      width: '100%',
                    }}
                  >
                    <input
                      style={{
                        background: '#FFF',
                        display: type === 'file' && 'none',
                      }}
                      placeholder={field.placeholder}
                      className="form-input-field"
                      type="time"
                      onChange={(e) => {
                        setValues({
                          ...values,
                          [name]: {
                            ...values[name],
                            [field.name]: e?.target?.value,
                          },
                        });

                        const tempErrors = { ...errors };

                        if (e.target?.value) {
                          delete tempErrors[name];
                        }
                        setErrors({ ...tempErrors });

                        // handleChangeInput(
                        //   `${name}.${field.name}`,
                        //   e?.target?.value
                        // );
                      }}
                      value={value?.[field?.name]}
                      name={`${name}.${field.name}`}
                    />
                  </Box>
                </>
              );
            })}
          </Box>

          {error?.from ? (
            <div style={{ color: 'red' }}>{error?.from}</div>
          ) : (
            error?.to && <div style={{ color: 'red' }}>{error?.to}</div>
          )}
        </>
      ) : type === 'input-range' ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            '@media (max-width: 500px)': {
              flexDirection: 'column',
              rowGap: 2,
            },
          }}
        >
          {fields?.map((field, fieldIndex) => (
            <>
              {fieldIndex === 1 && (
                <Box
                  key={`box-${fieldIndex}`}
                  sx={{
                    mx: '10px',
                    width: '10px',
                    height: '1px',
                    background: '#000',
                    '@media (max-width: 500px)': {
                      display: 'none',
                    },
                  }}
                ></Box>
              )}
              <Box
                key={fieldIndex}
                sx={{
                  width: '100%',
                  border: `${
                    error && (error?.minimum || error?.maximum)
                      ? 'red'
                      : '#E4E4E4'
                  } 1px solid`,
                  borderRadius: '5px',
                  display: 'flex',
                  overflow: 'hidden',
                  height: '40px',
                }}
              >
                <input
                  style={{
                    width: '100%',
                    background: '#FFF',
                    display: type === 'file' && 'none',
                  }}
                  placeholder={field.placeholder}
                  className="form-input-field"
                  type={type}
                  onChange={(e) => {
                    handleChangeInput(
                      `${name}.${field.name}`,
                      e?.target?.value
                    );
                  }}
                  value={values[`${name}.${field.name}`]}
                />
                {field.suffixIcon && (
                  <Box
                    sx={{
                      display: 'flex',
                      padding: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      src={`/icons/${field.suffixIcon}.svg`}
                      width={17}
                      height={17}
                      alt="Calendar"
                    />
                  </Box>
                )}
              </Box>
            </>
          ))}
        </Box>
      ) : type === 'add-sub-counter' ? (
        <Box
          sx={{
            border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '5px',
            padding: '5px',
          }}
        >
          <Box
            sx={{
              width: '30px',
              height: '30px',
              background: value === min || 0 ? '#888888' : '#068987',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleClickCounter('Sub', name, value, min)}
          >
            <Box
              component={'img'}
              src="/icons/MinusIcon.svg"
              sx={{ maxWidth: '70%' }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                color: '#888',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                textAlign: 'center',
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '30px',
              height: '30px',
              // background: value > max || 10 ? '#888888' : '#068987',
              background: value < max ? '#068987' : '#888888',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleClickCounter('Add', name, value)}
          >
            <Box
              component={'img'}
              src="/icons/PlusIcon.svg"
              sx={{ maxWidth: '70%' }}
            />
          </Box>
        </Box>
      ) : type === 'checkboxes' ? (
        <Box>
          {options?.map((item, chkBoxIndex) => (
            <Box key={chkBoxIndex} display="flex" alignItems={'center'}>
              <input
                type="checkbox"
                name={item.name}
                id={`${item.title}`}
                checked={values?.[name]?.[item.name]}
                onChange={(e) => handleSelectCheckbox(e, item)}
              />
              <label style={{ marginLeft: '10px' }} htmlFor={`${item.title}`}>
                {item.title}
              </label>
            </Box>
          ))}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
                borderRadius: '5px',
                display: 'flex',
                overflow: 'hidden',
                height: '40px',
                flex: 1,
              }}
            >
              {dollarIcon && (
                <label
                  htmlFor={`input-file-${title}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '40px',
                      height: '40px',
                      padding: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: type === 'file' && '#068987',
                    }}
                  >
                    <Image
                      src={`/icons/${dollarIcon}.svg`}
                      width={9}
                      height={17}
                      alt="Upload"
                    />
                  </Box>
                </label>
              )}
              {prefixIcon && (
                <label
                  htmlFor={`input-file-${title}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '40px',
                      height: '40px',
                      padding: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: type === 'file' && '#068987',
                    }}
                  >
                    <Image
                      src={`/icons/${prefixIcon}.svg`}
                      width={20}
                      height={20}
                      alt="Upload"
                    />
                  </Box>
                </label>
              )}

              <input
                id={`input-file-${title}`}
                style={{
                  background: '#FFF',
                  display: type === 'file' && 'none',
                  color: disabled && '#888',
                }}
                value={
                  // name === 'emailCredential'
                  //   ? modalData?.row?.email || ''
                  //   : name === 'passwordCredential'
                  //   ? modalData?.row?.password || ''
                  //   : '' || type !== 'file'
                  //   ? value
                  //   : null
                  // value
                  type === 'file' ? null : value
                }
                disabled={disabled}
                placeholder={placeholder}
                className="form-input-field"
                type={type}
                ref={textRef}
                readOnly={readOnly}
                onChange={(e) => {
                  if (type === 'file') {
                    handleChangeFileInput(name, e?.currentTarget.files[0]);
                  } else {
                    handleChangeInput(name, e?.target?.value);
                  }
                }}
                accept={accept}
              />
              {suffixIcon && (
                <label
                  htmlFor={`input-file-${title}`}
                  style={{
                    display: 'flex',
                    padding: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={`/images/hiring/${suffixIcon}.svg`}
                    width={30}
                    height={30}
                    alt="Calendar"
                  />
                </label>
              )}
              {suffixIconInside && (
                <>
                  <label
                    htmlFor={`input-file-${title}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={imageSrc}
                      width={50}
                      height={50}
                      alt="Calendar"
                      onClick={copyToClipboard}
                    />
                  </label>
                </>
              )}

              {type === 'file' && (
                <label
                  className="file-upload-label"
                  htmlFor={`input-file-${title}`}
                >
                  {value?.name || placeholder}
                </label>
              )}
            </Box>
            {/* {imageUrl && <img src={imageUrl} />} */}
            {suffixIconOutside && (
              <Box
                src={`/icons/${suffixIconOutside}.svg`}
                component={'img'}
                sx={{
                  width: { xs: '20px', md: '30px' },
                  height: { xs: '20px', md: '30px' },
                  position: 'absolute',
                  right: { xs: '-30px', md: '-40px' },
                  '@media (min-width: 900px) and (max-width: 1200px)': {
                    width: '20px',
                    height: '20px',
                    marginRight: '20px',
                  },
                }}
                onClick={onClickTogglePhoneNumber}
              ></Box>
            )}
            {suffixIconOutsideWithTooltip && (
              <Tooltip title="Reach out to our admin support for assistance. They're here to help! Email: admin@esparktalent.com">
                <Box
                  src={`/icons/${suffixIconOutsideWithTooltip}.svg`}
                  component={'img'}
                  sx={{
                    width: { xs: '20px', md: '30px' },
                    height: { xs: '20px', md: '30px' },
                    position: 'absolute',
                    right: { xs: '-20px', md: '-40px' },
                    '@media (min-width: 900px) and (max-width: 1200px)': {
                      width: '20px',
                      height: '20px',
                      marginRight: '20px',
                    },
                  }}
                />
              </Tooltip>
            )}
          </Box>
        </Box>
      )}

      <>
        {error &&
        typeof error === 'object' &&
        (error?.maximum || error?.minimum) ? (
          <Box style={{ color: 'red' }}>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: '80px', sm: '170px', md: '45px' },
              }}
            >
              {error?.minimum && <Box>{error?.minimum}</Box>}
              {error?.maximum && <Box>{error?.maximum}</Box>}
            </Box>
          </Box>
        ) : (
          error &&
          !error?.from &&
          !error?.to && <div style={{ color: 'red' }}>{error}</div>
        )}
      </>

      {
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isCopied && 'Copied!'}
        </Box>
      }
    </Grid>
  );
};

export default FormInput;
