export const onCheckDateValidation = (dates) => {
  const errorObject = {};

  if (dates.from === 'Invalid date' || isNaN(new Date(dates.from).getTime())) {
    errorObject.from = 'Invalid date';
  }
  if (dates.to === 'Invalid date' || isNaN(new Date(dates.to).getTime())) {
    errorObject.to = 'Invalid date';
  }

  return errorObject;
};
