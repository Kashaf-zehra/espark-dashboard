export const getEmployeeData = (id, allEmployees) => {
  if (id === undefined || id === null) {
    return null;
  }
  return allEmployees?.find((employee) => employee?.id === parseInt(id));
};
