import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import AppDropdown from '@/src/components/dashboard/appDropdown';
import { getCamelCapitalized } from '@/src/utils/stringModification';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useSelector } from 'react-redux';
import { countWeekendsHandler } from '@/src/utils/helpers';

const LeaveViewModal = ({
  modalData,
  handleClose,
  isEmployee,
  handleApproveRequest,
  handleRejectRequest,
  handleConfirm,
}) => {
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(
    getCamelCapitalized(modalData?.leave_type)
  );
  const { homeData } = useSelector((state) => state?.emp?.home);
  const preetyTime = (time) => {
    if (dayjs(time).format('hh:mm A') === 'Invalid Date') {
      return time;
    } else {
      return dayjs(time).format('hh:mm A');
    }
  };
  const approveRequestAndClose = () => {
    handleApproveRequest(modalData);
    handleClose();
  };
  const handleRejectRequestAndClose = () => {
    handleRejectRequest(modalData);
    handleClose();
  };

  // function getSandwichCounts(startDate, endDate) {
  //   const start = dayjs(startDate);
  //   const end = dayjs(endDate);
  //   let leaveDays = 0;
  //   let offDays = 0;

  //   // Loop through each day in the range
  //   for (
  //     let date = start;
  //     date.isSameOrBefore(end);
  //     date = date.add(1, 'day')
  //   ) {
  //     // Check if the day is a Saturday or Sunday
  //     if (date.day() === 0 || date.day() === 6) {
  //       offDays++;
  //     } else {
  //       leaveDays++;
  //     }
  //   }

  //   return { leaveDays, offDays };
  // }

  const countOfWeekends = countWeekendsHandler(
    modalData.start_date,
    modalData.end_date
  );
  modalData = { ...modalData, count: modalData.count + countOfWeekends };
  return (
    <>
      <Box
        sx={{
          bgcolor: '#fff',
          maxWidth: '1480px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.30)',
          maxHeight: '90%',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ borderBottom: '1px solid #E4E4E4', py: 2, px: 2.8 }}>
          <Typography
            sx={{
              textAlign: { xs: 'center', sm: 'start' },
              fontSize: '25px',
              fontWeight: 600,
            }}
          >
            Leave request view
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
            }}
          >
            <Grid
              container
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Leave type
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <AppDropdown
                  disabled
                  data={[]}
                  setIsLoadingList={setIsLoadingTitles}
                  isLoadingList={isLoadingTitles}
                  selectedItem={selectedLeaveType}
                  setSelectedItem={setSelectedLeaveType}
                  placeHolder="Select Leave Type"
                  padding="9px"
                  mb={'0px'}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Grid
              container
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#fff',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Start date
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    {dayjs(modalData?.start_date).format('MMMM DD,YYYY')}
                  </Typography>
                  <Image
                    src={'/icons/CalendarOutline.svg'}
                    width={20}
                    height={20}
                    alt="Date"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
            }}
          >
            <Grid
              container
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  End date
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    {dayjs(modalData?.end_date).format('MMMM DD,YYYY')}
                  </Typography>
                  <Image
                    src={'/icons/CalendarOutline.svg'}
                    width={20}
                    height={20}
                    alt="Date"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '10px 25px',
          }}
        >
          <Grid
            spacing={'5px'}
            sx={{
              border: 'solid 1px #ccc',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'row',
            }}
            container
            p={'8px'}
          >
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  width: '100%',
                  py: '11px',
                  display: 'flex',
                  justifyContent: 'center',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: { xs: '12px', lg: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  {`${dayjs(modalData?.start_date).format(
                    'MMM DD,YY'
                  )} - ${dayjs(modalData?.end_date).format('MMM DD,YY')}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: { xs: 'column', md: 'row' },
                  border: 'solid 1px #ccc',
                  borderRadius: '5px',
                  mt: '5px',
                  p: '0 5px',
                }}
              >
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    my: '9px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt={modalData?.employee_name}
                    src={
                      homeData?.employee_details?.image ||
                      modalData?.employee_image ||
                      '/default-avatar.png'
                    }
                    width={50}
                    height={50}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                </Box>
                <Box ml={'5px'} pb={'5px'}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: { xs: '12px', lg: '16px' },
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                    }}
                  >
                    {modalData?.employee_name}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: { xs: '10px', lg: '14px' },
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    {modalData?.employee_id}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid display={'flex'} flexDirection={'column'} item xs={12} md={9}>
              <Box
                sx={{
                  width: '100%',
                  py: '11px',
                  display: 'flex',
                  justifyContent: 'center',
                  background: '#f6f6f6',
                }}
              >
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: { xs: '12px', lg: '16px' },
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                  }}
                >
                  {`${dayjs(modalData?.start_date).format('MMMM')} Week ${dayjs
                    .extend(weekOfYear)(modalData?.start_date)
                    .week()}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  border: 'solid 1px #ccc',
                  borderRadius: '5px',
                  mt: '5px',
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  {modalData?.count && modalData?.count > 0
                    ? [...Array(modalData?.count * 1)]?.map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            border: 'solid 1px #ccc',
                            m: '5px',
                            flex: 1,
                            // borderRadius: '5px',
                            overflow: 'hidden',
                            background: '#fff',
                            minWidth: { xs: '91px', sm: '112px' },
                          }}
                          display={'flex'}
                          justifyContent={'flex-end'}
                          flexDirection={'column'}
                        >
                          <Box sx={{ my: '5px' }}>
                            <Typography
                              textAlign={'center'}
                              sx={{
                                color: '#595959',
                                fontSize: { xs: '12px', lg: '14px' },
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                // backgroundColor: '#ccc',
                              }}
                            >
                              {/* Tuesday */}
                              {dayjs(modalData?.start_date)
                                .add(i, 'day')
                                .format('dddd')}
                            </Typography>
                          </Box>
                          <Box sx={{ background: '#F6F6F6' }} p={'0 10px'}>
                            <Typography
                              sx={{
                                color: '#595959',
                                fontSize: { xs: '8px', lg: '9px' },
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                textAlign: { xs: 'center', md: 'center' },
                                p: '8px 0',
                              }}
                            >
                              {/* 10:00 AM-7:00 PM */}
                              {dayjs(modalData?.start_date)
                                .add(i, 'day')
                                .format('dddd') === 'Saturday' ||
                              dayjs(modalData?.start_date)
                                .add(i, 'day')
                                .format('dddd') === 'Sunday'
                                ? 'Day Off'
                                : isEmployee
                                  ? `${preetyTime(homeData?.punch_timings?.check_in)}-${preetyTime(homeData?.punch_timings?.check_out)}`
                                  : `${preetyTime(modalData?.check_in)}-${preetyTime(modalData?.check_out)}`}
                              {/* {isEmployee
                                ? `${preetyTime(homeData?.punch_timings?.check_in)}-${preetyTime(homeData?.punch_timings?.check_out)}`
                                : `${preetyTime(modalData?.check_in)}-${preetyTime(modalData?.check_out)}`} */}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    : null}
                </Box>
                {/* <Box
                  sx={{
                    border: 'solid 1px #ccc',
                    m: '5px',
                    flex: 1,
                    borderRadius: '5px',
                    overflow: 'hidden',
                  }}
                  display={'flex'}
                  justifyContent={'flex-end'}
                  flexDirection={'column'}
                >
                  <Box sx={{ mb: '5px' }}>
                    <Typography
                      textAlign={'center'}
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '12px', lg: '14px' },
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                      }}
                    >
                      Tuesday
                    </Typography>
                  </Box>
                  <Box sx={{ background: '#F6F6F6' }} p={'0 10px'}>
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: { xs: '8px', lg: '10px' },
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        textAlign: { xs: 'center', md: 'left' },
                        p: '8px 0',
                      }}
                    >
                      10:00 AM-7:00 PM
                    </Typography>
                  </Box>
                </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
            }}
          >
            <Grid
              container
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#F6F6F6',
                borderRadius: '5px',
                display: 'flex',
                alignItems: { xs: 'flex-start', md: 'center' },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Count
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '9px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    {modalData?.count - countOfWeekends}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            {/* {!isEmployee && (
              <Grid
                container
                sx={{
                  p: {
                    xs: '12px',
                    md: '5px 5px 5px 20px',
                  },
                  background: '#fff',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: '10px', md: '0px' },
                }}
              >
                <Grid item xs={12} md={5.5}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      paddingLeft: { xs: '0px', md: '20px' },
                    }}
                  >
                    Sandwich count
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '9px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: 'normal',
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )} */}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '10px 20px',
            }}
          >
            {!isEmployee && (
              <Grid
                container
                sx={{
                  p: {
                    xs: '12px',
                    md: '5px 5px 5px 20px',
                  },
                  background: '#F6F6F6',
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: '10px', md: '0px' },
                }}
              >
                <Grid item xs={12} md={5.5}>
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      paddingLeft: { xs: '0px', md: '20px' },
                    }}
                  >
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                      border: 'solid 1px #ccc',
                      p: '9px',
                      borderRadius: '5px',
                      background: '#f6f6f6',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#595959',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: 'normal',
                      }}
                    >
                      {modalData?.count}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Grid
              container
              sx={{
                p: {
                  xs: '12px',
                  md: '5px 5px 5px 20px',
                },
                background: '#fff',
                borderRadius: '5px',
                display: 'flex',
                // alignItems: { xs: "flex-start", md: "center" },
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: '10px', md: '0px' },
              }}
            >
              <Grid item xs={12} md={5.5}>
                <Typography
                  sx={{
                    color: '#595959',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    paddingLeft: { xs: '0px', md: '20px' },
                  }}
                >
                  Reason
                </Typography>
              </Grid>
              <Grid item xs={12} md={6.5} sx={{ width: '100%' }}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  sx={{
                    border: 'solid 1px #ccc',
                    p: '15px',
                    borderRadius: '5px',
                    background: '#f6f6f6',
                    minHeight: '100px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#595959',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: 'normal',
                    }}
                  >
                    {modalData?.reason}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                py: 2,
                pr: 0.5,
              }}
            >
              {/* <Button
                type="submit"
                variant="primary"
                sx={{
                  width: { xs: '105px', sm: '120px' },
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
                onClick={handleClose}
              >
                {'Close'}
              </Button> */}
              {modalData?.status === 'completed' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{ padding: '20px' }}
                >
                  <Button
                    sx={{
                      minWidth: { xs: '100px', md: '120px' },
                    }}
                    onClick={handleClose}
                    variant="outlined"
                    disabled
                  >
                    Approved
                  </Button>
                  <Button
                    sx={{
                      ml: '20px',
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                    variant="outlined"
                  >
                    close
                  </Button>
                </Box>
              ) : modalData?.status === 'reject' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{ padding: '20px' }}
                >
                  <Button
                    sx={{
                      minWidth: { xs: '100px', md: '120px' },
                    }}
                    onClick={handleClose}
                    variant="outlined"
                    disabled
                  >
                    Declined
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      ml: '20px',
                      width: { xs: '105px', sm: '120px' },
                      height: '40px',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              ) : !isEmployee && modalData?.status === 'pending' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Button
                    sx={{
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleRejectRequestAndClose}
                    variant="outlined"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={approveRequestAndClose}
                    sx={{
                      ml: '20px',
                      minWidth: { xs: '100px', md: '120px' },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    variant="contained"
                  >
                    Approve
                  </Button>
                </Box>
              ) : isEmployee && modalData?.status === 'pending' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Button
                    sx={{
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                    variant="outlined"
                  >
                    close
                  </Button>
                  <Button
                    onClick={() => handleConfirm(modalData.id)}
                    sx={{
                      ml: '20px',
                      minWidth: { xs: '100px', md: '120px' },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    variant="contained"
                  >
                    Delete request
                  </Button>
                </Box>
              ) : modalData?.status === 'rejected' ? (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{ padding: '20px' }}
                >
                  <Button
                    sx={{
                      minWidth: { xs: '100px', md: '120px' },
                    }}
                    onClick={handleClose}
                    variant="outlined"
                    disabled
                  >
                    Declined
                  </Button>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      ml: '20px',
                      width: { xs: '105px', sm: '120px' },
                      height: '40px',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              ) : (
                <Box
                  display={'flex'}
                  justifyContent={'flex-end'}
                  sx={{
                    padding: '20px',
                  }}
                >
                  <Button
                    sx={{
                      minWidth: {
                        xs: '100px',
                        md: '120px',
                      },
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                    onClick={handleClose}
                    variant="outlined"
                  >
                    close
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {!isEmployee && (
          <>
            {modalData?.status === 'Pending' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{
                  padding: '20px',
                }}
              >
                <Button
                  sx={{
                    minWidth: {
                      xs: '100px',
                      md: '120px',
                    },
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  Decline
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    ml: '20px',
                    minWidth: { xs: '100px', md: '120px' },
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                  variant="contained"
                >
                  Approve
                </Button>
              </Box>
            ) : modalData?.status === 'Completed' ||
              modalData?.status === 'Rejected' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{ padding: '20px' }}
              >
                <Button
                  sx={{ minWidth: '120px', border: '2px solid red' }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  {modalData?.status}
                </Button>
              </Box>
            ) : null}
          </>
        )}
        {isEmployee && (
          <>
            {modalData?.status === 'Pending' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{ padding: '20px' }}
              >
                <Button
                  sx={{ minWidth: '120px', textTransform: 'math-auto' }}
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel request
                </Button>
              </Box>
            ) : modalData?.status === 'Completed' ||
              modalData?.status === 'Rejected' ||
              modalData?.status === 'Cancelled' ? (
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                sx={{ padding: '20px' }}
              >
                <Button
                  sx={{ minWidth: '120px' }}
                  onClick={handleClose}
                  variant="contained"
                >
                  Close
                </Button>
              </Box>
            ) : null}
          </>
        )}
      </Box>
    </>
  );
};

export default LeaveViewModal;
