import { filterTableRowsWRTTab } from './table';

export const changeTab = ({
  isSingular,
  event,
  newValue,
  setSearch,
  setCurrentTab,
  setValue,
  setData,
  teamMembersData,
  tabs,
  filterBy,
}) => {
  setSearch?.('');

  let tab = event?.target?.innerText.split(' ');
  if (tab.length > 1) {
    tab = tab.slice(0, -1).join(' ');
  } else {
    tab = tab.join(' ');
  }
  setCurrentTab(tab);

  setValue(newValue);

  if (isSingular) {
    setData?.(tabs[newValue].data);
  } else {
    const filterByVal = tab === 'All' ? '' : tab;
    setData?.(
      filterTableRowsWRTTab(teamMembersData, { [filterBy]: filterByVal })
    );
  }
};

const extractedStatus = (str) => {
  const match = str.match(/\n\n(.+)/);
  return match ? match[1] : str;
};
export const changeActionStatusTab = ({
  isSingular,
  event,
  newValue,
  setSearch,
  setCurrentTab,
  setValue,
  setData,
  filterTableRowsWRTTab,
  teamMembersData,
  tabs,
}) => {
  setSearch?.('');

  const tab = extractedStatus(event?.target?.innerText);
  setCurrentTab(tab);

  setValue(newValue);

  if (isSingular) {
    setData?.(tabs[newValue].data);
  } else {
    const filterByVal = tab === 'All' ? '' : tab;
    setData?.(filterTableRowsWRTTab(teamMembersData, { filterByVal }));
  }
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
