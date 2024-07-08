export const uploadPolicyForm = [
  {
    title: 'Policy name',
    placeholder: 'Enter name',
    name: 'policy_name',
  },
  {
    title: 'Upload',
    placeholder: 'Upload policy',
    prefixIcon: 'upload',
    type: 'file',
    name: 'policy_doc',
    accept: '.pdf',
    filelabel: 'Accept .pdf files only',
  },
];
