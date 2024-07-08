import AppTable from '@/src/components/appTableNew/AppTable';
import { Box } from '@mui/material';
import AppConfirmationMadal from '@/src/components/modals/AppConfirmationMadal';
import ClientEmployees from '@/src/components/HR/ClientEmployees';

export const renderTable = ({
  currentTab,
  data,
  column,
  openModal,
  isOpen,
  handleClose,
  handleOpen,
  handleConfirmDelete,
  updateStatus,
  isPending,
  isLoading,
  handleClickDownload,
  minWidth,
}) => {
  if (currentTab !== 'Employees') {
    return (
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <AppTable
          data={data}
          column={column}
          minWidth={minWidth}
          handleClickActionDelete={handleOpen}
          updateStatus={updateStatus}
          isLoading={isLoading}
          handleClickDownload={handleClickDownload}
        />
        <AppConfirmationMadal
          title={'Delete'}
          bodyText="Are you sure you want to delete this request"
          cancelButtonText={'Cancel'}
          confirmButtonText={'Delete'}
          handleClose={handleClose}
          handleConfirm={handleConfirmDelete}
          isOpen={isOpen}
          isLoading={isPending}
        />
      </Box>
    );
  } else
    return <ClientEmployees empData={data} openModal={openModal} fromClient />;
};
