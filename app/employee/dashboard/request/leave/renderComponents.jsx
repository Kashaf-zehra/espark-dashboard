import AppTable from '@/src/components/appTableNew/AppTable';
import CustomTabPanel from '@/src/components/dashboard/appCustomTabPanel';
import { filterTableRowsWRTTab } from '@/src/utils/table';
import { Box } from '@mui/material';

export const renderNestedTable = ({
  currentReqStatusTabVal,
  currentReqStatusTab,
  column,
  data,
  handleOpen,
  handleOpenConditionalModal,
  handleClickActionView,
  handleClickActionDelete,
  isLoading,
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
          isLoading={isLoading}
          currentTab={currentReqStatusTab}
          column={column}
          data={filterTableRowsWRTTab(data, {
            status:
              currentReqStatusTab === 'All'
                ? ''
                : currentReqStatusTab?.toLowerCase(),
          })}
          handleOpen={handleOpen}
          handleOpenConditionalModal={handleOpenConditionalModal}
          handleClickActionView={handleClickActionView}
          handleClickActionDelete={handleClickActionDelete}
          // commonRowStyle={commonRowStyle}
          viewClicked={viewClicked}
        />
      </Box>
    </CustomTabPanel>
  );
};
