import React from 'react';
import AppTable from '@/src/components/appTableNew/AppTable';

import { employeeLeaveBalanceColumn } from '@/src/constants/data/tables/requestsData';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import { EMP_LEAVE_REQUEST } from '@/src/services/apiService/apiEndPoints';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEmpLeaveRequestDataSuccess,
  fetchEmpLeaveRequestData,
  getEmpLeaveRequestDataFailed,
} from '@/src/redux/slices/employeeSlices/leaveRequestSlice';
import { Toast } from '@/src/components/Toast/Toast';
import dayjs from 'dayjs';

const LeaveBalanceTable = () => {
  const dispatch = useDispatch();

  const { currentWorkSpace } = useSelector((state) => state?.emp?.home);
  const { balance } = useSelector((state) => state?.emp?.leaveReq?.data);
  const { isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => {
      dispatch(fetchEmpLeaveRequestData());
      return api
        .getData(
          `${EMP_LEAVE_REQUEST}/?workspace=${currentWorkSpace?.email || ''}`
        )
        .then(({ data }) => {
          const tempData = {
            ...data,
            balance: reformData(data?.balance),
            requests: data?.requests?.length
              ? data?.requests?.map((item) => ({
                  ...item,
                  requested_at: dayjs(item?.requested_at).format(
                    'YYYY-MM-DD hh:mm A'
                  ),
                }))
              : [],
          };
          dispatch(getEmpLeaveRequestDataSuccess(tempData));
          return data;
        })
        .catch((err) => {
          console.log({ err });
          Toast('error', err.message || 'Failed to get data');
          dispatch(getEmpLeaveRequestDataFailed());
        });
    },
  });
  const reformData = (dataObj) => {
    const arrayfiedData = Object.entries(dataObj);
    const refinedData = [];
    for (let i = 0; i < arrayfiedData.length; i++) {
      const element = arrayfiedData[i];
      if (i > 0) {
        if (element[1].status !== 'disable') {
          refinedData.push({
            leave_type:
              element[0] === 'hajj_leaves' ? 'hajj_/_umrah_leaves' : element[0],
            ...element[1],
          });
        }
      }
    }
    return refinedData;
  };

  return (
    <AppTable
      isLoading={isLoading}
      column={employeeLeaveBalanceColumn}
      data={balance}
      noPagination
      minWidth={'700px'}
    />
  );
};

export default LeaveBalanceTable;
