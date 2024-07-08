import React from 'react';
import Flag from 'react-country-flag';

const FlagIcon = ({ countryCode }) => {
  return (
    <>
      <Flag
        countryCode={countryCode}
        svg
        style={{ marginRight: '8px', width: '34px', height: '26px' }}
      />
    </>
  );
};
export default FlagIcon;
