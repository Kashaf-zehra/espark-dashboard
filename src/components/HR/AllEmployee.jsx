'use client';
import { Button, Grid, Tab, Tabs } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Input from '../dashboard/input';
import Image from 'next/image';
import EmployeeView from './EmployeeView';
import { useRouter } from 'next/navigation';
import { employeeProfileData } from '@/src/constants/employeeProfile';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { HR_EMPLOYEES } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpData,
  getEmpDataFailed,
  getEmpDataSuccess,
} from '@/src/redux/slices/hrSlices/employeeSlice';
import { Toast } from '../Toast/Toast';
import EmployeeStatus from './ActiveEmployee';
import DashboardHeading from '../dashboard/dashboardHeading';

const AllEmployee = ({ fromClient, openModal }) => {
  const dispatch = useDispatch();
  const { employee_perms } = useSelector((state) => state?.hr?.home?.homeData);
  const { role } = useSelector((state) => state?.auth?.userData);
  const { data } = useSelector((state) => state?.hr?.employees);
  const router = useRouter();
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [search, setSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const theme = useTheme();

  const { isLoading } = useQuery({
    staleTime: 10000,
    refetchOnWindowFocus: false,
    queryKey: ['employeeQuery'],
    queryFn: () => {
      dispatch(getEmpData());
      // console.log('Calling api');
      return api
        .getData(HR_EMPLOYEES)
        .then(({ data }) => {
          // console.log('API Success');
          dispatch(getEmpDataSuccess(data));
          // console.log('API Success1');
          return data || [];
        })
        .catch((error) => {
          Toast('error', error.message || 'Failed to get data');
          // console.log('API Failed');
          dispatch(getEmpDataFailed());
          // console.log({ error });
        });
    },
  });
  const searchFunction = () => {
    const filteredData =
      data === ''
        ? []
        : data?.filter((item) => {
            const nameMatch =
              name === '' ||
              item.name.toLowerCase().includes(name.toLowerCase());
            const designationMatch =
              designation === '' ||
              item.designation
                .toLowerCase()
                .includes(designation.toLowerCase());
            const companyMatch =
              company === '' ||
              item.company.toLowerCase().includes(company.toLowerCase());
            const idMatch =
              id === '' ||
              item.employee_id.toLowerCase().includes(id.toLowerCase());
            return nameMatch && designationMatch && companyMatch && idMatch;
          });
    return filteredData;
  };

  useEffect(() => {
    if (!id && !name && !designation && !company) {
      setFilteredData(data);
    }
  }, [id, name, designation, company, data]);

  const handleSearch = () => {
    setSearch(true);
    setFilteredData(searchFunction());
  };

  if (fromClient)
    return (
      <>
        <Box
          sx={{
            width: '100%',
            marginTop: '10px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: { xs: 'flex-start', md: 'space-between' },
            borderBottom: 'solid 1px #ccc',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            variant="scrollable"
            TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
          >
            <Tab
              value="one"
              label="All"
              wrapped
              sx={{
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
            <Tab
              value="two"
              label="Active employees"
              sx={{
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
            <Tab
              value="three"
              label="Terminated employees"
              sx={{
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
          </Tabs>
          <Button
            onClick={openModal}
            variant="contained"
            sx={{
              my: {
                xs: '20px',
                md: 0,
                color: '#fff',
                background: '#029894',
                '&:hover': {
                  color: '#fff',
                  background: '#029894',
                },
              },
            }}
          >
            {employeeProfileData?.addEmployee}
          </Button>
        </Box>
        {filteredData && filteredData.length > 0 && (
          <>
            {value === 'one' ? (
              <EmployeeStatus
                search={search}
                id={id}
                name={name}
                designation={designation}
                status={'All'}
                isLoading={isLoading}
              />
            ) : value === 'two' ? (
              <EmployeeStatus
                status={'Active'}
                id={id}
                name={name}
                designation={designation}
                search={search}
                isLoading={isLoading}
              />
            ) : (
              <EmployeeStatus
                id={id}
                name={name}
                designation={designation}
                status={'Inactive'}
                search={search}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </>
    );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: 'center',
          width: '100%',
          pb: { xs: 2, sm: 1 },
        }}
      >
        <DashboardHeading title={`${employeeProfileData?.employees}`} />
        {value === 'one' && (
          <>
            {(role === 'super_admin' ||
              (role !== 'super_admin' && employee_perms?.[0]?.write)) && (
              <Button
                sx={{
                  backgroundColor: '#029894',
                  width: { xs: '100%', sm: '160px' },
                  color: '#FFF',
                  fontSize: '16px',
                  textTransform: 'math-auto',
                  '&:hover': {
                    backgroundColor: '#029894',
                    color: '#FFF',
                  },
                }}
                onClick={() =>
                  router.push('/hr/dashboard/employees/add-employee')
                }
              >
                {employeeProfileData?.addEmployee}
              </Button>
            )}
          </>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            variant="scrollable"
            TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
          >
            <Tab
              value="one"
              label="All"
              wrapped
              disableRipple={true}
              sx={{
                mr: '20px',
                textTransform: 'math-auto',
                fontSize: '14px',
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
            <Tab
              value="two"
              label="Active employees"
              disableRipple={true}
              sx={{
                mr: '20px',
                textTransform: 'math-auto',
                fontSize: '14px',
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
            <Tab
              value="three"
              label="Inactive employees"
              disableRipple={true}
              sx={{
                mr: '20px',
                textTransform: 'math-auto',
                fontSize: '14px',
                color: '#595959',
                '&.Mui-selected': {
                  color: '#068987',
                },
              }}
            />
          </Tabs>
        </Box>
        <Grid
          container
          sx={{
            marginBottom: '5px',
            [theme.breakpoints.down('md')]: {
              paddingLeft: '0px',
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '20px',
            },
          }}
          spacing={3}
        >
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={id}
              width={'100%'}
              handleChange={(e) => setId(e)}
              placeHolder={'Employee ID'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'id'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={name}
              width={'100%'}
              handleChange={(e) => setName(e)}
              placeHolder={'Employee name'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'name'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={designation}
              width={'100%'}
              handleChange={(e) => setDesignation(e)}
              placeHolder={'Search designation'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'designation'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.75}>
            <Input
              value={company}
              width={'100%'}
              handleChange={(e) => setCompany(e)}
              placeHolder={'Search company'}
              prefixIcon={'/icons/searchIconWhite.svg'}
              name={'designation'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
              // onClick={() => setSearch(true)}
              onClick={handleSearch}
              sx={{
                backgroundColor: '#029894',
                color: '#FFF',
                height: '40px',
                width: { xs: '100%', md: '50%' },
                '&:hover': {
                  backgroundColor: '#029894',
                  color: '#FFF',
                },
              }}
            >
              <Image
                width={24}
                height={24}
                alt="Refresh"
                src={`/icons/searchIconWhite.svg`}
              />
              {/* <Box
                component={'img'}
                sx={{
                  height: '100px',
                  width: '100px',
                  background: '#fff',
                  borderRadius: '50%',
                  padding: '5px',
                }}
                alt="Employee"
                src={data?.[0]?.image_path}
              /> */}
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ maxWidth: '1480px' }}>
          {filteredData && filteredData.length > 0 && (
            <>
              {value === 'one' ? (
                <EmployeeView
                  search={search}
                  id={id}
                  name={name}
                  designation={designation}
                  status={'All'}
                  data={filteredData}
                  isLoading={isLoading}
                />
              ) : value === 'two' ? (
                <EmployeeView
                  status={'Active'}
                  id={id}
                  name={name}
                  designation={designation}
                  search={search}
                  data={filteredData}
                  isLoading={isLoading}
                />
              ) : (
                <EmployeeView
                  id={id}
                  name={name}
                  designation={designation}
                  status={'Inactive'}
                  search={search}
                  data={filteredData}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AllEmployee;
