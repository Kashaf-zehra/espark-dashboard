import { Box } from '@mui/material';
import AppTable from '@/src/components/appTableNew/AppTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';

export const renderNestedTable = ({
  currentReqStatusTabVal,
  currentReqStatusTab,
  column,
  data,
  handleOpen,
  handleClickActionView,
  rejectReq,
  approveReq,
  isLoading,
  minWidth,
  viewClicked,
}) => {
  return (
    <CustomTabPanel
      value={currentReqStatusTabVal}
      index={currentReqStatusTabVal}
    >
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable
          minWidth={minWidth}
          currentTab={currentReqStatusTab}
          column={column}
          data={filterTableRowsWRTTab(data, {
            status: currentReqStatusTab === 'All' ? '' : currentReqStatusTab,
          })}
          handleOpen={handleOpen}
          handleClickActionView={handleClickActionView}
          rejectReq={rejectReq}
          approveReq={approveReq}
          isLoading={isLoading}
          viewClicked={viewClicked}
        />
      </Box>
    </CustomTabPanel>
  );
};
