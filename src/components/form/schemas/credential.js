import * as Yup from 'yup';
import { emailValidation } from './validations';

export const credentialFormSchema = Yup.object({
  emailCredential: emailValidation,
  passwordCredential: Yup.mixed().required('Required'),
});
