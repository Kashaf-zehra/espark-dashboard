export const handleTabChange = (
  event,
  newValue,
  setCurrentTab,
  setValue,
  setNestedValue
) => {
  let tab = event?.target?.innerText.split(' ');
  if (tab.length > 1) {
    tab = tab.slice(0, -1).join(' ');
  } else {
    tab = tab.join(' ');
  }
  setCurrentTab(tab);
  setValue(newValue);
  setNestedValue(newValue);
};
