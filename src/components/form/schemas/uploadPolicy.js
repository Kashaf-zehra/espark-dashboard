import * as Yup from 'yup';

export const uploadPolicyFormSchema = Yup.object({
  policy_name: Yup.string().required('Policy name is required'),
  policy_doc: Yup.mixed().required('Policy doc is required'),
});
