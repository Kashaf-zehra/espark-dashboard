import * as Yup from 'yup';
import {
  nameValidation,
  notRequiredValidation,
  phoneValidation,
} from './validations';

export const emergency_contact_schema = Yup.object().shape({
  emergency_contact: Yup.object().shape({
    primary: Yup.object().shape({
      name: nameValidation,
      relation: Yup.string().required(
        'Primary contact relationship is required'
      ),
      phone_number: phoneValidation,
      phone_number2: notRequiredValidation,
    }),
    secondary: Yup.object().shape({
      name: nameValidation,
      relation: Yup.string().required(
        'Secondary contact relationship is required'
      ),
      phone_number: phoneValidation,
      phone_number2: notRequiredValidation,
    }),
  }),
});
