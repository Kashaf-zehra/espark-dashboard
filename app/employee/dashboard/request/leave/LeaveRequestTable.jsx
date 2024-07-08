import Skeleton from '@mui/material/Skeleton';
import { employeeLeaveRequestsColumn } from '@/src/constants/data/tables/requestsData';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { renderNestedTable } from './renderComponents';

const LeaveRequestTable = ({
  tabVal,
  tab,
  handleOpen,
  handleOpenModal,
  handleClickView,
  handleClickDelete,
  leaveRequestDataState,
  setLeaveRequestDataState,
  commonRowStyle,
  viewClicked,
}) => {
  const { data, isLoading } = useSelector((state) => state?.emp?.leaveReq);
  // const [leaveRequestDataState, setLeaveRequestDataState] = useState([]);
  const reformData = (dataArr) => {
    if (dataArr?.length) {
      const tempData = dataArr?.map((item) => ({
        ...item,
        actions: item?.status === 'pending' ? ['Delete', 'View'] : ['View'],
      }));
      return tempData;
    }
    return [];
  };
  useEffect(() => {
    setLeaveRequestDataState(
      filterTableRowsWRTTab(reformData(data?.requests), { status: '' })
    );
  }, [data, tabVal]);

  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        width={'100%'}
        height={40}
        sx={{ background: '#F6F6F6' }}
      />
    );
  }
  return renderNestedTable({
    currentReqStatusTabVal: tabVal,
    currentReqStatusTab: tab,
    handleOpen,
    column: employeeLeaveRequestsColumn,
    data: leaveRequestDataState,
    // data: [],
    handleOpenConditionalModal: handleOpenModal,
    handleClickActionView: handleClickView,
    handleClickActionDelete: handleClickDelete,
    isLoading,
    commonRowStyle,
    viewClicked,
  });
};

export default LeaveRequestTable;
