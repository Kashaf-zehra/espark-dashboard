'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Tabs, Tab, Button } from '@mui/material';
import { Box } from '@mui/system';
import Breadcrumb from '@/src/components/form/step/Breadcrumb';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { renderTable } from './renderComponents';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useParams } from 'next/navigation';
import HiringRequestModal from './HiringRequestModal';
import AddContractModal from './AddContractModal';
import UploadInvoiceModal from './UploadInvoiceModal';
import AddEmployeeModal from './AddEmployeeModal';
import AddInterviewModal from './AddInterviewModal';
import AddOnboardModal from './AddOnboardModal';
import { useSearchParams } from 'next/navigation';

import { CLIENTPROFILE } from '@/src/constants/ClientProfile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/services/apiService';
import {
  DOWNLOAD_EMP_INV,
  DOWNLOAD_OTH_INV,
  HR_CLIENT_EMPLOYEES,
  HR_CLIENT_EMPLOYEE_INVOICE,
  HR_CLIENT_EMP_HIRING_REQUEST,
  HR_CLIENT_EMP_INTERVIEW_SCHEDULE,
  HR_CLIENT_EMP_ON_BOARDING,
  HR_CLIENT_OTHER_INVOICE,
  HR_GET_CLIENT_PROFILE,
} from '@/src/services/apiService/apiEndPoints';
import {
  deleteEmpInv,
  deleteHiringRequest,
  deleteInterSchedule,
  deleteOnBoarding,
  deleteOthInv,
  getClientEmpInvoicePaid,
  getClientEmpInvoicePending,
  getClientEmpInvoiceProcessing,
  getClientHiringRequest,
  getClientInterviewSchedule,
  getClientOnboarding,
  getClientOthInvoicePaid,
  getClientOthInvoicePending,
  getClientOthInvoiceProcessing,
  getCurrentClientData,
  getCurrentClientDataFailed,
  getCurrentClientDataSuccess,
  removeActiveClientAndData,
  updateEmpInv,
  updateOthInv,
} from '@/src/redux/slices/hrSlices/clientSlice';
import { useDispatch, useSelector } from 'react-redux';
import ClientProfileData from './ClientProfileData';
import {
  hiringRequestColumn,
  interviewScheduleColumn,
  onboardingColumn,
} from '@/src/constants/data/tables/hr/hireOnBoard';
import { a11yProps } from '@/src/utils/tabs';
import {
  invoicePaymentColumn,
  otherPaymentColumn,
} from '@/src/constants/data/tables/hr/invoices';
import { getCamelCapitalized } from '@/src/utils/stringModification';
import UploadOtherInvoiceModal from './UploadOtherInvoiceModal';
import { Toast } from '@/src/components/Toast/Toast';
import ProfileEditSkeleton from '@/src/components/HR/ProfileEditSkeleton';
import dayjs from 'dayjs';

