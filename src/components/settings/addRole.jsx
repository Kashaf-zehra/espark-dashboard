import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import AppTable from '../appTableNew/AppTable';
import { modulepermissionColumn } from '@/src/constants/data/tables/modulePermission';
import RoleModal from './addRoleModal';
import {
  // ROLES,
  SETTING,
} from '@/src/constants/SettingHr';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  HR_ACCOUNTS,
  HR_ROLES_PERMISSIONS,
} from '@/src/services/apiService/apiEndPoints';
import {
  getAccountsData,
  getRolesDetailsRequest,
  getRolesDetailsSuccess,
} from '@/src/redux/slices/hrSlices/settingsSlice';
import { Toast } from '../Toast/Toast';

const Role = () => {
  const dispatch = useDispatch();
  const companyAccountsQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['get-company-accounts'],
    queryFn: async () => {
      return api
        .getData(`${HR_ACCOUNTS}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  action: ['Delete', 'View'],
                  pic: '/images/users/Bilal.svg',
                }))
              : [];
          dispatch(getAccountsData(tempData || []));
          return tempData || [];
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const getRolesDetailsQuery = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['get-roles-details-accounts'],
    queryFn: async () => {
      return api
        .getData(`${HR_ROLES_PERMISSIONS}`)
        .then(({ data }) => {
          // dispatch(getRolesDetails(data || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  useEffect(() => {
    dispatch(getRolesDetailsRequest());
    let mergedData;
    if (companyAccountsQuery.data && getRolesDetailsQuery.data) {
      mergedData = companyAccountsQuery.data?.map((companyAccount) => {
        const roleDetails = getRolesDetailsQuery.data.find(
          (role) => role.role === companyAccount.account_name
        );

        if (roleDetails) {
          const {
            //  id,
            //  role,
            ...permissions
          } = roleDetails;
          return {
            id: companyAccount.id,
            role: companyAccount.account_name,
            ...permissions,
          };
        } else {
          // If role details not found, provide default permissions
          return {
            id: companyAccount.id,
            role: companyAccount.account_name,
            employee_perms: {
              read: false,
              write: false,
              delete: false,
              download: false,
            },
            client_perms: {
              read: false,
              write: false,
              delete: false,
              download: false,
            },
            leaves_perms: {
              read: false,
              write: false,
              delete: false,
              download: false,
            },
            invoices_perms: {
              read: false,
              write: false,
              delete: false,
              download: false,
            },
            policies_perms: {
              read: false,
              write: false,
              delete: false,
              download: false,
            },
          };
        }
      });
    }
    // const finalData = mergedData
    dispatch(getRolesDetailsSuccess(mergedData || []));
  }, [companyAccountsQuery.data, getRolesDetailsQuery.data]);

  const { accounts, rolesDetails, isLoadingRoleDetails } = useSelector(
    (state) => state?.hr?.settings
  );
  const [rolesData, setRolesData] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissionDataNew, setPermissionDataNew] = useState([]);
  const [selectedRolePermissionIndex, setSelectedRolePermissionIndex] =
    useState(null);

  const handleSelectRow = (column, row) => {
    // Create a copy of permissionDataNew
    const newTempForm = [...permissionDataNew];
    console.log({ row, column, newTempForm });
    // Retrieve the selected role's permission data
    const selectedTempFormData = newTempForm[selectedRolePermissionIndex];

    // Find the index of the row in the permission data
    const manipulateIndex = selectedTempFormData.state.findIndex(
      (el) => el.module_permission === row.module_permission
    );

    // Create a copy of the object you want to update
    const updatedPermission = {
      ...newTempForm[selectedRolePermissionIndex].state[manipulateIndex],
    };
    console.log({ updatedPermission });

    // Update the specific column in the copied object
    if (column.name !== 'read') {
      updatedPermission[column.name] = !updatedPermission[column.name];
      updatedPermission['read'] = true;
    } else {
      // Check if any other column is true
      const anyOtherTrue = Object.keys(updatedPermission).some(
        (key) =>
          key !== 'read' &&
          (updatedPermission['write'] === true ||
            updatedPermission['delete'] ||
            updatedPermission['download'] === true)
      );
      if (updatedPermission['read'] === true && anyOtherTrue) {
        alert('Read cannot be false if any other is true');
        return; // Abort the function
      }
      updatedPermission[column.name] = !updatedPermission[column.name];
    }

    // Update the state immutably by creating a new array with the updated object
    const updatedState = [...newTempForm[selectedRolePermissionIndex].state];
    updatedState[manipulateIndex] = updatedPermission;

    // Update the selected role's state with the updated state
    newTempForm[selectedRolePermissionIndex].state = updatedState;

    // Set the updated state to the state variable
    setPermissionDataNew(newTempForm);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!true);
  };

  const handleRoleChange = (id, val) => {
    setRolesData({ ...rolesData, [id]: val });
    setSelectedRole((prevSelectedRole) =>
      prevSelectedRole === id ? null : id
    );
    const selectedRoleIndex = permissionDataNew.findIndex((el) => el.id === id);
    setSelectedRolePermissionIndex(selectedRoleIndex);
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function generateRoleDetailsWithState(rolesDetails) {
    return rolesDetails?.map((role) => {
      const state = Object.keys(role)
        .filter((key) => key.includes('_perms'))
        ?.map((permissionKey) => ({
          module_permission: capitalizeFirstLetter(
            permissionKey.replace('_perms', '')
          ),
          name: permissionKey,
          read: role[permissionKey].read,
          write: role[permissionKey].write,
          delete: role[permissionKey].delete,
          download: role[permissionKey].download,
          formActionStatus: true, // Assuming default value for formActionStatus
          isNewModulePermission: true, // Assuming default value for isNewModulePermission
        }));

      return {
        id: role.id,
        role: role.role,
        state: state,
      };
    });
  }

  useEffect(() => {
    const tempDataNew = rolesDetails.length
      ? generateRoleDetailsWithState(rolesDetails)
      : [];
    setPermissionDataNew(tempDataNew);
  }, [accounts, rolesDetails]);

  useEffect(() => {}, [permissionDataNew, selectedRolePermissionIndex]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return api.updateJSONData(
        `${HR_ROLES_PERMISSIONS}?id=${data.id}`,
        data.state
      );
    },
    onSuccess: ({ data }) => {
      Toast('success', 'Data updated successfully');
      console.log({ data });
      // dispatch(deleteClientHiringRequestSuccess(modalData?.id));
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      // dispatch(deleteClientHiringRequestFailed());
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  function convertArrayToObject(array) {
    const result = {};

    array.forEach((item) => {
      const { name, read, write, delete: del, download } = item;
      result[name] = { read, write, delete: del, download };
    });

    return result;
  }
  const handleSaveRolePermissions = () => {
    if (
      selectedRolePermissionIndex === undefined ||
      selectedRolePermissionIndex === null
    ) {
      Toast('warning', 'Please select role');
      return;
    } else {
      const data = permissionDataNew[selectedRolePermissionIndex];
      const state = convertArrayToObject(data.state);
      mutate({ id: data.id, state });
    }
  };

  return (
    <>
      {getRolesDetailsQuery.isLoading ||
      companyAccountsQuery.isLoading ||
      isLoadingRoleDetails ? (
        <Skeleton
          animation="wave"
          width={'100%'}
          height={40}
          sx={{ background: '#F6F6F6' }}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}
          marginTop={'30px'}
        >
          <Box
            sx={{
              maxWidth: { xs: '100%', md: '320px' },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '5px',
              background: '#F6F6F6',
              boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
              height: ' 520px',
              gap: '15px',
              py: 1.5,
              px: { xs: 1, md: 0.5 },
              mx: 'auto',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: '#595959',
                fontWeight: '500',
                padding: '5px',
                ml: '-15px',
              }}
            >
              {SETTING?.roles}
            </Typography>
            <Box
              className="scrollbar-container"
              paddingBottom="20px"
              paddingLeft={'7px'}
            >
              {rolesDetails?.map((button, index) => (
                <Button
                  key={index}
                  sx={{
                    borderRadius: '5px',
                    color: selectedRole === button.id ? 'teal' : '#595959',
                    background: selectedRole === button.id ? '#FFF' : '#fff',
                    width: '98%',
                    padding: '8px',
                    border:
                      selectedRole === button.id
                        ? '1px solid #029894'
                        : '1px solid #fff',
                    '&:hover': {
                      border: ' 1px solid #029894',
                      color: 'teal',
                      background: ' #FFF',
                    },
                  }}
                  onClick={() => {
                    handleRoleChange(button?.id, button?.account_name, button);
                  }}
                >
                  {button.role}
                </Button>
              ))}
            </Box>
            <RoleModal open={open} handleClose={handleClose} />
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: 'calc(100% - 320px)' },
              maxWidth: '100%',
              overflowX: 'auto',
              // '&::-webkit-scrollbar': {
              //   display: 'none',
              // },
            }}
          >
            <Box>
              <AppTable
                column={modulepermissionColumn}
                data={permissionDataNew[selectedRolePermissionIndex]?.state}
                handleClickActionView={handleSelectRow}
                noPagination
                isLoading={getRolesDetailsQuery?.isLoading}
                minWidth={'1135px'}
              />
            </Box>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              p={'0 10px'}
              mt={'3px'}
            >
              <Button
                onClick={handleSaveRolePermissions}
                sx={{
                  minWidth: '120px',
                  fontSize: '16px',
                  backgroundColor: isPending ? '#ccc' : '#029894',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: isPending ? '#ccc' : '#029894',
                    color: '#fff',
                  },
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <CircularProgress size={26} color="secondary" />
                ) : (
                  SETTING?.save
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Role;
