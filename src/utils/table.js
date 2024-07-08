export const filterTableRowsWRTTab = (data, filters) => {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  } else {
    const filteredData = data?.filter((member) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key].toLowerCase();

        // Check if the member has the specified property
        if (Object.prototype.hasOwnProperty.call(member, key)) {
          // If filter value is an empty string, do not filter based on this key
          if (filterValue === '') {
            return true;
          }
          // Check if the value matches
          return member[key].includes(filterValue);
        } else {
          // If the member does not have the specified property, do not filter based on this key
          return true;
        }
      });
    });
    const sortedData = filteredData?.sort((a, b) => {
      return b.id - a.id;
    });

    return sortedData;
  }
};
