import dayjs from 'dayjs';
import * as Yup from 'yup';

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegExp = /^[a-zA-Z\s'-]+$/;
const companyNameRegExp = /^[a-zA-Z0-9\s'&.-]+$/;

export const dobValidation = Yup.string()
  .required('Required')
  .test('dob-future', 'Date of birth cannot be in the future', (value) => {
    if (!value) return false;
    const dateOfBirth = dayjs(value);
    const today = dayjs();
    return dateOfBirth.isBefore(today) || dateOfBirth.isSame(today, 'day');
  });

export const phoneValidation = Yup.string()
  .required('Contact number is required')
  .matches(
    /^\+?[0-9]+$/,
    'Phone number must contain only numeric characters and an optional leading +'
  )
  .min(6, 'Phone number must be at least 6 digits')
  .max(16, 'Phone number must be at most 16 digits');
export const notRequiredValidation = Yup.string()
  .matches(
    /^\+?[0-9]+$/,
    'Phone number must contain only numeric characters and an optional leading +'
  )
  .min(6, 'Phone number must be at least 6 digits')
  .max(16, 'Phone number must be at most 16 digits');
export const emailValidation = Yup.string()
  .required('Email is required')
  .matches(emailRegExp, 'Invalid email address');

export const companyValidation = Yup.string()
  .matches(companyNameRegExp, 'Company name is not valid')
  .required('Company name is required')
  .min(2, 'Company name is too short - should be 2 chars minimum.')
  .max(100, 'Company name is too long - should be 100 chars maximum.');
export const websiteValidation = Yup.string()
  .required('Website url is required')
  .test('is-url', 'Invalid URL', (value) => {
    if (!value) return true;
    const urlRegex =
      /^(https?:\/\/)((www\.)?[a-zA-Z0-9@:%._+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._+~#?&//=]*))$/;
    if (/^(https?:\/\/)(w{1,2}\.)/.test(value)) return false;
    if (/^(https?:\/\/)\./.test(value)) return false;
    if (/\.\./.test(value)) return false;
    return urlRegex.test(value);
  });
export const nameValidation = Yup.string()
  .matches(nameRegExp, 'Name is not valid')
  .required('Name is required')
  .min(2, 'Name is too short - should be 2 chars minimum.')
  .max(50, 'Name is too long - should be 50 chars maximum.');

export const dojValidation = Yup.string()
  .required('Required')
  .test(
    'doj-valid',
    'Date of joining must be within 6 months from today',
    (value) => {
      if (!value) return false;
      const dateOfJoining = dayjs(value);
      const today = dayjs();
      const sixMonthsFromToday = today.add(6, 'month');
      return dateOfJoining.isBefore(sixMonthsFromToday, 'day');
    }
  );
