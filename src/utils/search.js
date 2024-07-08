'use client';

export const filterDataByKeyword = (tempData, keyword, setData) => {
  if (!tempData || tempData.length === 0) {
    setData?.([]);
    return [];
  }

  const filteredData = tempData.filter((item) => {
    if (typeof item === 'string') {
      // Handle array of strings
      const lowerKeyword = keyword.toLowerCase();
      return item.toLowerCase().includes(lowerKeyword);
    } else if (typeof item === 'object') {
      // Handle array of objects
      return Object.values(item).some((value) =>
        typeof value === 'string'
          ? value.toLowerCase().includes(keyword.toLowerCase())
          : `${value}`?.includes(`${keyword}`)
      );
    }
    return false;
  });

  setData?.(filteredData);
  return filteredData;
};