const AddEmployee = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { hireAndOnBoard, employeeInvoices, otherInvoices } = useSelector(
    (state) => state?.hr?.clients?.currentClientData
  );
  const { email } = useSelector((state) => state?.hr?.clients?.currentClient);
  const { client_perms, invoices_perms } = useSelector(
    (state) => state?.hr?.home?.homeData
  );
  const { role } = useSelector((state) => state?.auth?.userData);
  const { isLoading, isFetching } = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-client-info-query'],
    queryFn: () => {
      dispatch(getCurrentClientData());
      return api
        .getData(`${HR_GET_CLIENT_PROFILE}?id=${params.id}`)
        .then(({ data }) => {
          dispatch(getCurrentClientDataSuccess(data));
          return data;
        })
        .catch((err) => {
          dispatch(getCurrentClientDataFailed());
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });

  const ClientHiringReqQuery = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-client-hiring-req-query'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMP_HIRING_REQUEST}?id=${params.id}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? data?.map((item) => ({
                  ...item,
                  salary_range: `${item.salary_range.minimum}$ - ${item.salary_range.maximum}$`,
                  action: ['Delete'],
                }))
              : [];
          dispatch(getClientHiringRequest(tempData));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientInterviewSchedule = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-interview-schedule-req-query'],
    queryFn: () => {
      console.log('Calling api');
      return api
        .getData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}?id=${params.id}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? [...data]?.map((item) => ({
                  ...item,
                  action: ['Delete'],
                  interview_date_time: dayjs(item?.interview_date_time).format(
                    'YYYY-MM-DD hh:mm A'
                  ),
                }))
              : [];
          dispatch(getClientInterviewSchedule(tempData || []));
          return tempData;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientOnBoarding = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-client-on-board-req-query'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMP_ON_BOARDING}?id=${params.id}`)
        .then(({ data }) => {
          const tempData =
            data !== ''
              ? [...data]?.map((item) => ({
                  ...item,
                  dropdownStatus: true,
                  action: ['Delete'],
                }))
              : [];
          dispatch(getClientOnboarding(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientEmployeesAll = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-all'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=all`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientEmployeesActive = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-active'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=active`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const ClientEmployeesTerminated = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-terminated'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEES}?c_email=${email}&tab=terminated`)
        .then(({ data }) => {
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const EmployeeInvoicesPending = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-invoices-pending'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=pending`)
        .then(({ data }) => {
          const tempData = data?.length
            ? data?.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoicePending(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const EmployeeInvoicesProcessing = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-invoices-processing'],
    queryFn: () => {
      return api
        .getData(
          `${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=processing`
        )
        .then(({ data }) => {
          const tempData = data?.length
            ? data?.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoiceProcessing(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const EmployeeInvoicesPaid = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-employees-invoices-paid'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_EMPLOYEE_INVOICE}?client_id=${email}&tab=paid`)
        .then(({ data }) => {
          const tempData = data?.length
            ? data?.map((item) => ({
                ...item,
                dropdownStatus: true,
                action: ['Delete'],
                actionStatus: true,
                download: 'Download',
                payment_status: getCamelCapitalized(item.payment_status),
              }))
            : [];
          dispatch(getClientEmpInvoicePaid(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const OtherInvoicesPending = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-other-invoices-pending'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=pending`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data?.map((item) => ({
              ...item,
              dropdownStatus: true,
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoicePending(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const OtherInvoicesProcessing = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-other-invoices-processing'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=processing`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data?.map((item) => ({
              ...item,
              dropdownStatus: true,
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          console.log({ tempData });
          dispatch(getClientOthInvoiceProcessing(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  const OtherInvoicesPaid = useQuery({
    staleTime: 100000,
    refetchOnWindowFocus: false,
    queryKey: ['hr-clients-other-invoices-paid'],
    queryFn: () => {
      return api
        .getData(`${HR_CLIENT_OTHER_INVOICE}?client_id=${email}&tab=paid`)
        .then(({ data }) => {
          const tempData =
            data?.length &&
            data?.map((item) => ({
              ...item,
              dropdownStatus: true,
              action: ['Delete'],
              actionStatus: true,
              download: 'Download',
              payment_status: getCamelCapitalized(item.payment_status),
            }));
          dispatch(getClientOthInvoicePaid(tempData || []));
          return data;
        })
        .catch((err) => {
          Toast('error', err.message || 'Failed to get data');
          console.log({ err });
        });
    },
  });
  function processColumns(column) {
    const action =
      role === 'super_admin' ||
      (role !== 'super_admin' && client_perms?.[0].delete);
    const download =
      role === 'super_admin' ||
      (role !== 'super_admin' && client_perms?.[0].delete);
    const payment_status =
      role === 'super_admin' ||
      (role !== 'super_admin' && client_perms?.[0].write);
    return column.filter(
      (item) =>
        (action || item.name !== 'action') &&
        (download || item.name !== 'download') &&
        (payment_status || item.name !== 'payment_status')
    );
  }

  useEffect(() => {
    ClientHiringReqQuery.refetch();
    ClientInterviewSchedule.refetch();
    ClientOnBoarding.refetch();
    EmployeeInvoicesPending.refetch();
    EmployeeInvoicesProcessing.refetch();
    EmployeeInvoicesPaid.refetch();
    OtherInvoicesPending.refetch();
    OtherInvoicesProcessing.refetch();
    OtherInvoicesPaid.refetch();
  }, []);

  const searchParams = useSearchParams();

  const search = searchParams.get('param');
  const clientProfileTabs = [
    {
      label: 'Hire & onboard',
      hasNestedTabs: true,
      prop: a11yProps(0),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'Hiring request',
          data: hireAndOnBoard.hiringRequest,
          column: processColumns(hiringRequestColumn),
        },
        {
          prop: a11yProps(1),
          label: 'Interview schedule',
          data: hireAndOnBoard.interviewSchedule,
          column: processColumns(interviewScheduleColumn),
        },
        {
          prop: a11yProps(2),
          label: 'Onboarding',
          data: hireAndOnBoard.onBoarding,
          column: processColumns(onboardingColumn),
        },
      ],
      isTable: true,
    },
    {
      label: 'Employees',
      hasNestedTabs: true,
      prop: a11yProps(1),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'All',
          data: ClientEmployeesAll.data || [],
        },
        {
          prop: a11yProps(1),
          label: 'Active employees',
          data: ClientEmployeesActive.data || [],
        },
        {
          prop: a11yProps(2),
          label: 'Terminated employees',
          data: ClientEmployeesTerminated.data || [],
        },
      ],
      isTable: false,
    },
    {
      label: 'Employee invoices',
      hasNestedTabs: true,
      prop: a11yProps(3),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'Pending',
          data: employeeInvoices?.pending,
          column: processColumns(invoicePaymentColumn),
        },
        {
          prop: a11yProps(1),
          label: 'Processing',
          data: employeeInvoices?.processing,
          column: processColumns(invoicePaymentColumn),
        },
        {
          prop: a11yProps(2),
          label: 'Paid',
          data: employeeInvoices?.paid,
          column: processColumns(invoicePaymentColumn),
        },
      ],
      isTable: true,
    },
    {
      label: 'Other invoices',
      hasNestedTabs: true,
      prop: a11yProps(4),
      nestedTabs: [
        {
          prop: a11yProps(0),
          label: 'Pending',
          data: otherInvoices?.pending,
          column: processColumns(otherPaymentColumn),
        },
        {
          prop: a11yProps(1),
          label: 'Processing',
          data: otherInvoices?.processing,
          column: processColumns(otherPaymentColumn),
        },
        {
          prop: a11yProps(2),
          label: 'Paid',
          data: otherInvoices?.paid,
          column: processColumns(otherPaymentColumn),
        },
      ],
      isTable: true,
    },
  ];
  const [isOpenHiringRequestModal, setIsOpenHiringRequestModal] =
    useState(false);
  const [isOpenAddInterviewModal, setIsOpenAddInterviewModal] = useState(false);
  const [isOpenAddOnboardModal, setIsOpenAddOnboardModal] = useState(false);
  const [isOpenContractModal, setIsOpenContractModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [isOpenUploadInvoiceModal, setIsOpenUploadInvoiceModal] =
    useState(false);
  const [isOpenUploadOthInvoiceModal, setIsOpenUploadOthInvoiceModal] =
    useState(false);
  const [isOpenAddClientModal, setIsOpenAddClientModal] = useState(false);
  const [currentTab, setCurrentTab] = useState({
    label: 'Hire & onboard',
    val: 0,
    nested: {
      label: 'Hiring Request',
      val: 0,
    },
  });

  useEffect(() => {
    if (search === 'employee_invoices') {
      const colData = clientProfileTabs.find(
        (tab) => tab.label === 'Employee invoices'
      );
      setCurrentTab((ps) => {
        return {
          ...ps,
          label: 'Employee invoices',
          val: 2,
          nested: {
            label: 'Pending',
            data: employeeInvoices?.pending,
            column: processColumns(invoicePaymentColumn),
            val: 0,
          },
        };
      });
      setCurrentTabTable((ps) => ({
        ...ps,
        data: employeeInvoices.pending,
        column: colData?.nestedTabs?.[0]?.column,
      }));
    } else if (search === 'other_invoices') {
      const colData = clientProfileTabs.find(
        (tab) => tab.label === 'Other invoices'
      );
      setCurrentTab((ps) => {
        return {
          ...ps,
          label: 'Other invoices',
          val: 3,
          nested: {
            label: 'Pending',
            data: otherInvoices?.pending,
            column: processColumns(otherPaymentColumn),
            val: 0,
          },
        };
      });
      setCurrentTabTable((ps) => ({
        ...ps,
        data: otherInvoices.pending,
        column: colData?.nestedTabs?.[0]?.column,
      }));
    }
  }, [employeeInvoices?.pending, otherInvoices?.pending, search]);
  const [currentTabTable, setCurrentTabTable] = useState({
    data: hireAndOnBoard?.hiringRequest,
    column: clientProfileTabs?.[0].nestedTabs?.[0]?.column,
  });

  useEffect(() => {
    setCurrentTabTable((ps) => ({
      ...ps,
      data: hireAndOnBoard.hiringRequest,
    }));
  }, [hireAndOnBoard.hiringRequest]);
  const handleChangeCurrentTab = (event, newValue) => {
    const current = clientProfileTabs[newValue];
    const { label, nestedTabs, data, column } = current;
    setCurrentTab((ps) => {
      return {
        ...ps,
        label,
        val: newValue,
        nested: {
          label: nestedTabs[0]?.label,
          val: 0,
        },
      };
    });
    console.log({ label, nestedTabs, data, column, currentTab });
    if (data?.length) {
      const filteredData = filterTableRowsWRTTab(data, {
        paymentStatus: nestedTabs[0].label,
      });
      setCurrentTabTable({
        data: filteredData || [],
        column,
      });
    } else if (nestedTabs?.length) {
      setCurrentTabTable({
        data: nestedTabs[0].data || [],
        column: nestedTabs[0].column,
      });
    } else {
      setCurrentTabTable({
        data: [],
      });
    }
  };
  const handleChangeNestedTab = (event, newValue, data, rest) => {
    const current = data[newValue];
    const { label } = current;
    setCurrentTab((ps) => {
      return {
        ...ps,
        nested: {
          label,
          val: newValue,
        },
      };
    });
    console.log({ current });
    if (current?.column?.length) {
      console.log('currentData');
      console.log({ event, newValue, data, rest, current });
      setCurrentTabTable({
        data: current?.data || [],
        column: current?.column,
      });
    } else if (rest?.column?.length) {
      console.log('restData');
      console.log({ event, newValue, data, rest, current });
      setCurrentTabTable({
        data: rest?.data || [],
        column: rest?.column,
      });
    }
  };
  const handleOpenModal = () => {
    setEditModal(true);
  };
  const handleCloseModal = () => {
    setEditModal(false);
  };
  const handleOpenHiringRequestModal = () => {
    setIsOpenHiringRequestModal(true);
  };
  const handleCloseHiringRequestModal = () => {
    setIsOpenHiringRequestModal(false);
  };
  const handleOpenAddInterviewModal = () => {
    setIsOpenAddInterviewModal(true);
  };
  const handleCloseAddInterviewModal = () => {
    setIsOpenAddInterviewModal(false);
  };
  const handleOpenAddOnboardModal = () => {
    setIsOpenAddOnboardModal(true);
  };
  const handleCloseAddOnboardModal = () => {
    setIsOpenAddOnboardModal(false);
  };
  const handleCloseContractModal = () => {
    setIsOpenContractModal(false);
  };
  const handleOpenUploadInvoiceModal = () => {
    setIsOpenUploadInvoiceModal(true);
  };
  const handleCloseUploadInvoiceModal = () => {
    setIsOpenUploadInvoiceModal(false);
  };
  const handleOpenUploadOthInvoiceModal = () => {
    setIsOpenUploadOthInvoiceModal(true);
  };
  const handleCloseUploadOthInvoiceModal = () => {
    setIsOpenUploadOthInvoiceModal(false);
  };
  const handleOpenAddClientModal = () => {
    setIsOpenAddClientModal(true);
  };
  const handleCloseAddClientModal = () => {
    setIsOpenAddClientModal(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(null);
  const [deleteInvType, setDeleteInvType] = useState(null);
  const [updateRowID, setUpdateRowID] = useState(null);
  const [updateStatusType, setUpdateStatusType] = useState({
    currentVal: null,
    newVal: null,
    currentInvData: null,
  });
  const handleClose = () => setIsOpen(false);
  const handleOpen = (id, row) => {
    console.log({ id, row });
    setDeleteRowID(id);
    if (currentTab?.label !== 'Hire & onboard') {
      setDeleteInvType(row?.payment_status.toLowerCase());
    }
    setIsOpen(true);
  };
  const deleteStartHiringMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_HIRING_REQUEST}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteHiringRequest(deleteRowID));
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteInterviewMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_INTERVIEW_SCHEDULE}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteInterSchedule(deleteRowID));
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteOnBoardingMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMP_ON_BOARDING}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteOnBoarding(deleteRowID));
      setDeleteRowID(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteEmpInvMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_EMPLOYEE_INVOICE}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteEmpInv({ type: deleteInvType, id: deleteRowID }));
      setDeleteRowID(null);
      setDeleteInvType(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const deleteOthInvMutation = useMutation({
    mutationFn: async (id) => {
      return api.daleteData(`${HR_CLIENT_OTHER_INVOICE}/?id=${id}`);
    },
    onSuccess: () => {
      Toast('success', 'Data deleted successfully');
      dispatch(deleteOthInv({ type: deleteInvType, id: deleteRowID }));
      setDeleteRowID(null);
      setDeleteInvType(null);
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to delete data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const updateEmpInvMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      for (const key in data.data) {
        formData.append(key, data.data[key]);
      }
      return api.updateData(`${data?.url}/?id=${data?.id}`, formData);
    },
    onSuccess: () => {
      Toast('success', 'Data updated successfully');
      if (currentTab?.label === 'Employee invoices') {
        dispatch(
          updateEmpInv({
            currentVal: updateStatusType.currentVal,
            id: updateRowID,
            newVal: updateStatusType.newVal,
            data: updateStatusType?.currentInvData,
          })
        );
      } else {
        dispatch(
          updateOthInv({
            currentVal: updateStatusType.currentVal,
            id: updateRowID,
            newVal: updateStatusType.newVal,
            data: updateStatusType?.currentInvData,
          })
        );
      }
      setDeleteRowID(null);
      setUpdateStatusType({
        currentInvData: null,
        newVal: null,
        currentVal: null,
      });
      handleClose();
    },
    onError: (err) => {
      Toast('error', err.message || 'Failed to update data');
      handleClose();
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const handleConfirmDeleteHiringReq = () => {
    console.log({ deleteRowID });
    if (currentTab?.label === 'Hire & onboard') {
      if (currentTab?.nested.val === 0) {
        deleteStartHiringMutation.mutate(deleteRowID);
      } else if (currentTab?.nested.val === 1) {
        deleteInterviewMutation.mutate(deleteRowID);
      } else {
        deleteOnBoardingMutation.mutate(deleteRowID);
      }
    } else if (currentTab?.label === 'Employee invoices') {
      deleteEmpInvMutation.mutate(deleteRowID);
    } else {
      deleteOthInvMutation.mutate(deleteRowID);
    }
  };
  const handleConfirmUpdatePayStatus = (data, newVal) => {
    console.log({ data, newVal });
    setUpdateRowID(data.id);
    setUpdateStatusType({
      currentVal: data.payment_status,
      newVal: newVal,
      currentInvData: data,
    });
    const updData = {
      payment_status: newVal?.toLowerCase(),
    };
    updateEmpInvMutation.mutate({
      id: data?.id,
      data: updData,
      url:
        currentTab?.label === 'Employee invoices'
          ? HR_CLIENT_EMPLOYEE_INVOICE
          : HR_CLIENT_OTHER_INVOICE,
    });
  };
  const getCurrentTabData = () => {
    if (currentTab?.label === 'Hire & onboard') {
      if (currentTab?.nested.val === 0) {
        return hireAndOnBoard?.hiringRequest || [];
      } else if (currentTab?.nested.val === 1) {
        return hireAndOnBoard?.interviewSchedule || [];
      } else {
        return hireAndOnBoard?.onBoarding || [];
      }
    } else if (currentTab?.label === 'Employee invoices') {
      if (currentTab?.nested.val === 0) {
        return employeeInvoices?.pending || [];
      } else if (currentTab?.nested.val === 1) {
        return employeeInvoices?.processing || [];
      } else {
        return employeeInvoices?.paid || [];
      }
    } else {
      if (currentTab?.nested.val === 0) {
        return otherInvoices?.pending || [];
      } else if (currentTab?.nested.val === 1) {
        return otherInvoices?.processing || [];
      } else {
        return otherInvoices?.paid || [];
      }
    }
  };
  const handleDispatch = () => {
    dispatch(removeActiveClientAndData());
  };
  const resolveURL = (id) => {
    let url;
    if (currentTab.val === 2) {
      url = `${DOWNLOAD_EMP_INV}?id=${id}`;
    } else {
      url = `${DOWNLOAD_OTH_INV}?id=${id}`;
    }
    return url;
  };
  const downloadInvoiceMutation = useMutation({
    mutationFn: async (id) => {
      return api.downloadFile(resolveURL(id));
    },
    onSuccess: ({ data }) => {
      console.log({ data });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // dispatchFunction?.(data);
      Toast('success', 'File downloaded');
    },
    onError: (err) => {
      Toast('error', err.message || 'File not downloaded');
      // dispatch(getTimeSheetDataFailed());
      console.log({ err });
      console.log({ err: err.message, name: err.name, stack: err.stack });
    },
  });
  const downloadInvoice = (id) => {
    downloadInvoiceMutation.mutate(id);
  };

  return (
    <>
      {isFetching ||
      ClientHiringReqQuery.isFetching ||
      ClientInterviewSchedule.isFetching ||
      ClientOnBoarding.isFetching ||
      EmployeeInvoicesPending.isFetching ||
      EmployeeInvoicesProcessing.isFetching ||
      EmployeeInvoicesPaid.isFetching ||
      OtherInvoicesPending.isFetching ||
      OtherInvoicesProcessing.isFetching ||
      OtherInvoicesPaid.isFetching ? (
        <ProfileEditSkeleton isClient={true} />
      ) : (
        <Box>
          <Breadcrumb
            dispatchFunction={handleDispatch}
            root="clients"
            title="Clients /"
            currentPage="Profile"
          />
          <Box mb={'40px'}>
            <Typography
              sx={{
                color: '#171717',
                fontSize: '30px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
              }}
            >
              {CLIENTPROFILE?.profile}
            </Typography>
          </Box>
          <>
            {isLoading ||
            ClientHiringReqQuery.isLoading ||
            ClientInterviewSchedule.isLoading ||
            ClientOnBoarding.isLoading ||
            EmployeeInvoicesPending.isLoading ||
            EmployeeInvoicesProcessing.isLoading ||
            EmployeeInvoicesPaid.isLoading ||
            OtherInvoicesPending.isLoading ||
            OtherInvoicesProcessing.isLoading ||
            OtherInvoicesPaid.isLoading ? (
              <ProfileEditSkeleton isClient={true} />
            ) : (
              <ClientProfileData
                isLoading={isLoading}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                showEditModal={showEditModal}
              />
            )}
            <Box sx={{ width: '100%' }}>
              <Box
                display={'flex'}
                alignItems={'center'}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  mt: '40px',
                  justifyContent: 'space-between',
                }}
              >
                <Tabs
                  value={currentTab.val}
                  onChange={handleChangeCurrentTab}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  TabIndicatorProps={{ style: { backgroundColor: '#068987' } }}
                >
                  {clientProfileTabs?.map(({ label, prop }, index) => (
                    <Tab
                      key={index}
                      label={`${label}`}
                      {...prop}
                      disableRipple={true}
                      sx={{
                        marginRight: '30px',
                        color: '#595959',
                        textTransform: 'math-auto',
                        '&.Mui-selected': {
                          color: '#068987',
                        },
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
              {currentTab?.label !== 'Employees' && (
                <Box
                  sx={{
                    marginTop: '10px',
                    marginBottom: '40px',
                    borderBottom:
                      currentTab?.label !== 'Leave Balance' && 'solid 1px #ccc',
                  }}
                >
                  {clientProfileTabs?.map(({ nestedTabs, ...rest }, index) => (
                    <CustomTabPanel
                      value={currentTab.val}
                      index={index}
                      key={index}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: {
                            xs: 'flex-start',
                            md: 'space-between',
                          },
                          alignItems: { xs: 'flex-start', md: 'center' },
                          flexDirection: { xs: 'column', md: 'row' },
                        }}
                      >
                        <Tabs
                          variant="scrollable"
                          value={currentTab.nested.val}
                          onChange={(ev, newVal) =>
                            handleChangeNestedTab(ev, newVal, nestedTabs, rest)
                          }
                          sx={{ width: { xs: '100%', md: '80%' } }}
                          aria-label="basic tabs example"
                          TabIndicatorProps={{
                            style: { backgroundColor: '#068987' },
                          }}
                        >
                          {nestedTabs?.map(({ label, prop }, nestedIndex) => (
                            <Tab
                              key={nestedIndex}
                              label={`${label}`}
                              {...prop}
                              disableRipple={true}
                              sx={{
                                marginRight: '30px',
                                color: '#595959',
                                '&.Mui-selected': {
                                  color: '#068987',
                                },
                              }}
                            />
                          ))}
                        </Tabs>
                        {currentTab?.label === 'Hire & onboard' ? (
                          <>
                            {currentTab?.nested.val === 0 ? (
                              <>
                                {(role === 'super_admin' ||
                                  (role !== 'super_admin' &&
                                    client_perms?.[0]?.write)) && (
                                  <Button
                                    onClick={handleOpenHiringRequestModal}
                                    variant="contained"
                                    sx={{
                                      my: { xs: '20px', md: 0 },
                                      textTransform: 'math-auto',
                                      color: '#fff',
                                      background: '#029894',

                                      '&:hover': {
                                        color: '#fff',
                                        background: '#029894',
                                      },
                                    }}
                                  >
                                    {CLIENTPROFILE?.addNewRequest}
                                  </Button>
                                )}
                              </>
                            ) : currentTab?.nested.val === 1 ? (
                              <>
                                {(role === 'super_admin' ||
                                  (role !== 'super_admin' &&
                                    client_perms?.[0]?.write)) && (
                                  <Button
                                    onClick={handleOpenAddInterviewModal}
                                    variant="contained"
                                    sx={{
                                      my: { xs: '20px', md: 0 },
                                      textTransform: 'math-auto',
                                      color: '#fff',
                                      background: '#029894',
                                      '&:hover': {
                                        color: '#fff',
                                        background: '#029894',
                                      },
                                    }}
                                  >
                                    {CLIENTPROFILE?.setNewInterview}
                                  </Button>
                                )}
                              </>
                            ) : (
                              <>
                                {(role === 'super_admin' ||
                                  (role !== 'super_admin' &&
                                    client_perms?.[0]?.write)) && (
                                  <Button
                                    onClick={handleOpenAddOnboardModal}
                                    variant="contained"
                                    sx={{
                                      my: { xs: '20px', md: 0 },
                                      color: '#fff',
                                      background: '#029894',
                                      '&:hover': {
                                        color: '#fff',
                                        background: '#029894',
                                      },
                                    }}
                                  >
                                    {CLIENTPROFILE?.addOnboard}
                                  </Button>
                                )}
                              </>
                            )}
                          </>
                        ) : currentTab?.label === 'Employee invoices' ? (
                          currentTab?.nested.val === 0 ? (
                            <>
                              {(role === 'super_admin' ||
                                (role !== 'super_admin' &&
                                  invoices_perms?.[0]?.write)) && (
                                <Button
                                  onClick={handleOpenUploadInvoiceModal}
                                  disabled={
                                    !ClientEmployeesAll.data ||
                                    ClientEmployeesAll.data.length === 0
                                  }
                                  variant="contained"
                                  sx={{
                                    my: { xs: '20px', md: 0 },
                                    color: '#fff',
                                    background: '#029894',
                                    '&:hover': {
                                      color: '#fff',
                                      background: '#029894',
                                    },
                                  }}
                                >
                                  {CLIENTPROFILE?.uploadVoice}
                                </Button>
                              )}
                            </>
                          ) : null
                        ) : currentTab?.label === 'Other invoices' ? (
                          currentTab?.nested.val === 0 ? (
                            <>
                              {(role === 'super_admin' ||
                                (role !== 'super_admin' &&
                                  invoices_perms?.[0]?.write)) && (
                                <Button
                                  onClick={handleOpenUploadOthInvoiceModal}
                                  variant="contained"
                                  sx={{
                                    my: { xs: '20px', md: 0 },
                                    color: '#fff',
                                    background: '#029894',
                                    '&:hover': {
                                      color: '#fff',
                                      background: '#029894',
                                    },
                                  }}
                                >
                                  {CLIENTPROFILE?.uploadVoice}
                                </Button>
                              )}
                            </>
                          ) : null
                        ) : null}
                      </Box>
                    </CustomTabPanel>
                  ))}
                </Box>
              )}
              {renderTable({
                isLoading:
                  isLoading ||
                  ClientHiringReqQuery.isLoading ||
                  ClientInterviewSchedule.isLoading ||
                  ClientOnBoarding.isLoading ||
                  EmployeeInvoicesPending.isLoading ||
                  EmployeeInvoicesProcessing.isLoading ||
                  EmployeeInvoicesPaid.isLoading ||
                  OtherInvoicesPending.isLoading ||
                  OtherInvoicesProcessing.isLoading ||
                  OtherInvoicesPaid.isLoading,
                currentTab: currentTab.label,
                data: getCurrentTabData(),
                column: currentTabTable.column,
                openModal: handleOpenAddClientModal,
                isOpen: isOpen,
                handleOpen,
                handleClose,
                minWidth: '1450px',
                handleConfirmDelete: handleConfirmDeleteHiringReq,
                updateStatus: handleConfirmUpdatePayStatus,
                isPending:
                  deleteStartHiringMutation.isPending ||
                  deleteInterviewMutation.isPending ||
                  deleteOnBoardingMutation.isPending ||
                  deleteEmpInvMutation.isPending ||
                  deleteOthInvMutation.isPending,
                handleClickDownload: downloadInvoice,
              })}
            </Box>
          </>
        </Box>
      )}
      <HiringRequestModal
        open={isOpenHiringRequestModal}
        onClose={handleCloseHiringRequestModal}
      />
      <AddInterviewModal
        open={isOpenAddInterviewModal}
        onClose={handleCloseAddInterviewModal}
      />
      <AddOnboardModal
        open={isOpenAddOnboardModal}
        onClose={handleCloseAddOnboardModal}
      />
      <AddContractModal
        open={isOpenContractModal}
        onClose={handleCloseContractModal}
      />

      <UploadInvoiceModal
        title="Employee invoice form"
        open={isOpenUploadInvoiceModal}
        onClose={handleCloseUploadInvoiceModal}
      />
      <UploadOtherInvoiceModal
        title="Other invoice form"
        open={isOpenUploadOthInvoiceModal}
        onClose={handleCloseUploadOthInvoiceModal}
      />
      <AddEmployeeModal
        title="Employee invoice form"
        open={isOpenAddClientModal}
        onClose={handleCloseAddClientModal}
      />
    </>
  );
};
export default AddEmployee;
