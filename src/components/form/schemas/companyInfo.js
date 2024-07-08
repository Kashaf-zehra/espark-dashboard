import * as Yup from 'yup';
import { emailValidation, websiteValidation } from './validations';

export const companyInfoSchema = Yup.object({
  company_name: Yup.string().required('Company name is required'),
  company_email: emailValidation,
  website_url: websiteValidation,
  image: Yup.mixed().required('Required'),
});
