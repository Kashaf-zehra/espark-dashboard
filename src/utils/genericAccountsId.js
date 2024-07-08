const { ADD_ACCOUNT_DATA } = require('../constants/account');

export const generateString = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const sections = [4, 7, 2];
  const totalLength = ADD_ACCOUNT_DATA?.totalLength;
  let currentLength = ADD_ACCOUNT_DATA?.currentLength;

  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i]; j++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      currentLength++;
    }
    if (currentLength < totalLength) {
      result += '-';
      currentLength++;
    }
  }
  return result;
};
