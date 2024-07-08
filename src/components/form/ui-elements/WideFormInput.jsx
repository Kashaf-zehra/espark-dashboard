import { Box, Typography } from '@mui/material';
import {
  DesktopDatePicker,
  DesktopTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
// import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ActionBarComponent from '@/src/components/requestview/actionbarComponent';
import AppDropdown from '../../dashboard/appDropdown';
import AppSearchableDropdown from '../../dashboard/appSearchableDropdown';
import { countWeekendsHandler } from '@/src/utils/helpers';

const WideFormInput = ({
  title,
  placeholder,
  suffixIcon,
  type,
  required,
  disabled,
  options,
  darkBack,
  name,
  setFieldValue,
  value,
  error,
  setFieldError,
  errors,
  setErrors,
  values,
  minDate,
  searchable,
  nested,
  maxDate,
}) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const handleCloseDatePicker = () => setIsOpenDatePicker(false);

  function getTimeComponents(timeString) {
    const arr = timeString.split(':');
    const hour = parseInt(arr[0]);
    const min = parseInt(arr[1]);
    return { hour, min };
  }

  const handleSelectItem = (item) => {
    const tempErrors = { ...errors };
    if (Object.hasOwnProperty.call(tempErrors, name)) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue(name, item);
    if (values.expectedCheckIn || values.expectedCheckOut) {
      const expectedCheckIn = getTimeComponents(values.expectedCheckIn);
      const expectedCheckOut = getTimeComponents(values.expectedCheckOut);
      const checkOutTime = new Date();
      const checkInTime = new Date();

      checkInTime.setHours(expectedCheckIn.hour);
      checkInTime.setMinutes(expectedCheckIn.min);
      checkOutTime.setHours(expectedCheckOut.hour);
      checkOutTime.setMinutes(expectedCheckOut.min);

      if (item == 'Check in') {
        setFieldValue('punchTime', checkInTime);
      }
      if (item == 'Check out') {
        setFieldValue('punchTime', checkOutTime);
      }
    }
  };
  const handleSelectFile = (event) => {
    const name = event.target.name;
    const file = event.target.files[0];
    const tempErrors = { ...errors };
    if (Object.hasOwnProperty.call(tempErrors, name)) {
      delete tempErrors[name];
    }
    setErrors({ ...tempErrors });
    setFieldValue(name, file);
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
    } else {
      tempErrors[name] = 'Required';
    }
    setErrors({ ...tempErrors });
    setFieldValue?.(field, value);
  };

  function getDaysDifference(startDate, endDate) {
    const start = new Date(startDate);
    start.setHours(start.getHours() - start.getTimezoneOffset(), 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(end.getHours() - end.getTimezoneOffset(), 0, 0, 0);
    if (end < start) {
      return null;
    }

    const differenceInMilliseconds = end.getTime() - start.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  }

  const start = dayjs(values.startDate);
  const end = start.add(values.availableLeaves || 0, 'day');
  const countOfWeekends = countWeekendsHandler(values.startDate, end.$d);

  useEffect(() => {
    if (values.startDate && values.endDate) {
      setFieldValue(
        'count',
        getDaysDifference(values.startDate, values.endDate) +
          1 -
          countWeekendsHandler(values.startDate, values.endDate)
      );
    }
  }, [values]);

  const endWithWeekend = start.add(
    values.availableLeaves - 1 + countOfWeekends || 0,
    'day'
  );

  const shouldDisableDate = (date) => {
    const day = date.day();
    if (title == 'End date') {
      return (
        date.isBefore(start, 'day') ||
        date.isAfter(endWithWeekend, 'day') ||
        day === 0 ||
        day === 6
      );
    }
    return day === 0 || day === 6;
  };

  return (
    <Box>
      <Box
        sx={{
          padding: '5px 10px',
        }}
      >
        <Box
          sx={{
            background: darkBack ? '#F6F6F6' : '#FFF',
            p: { xs: '0', md: '0px 0px 5px 0px', lg: '5px 5px 5px 20px' },
            borderRadius: '5px',
            display: 'flex',
            alignItems: {
              xs: 'flex-start',
              lg: type === 'text-area' ? 'start' : 'center',
            },
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: '12px', md: '0px' },
            height: { xs: 'auto', lg: type !== 'text-area' && '50px' },
          }}
        >
          <Box sx={{ width: { xs: '100%', lg: 'calc(100% - 778px)' } }}>
            <Typography
              sx={{
                color: '#171717',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                paddingLeft: { xs: '0px', lg: '20px' },
                marginTop: { xs: '0px', md: type === 'text-area' && '5px' },
                mb: { xs: 0, md: 1.2, lg: 0 },
              }}
            >
              {title} {required && <span style={{ color: '#FF0000' }}>*</span>}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: '100%', lg: '778px' } }}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                borderRadius: '5px',
                width: '100%',
                background: disabled ? '#ccc' : '#F6F6F6',
              }}
            >
              {type === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    shouldDisableDate={shouldDisableDate}
                    className={[
                      error && 'error-border',
                      'custom-date-time-picker',
                    ].join(' ')}
                    minDate={minDate}
                    maxDate={maxDate}
                    open={isOpenDatePicker}
                    slots={{
                      openPickerIcon: () => (
                        <Image
                          src={`/icons/${suffixIcon}.svg`}
                          width={20}
                          height={20}
                          alt="Date"
                          onClick={() => setIsOpenDatePicker((ps) => !ps)}
                        />
                      ),
                      actionBar: () => (
                        <ActionBarComponent onClose={handleCloseDatePicker} />
                      ),
                    }}
                    slotProps={{
                      openPickerButton: {
                        disableRipple: true,
                      },
                      textField: {
                        placeholder: placeholder,
                        sx: {
                          width: '100%',
                          '& .MuiIconButton-edgeEnd': {
                            backgroundColor: 'none !important',
                            background: 'none !important',
                          },
                        },
                      },
                    }}
                    sx={{
                      width: '100%',
                      borderRadius: '50%',
                      // backgroundColor: '#888',
                    }}
                    value={value && dayjs(value)}
                    onChange={(e) => {
                      handleChangeInput(name, `${e?.$d}`);
                    }}
                    disabled={disabled}
                  />
                </LocalizationProvider>
              ) : type === 'time' ? (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  sx={{ width: '100%' }}
                >
                  {name === 'expectedCheckIn' ? (
                    <DesktopTimePicker
                      className={[
                        error && 'error-border',
                        'custom-date-time-picker',
                      ].join(' ')}
                      open={false}
                      slots={{
                        openPickerIcon: () => null,
                      }}
                      sx={{ width: '100%' }}
                      defaultValue={dayjs('2022-04-17T10:00')}
                      disabled={disabled}
                    />
                  ) : name === 'expectedCheckOut' ? (
                    <DesktopTimePicker
                      className={[
                        error && 'error-border',
                        'custom-date-time-picker',
                      ].join(' ')}
                      open={false}
                      slots={{
                        openPickerIcon: () => null,
                      }}
                      sx={{ width: '100%' }}
                      defaultValue={dayjs('2022-04-17T19:00')}
                      disabled={disabled}
                    />
                  ) : (
                    <DesktopTimePicker
                      // className="custom-date-time-picker"
                      className={[
                        error && 'error-border',
                        'custom-date-time-picker',
                      ].join(' ')}
                      open={false}
                      slots={{
                        openPickerIcon: () => null,
                      }}
                      sx={{ width: '100%' }}
                      value={values.punchTime ? dayjs(value) : value}
                      onChange={(e) => {
                        handleChangeInput(name, `${e?.$d}`);
                      }}
                      disabled={disabled}
                    />
                  )}
                </LocalizationProvider>
              ) : type === 'select' ? (
                <>
                  {searchable ? (
                    <AppSearchableDropdown
                      data={options}
                      selectedItem={value}
                      setSelectedItem={handleSelectItem}
                      setIsLoadingList={setIsLoadingList}
                      isLoadingList={isLoadingList}
                      md={12}
                      error={error}
                      placeholder={placeholder}
                      width={'100%'}
                    />
                  ) : (
                    <AppDropdown
                      data={options}
                      placeHolder={'Select'}
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
              ) : type === 'text-area' ? (
                <>
                  <textarea
                    className="reason-text-area"
                    rows={3}
                    style={{
                      width: '100%',
                      border: `1px solid ${error ? 'red' : '#E4E4E4'}`,
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                      handleChangeInput(name, `${e?.target?.value}`);
                    }}
                    disabled={disabled}
                  ></textarea>
                </>
              ) : type === 'file' ? (
                <label
                  style={{
                    width: '100%',
                  }}
                  htmlFor="input-attachment"
                >
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: `solid 1px ${error ? 'red' : '#E4E4E4'}`,
                      p: '9px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Box display={'flex'} flexDirection={'row'}>
                      <Typography
                        sx={{
                          color: '#595959',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: 'normal',
                        }}
                      >
                        {values?.[name]?.name || 'Upload File'}
                      </Typography>
                      <input
                        // onChange={handleUpload}
                        name={name}
                        id="input-attachment"
                        type="file"
                        style={{ width: 0, height: 0, visibility: 'hidden' }}
                        onChange={handleSelectFile}
                      />
                    </Box>

                    <Image
                      src={'/icons/Attachment.svg'}
                      width={20}
                      height={20}
                      alt="Attachment"
                    />
                  </Box>
                </label>
              ) : type === 'static' ? (
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#E4E4E4',
                    width: '100%',
                    cursor: 'no-drop',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    {value || 0}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WideFormInput;
