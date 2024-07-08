import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringAvatar(name) {
  let initials = '';
  const parts = name?.split(' ');

  if (parts?.length === 1) {
    initials = name.charAt(0);
  } else if (parts?.length > 1) {
    initials = parts?.[0]?.charAt(0) + parts?.[parts?.length - 1]?.charAt(0);
  }

  return {
    sx: {
      bgcolor: '#e6f5f4',
      color: '#029E9C',
      fontSize: '12px',
      fontWeight: 400,
      width: '24px',
      height: '24px',
      borderRadius: '100%',
      mx: 'auto',
    },
    children: initials,
  };
}

export default function SidebarUserAvatar({ userName, userImage }) {
  return (
    <Stack direction="row">
      <Avatar
        sx={{
          bgcolor: '#e6f5f4',
          color: '#029E9C',
          fontSize: '12px',
          fontWeight: 400,
          width: '30px',
          height: '30px',
          ml: '-9px',
          mt: '6px',
          border: '1px solid #029E9C',
          borderRadius: '100%',
        }}
      >
        <Avatar
          {...stringAvatar(userName)}
          alt={stringAvatar(userName)?.children}
          src={userImage || '/default-avatar.png'}
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
      </Avatar>
    </Stack>
  );
}
