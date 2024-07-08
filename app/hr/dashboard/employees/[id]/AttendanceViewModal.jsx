import React from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import EmployeeDetailRow from './EmployeeDetailRow';
import EmployeeRequestDetailRow from './EmployeeRequestDetailRow';
import dayjs from 'dayjs';

const AttendanceViewModal = ({ modalData, empData, handleClose, image }) => {
  function formatDate(inputDate) {
    // Split the date string into day, month, and year
    var parts = inputDate.split('-');

    // Reorder the parts to form the new date format
    var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];

    return formattedDate;
  }
  const fontSize = {
    '@media (min-width: 280px) and (max-width: 400px)': {
      fontSize: '12px',
    },
  };
  const employeeData = [
    [
      ['Employee ID:', 'es-00020', 'employee_id'],
      ['Company:', 'eSpark talent', 'company'],
      ['Branch:', 'Jauhar, Block 1', 'location'],
      ['Job title:', 'Web developer', 'job_title'],
    ],
    [
      ['Name:', 'Bilal Khan', 'employee_name'],
      ['Location:', 'Karachi, Pakistan', 'location'],
      ['Department:', 'Software', 'department'],
      ['Joining date:', 'Oct26,2021', 'joining_date', 'date'],
    ],
  ];
  const attendanceData = [
    ['Date:', 'November 1, 2023', 'date', 'date'],
    ['Expected check in:', '10:00 AM', 'expect_check_in'],
    ['Check in time:', modalData?.checkIn, 'check_in'],
    ['Expected check out:', '07:00 PM', 'expect_check_out'],
    ['Check out time:', modalData?.checkOut, 'check_out'],
  ];

  return (
    <Box
      sx={{
        mx: 'auto',
        bgcolor: '#fff',
        width: { xs: '90%', sm: '90%', md: '77.084%' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
        maxHeight: '80%',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ borderBottom: '1px solid #E4E4E4', p: 2 }}>
        <Typography
          sx={{
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          Attendance view
        </Typography>
      </Box>
      <Box p={'40px'}>
        <Grid
          container
          display={'flex'}
          flexDirection={'row'}
          sx={{
            '@media (min-width: 900px) and (max-width: 1370px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Grid item xs={12} md={2.25}>
            <Box
              sx={{
                width: '176px',
                height: '176px',
                borderRadius: '50%',
                padding: '5px',
                background: '#f6f6f6',
              }}
            >
              <Avatar
                sx={{
                  width: '100%',
                  height: '100%',
                  marginBottom: { xs: '15px', md: '0px' },
                  '@media (min-width: 900px) and (max-width: 1370px)': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '15px',
                  },
                }}
                src={image || ''}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9.75}>
            <Grid container columnSpacing={'40px'}>
              {employeeData?.map((item, empIndex) => {
                return (
                  <Grid item xs={12} md={6} key={empIndex}>
                    {item?.map((row, rowIndex) => (
                      <EmployeeDetailRow
                        darkBack={!(rowIndex % 2)}
                        key={rowIndex}
                        label={row[0]}
                        value={
                          row[3] === 'date'
                            ? dayjs(empData[row[2]]).format('MMMDD, YYYY')
                            : empData[row[2]]
                        }
                        fontSize={fontSize}
                      />
                    ))}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: '20px',
        }}
      >
        {attendanceData?.map((data, dataIndex) => (
          <EmployeeRequestDetailRow
            darkBack={!(dataIndex % 2)}
            key={dataIndex}
            label={data[0]}
            value={
              data[3] === 'date'
                ? dayjs(formatDate(modalData[data[2]])).format(
                    'MMMM DD, YYYY'
                  ) ||
                  dayjs(formatDate(empData[data[2]])).format('MMMM DD, YYYY')
                : modalData[data[2]] || empData[data[2]]
            }
          />
        ))}
      </Box>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        sx={{ padding: '20px' }}
      >
        <Button
          onClick={handleClose}
          sx={{
            ml: '20px',
            width: '120px',
            background: '#029894',
            color: '#fff',
            ':&hover:': {
              background: '#029894',
            },
          }}
          variant="contained"
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceViewModal;
