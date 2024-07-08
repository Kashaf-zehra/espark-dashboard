import * as Yup from 'yup';
import { emailValidation, nameValidation } from './validations';

export const assetFormSchema = Yup.object({
  gadget: Yup.string().required('Gadget name is required'),
  asset_id: Yup.string().required('Asset id is required'),
  assigned_date: Yup.string().required('Assigned date is required'),
  assignee_name: nameValidation,
  assignee_email: emailValidation,
});
