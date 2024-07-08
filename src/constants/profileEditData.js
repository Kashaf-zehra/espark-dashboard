export const Setting_Data = {
  title: 'Settings',
  description:
    'Here you can edit your profile, understand how you can request to export your data and update your notification preferences.',
};

export const Profile_Edit_Section = {
  title: 'Profile Picture',
  profileAvatar: '/icons/avatar.svg',
  buttonIcon: '/icons/upload.svg',
  buttonText: 'Upload Picture',
  alt: 'Profile_Avatar',
};

export const User_Detail = {
  title: 'General',
  buttonText: 'Update',
  Fields: [
    {
      label: 'Email',
      place: 'Email',
      type: 'email',
    },
    {
      label: 'Company Name',
      place: 'Company Name',
      type: 'text',
    },
  ],
};

export const User_Password = {
  title: 'Change your password',
  buttonText: 'Update',
  Fields: [
    {
      label: 'Current Password',
      place: 'Enter password',
      type: 'password',
    },
    {
      label: 'New Password',
      place: 'Enter password',
      type: 'password',
    },
    {
      label: 'Confirm New Password',
      place: 'Enter password',
      type: 'password',
    },
  ],
};
