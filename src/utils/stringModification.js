export const toCamelCase = (inputString) => {
  const { title } = inputString;
  // Use a regular expression to match non-alphanumeric characters excluding white space
  const regex = /[^a-zA-Z0-9]+(.)/g;
  // Replace the string with camelCase string
  // return title
  //   .toLowerCase()
  //   .replace(regex, (match, chr) => chr.toUpperCase());
  if (title) {
    return title
      .toLowerCase()
      .replace(regex, (match, chr) => chr.toUpperCase());
  } else {
    return inputString
      .toLowerCase()
      .replace(regex, (match, chr) => chr.toUpperCase());
  }
};

export const getCamelCapitalized = (rawStr) => {
  const finalArrStr = [];
  let rawArryStr;

  if (typeof rawStr === 'string') {
    rawArryStr = rawStr?.split('_');
  } else if (typeof rawStr === 'number') {
    const toString = rawStr.toString();
    rawArryStr = toString?.split('_');
  } else {
    rawArryStr = [];
  }

  if (rawStr === '') {
    return '-';
  } else {
    for (let i = 0; i < rawArryStr.length; i++) {
      const modStr = rawArryStr[i][0].toUpperCase() + rawArryStr[i].slice(1);
      finalArrStr.push(modStr);
    }

    return finalArrStr.join(' ');
  }
};

export const pascalToSnake = (string) => {
  // Replace spaces and dots with empty strings
  const pascalCaseString = string.replace(/[\s.]+(?=[A-Z\s])/g, '');

  // Replace each uppercase letter (except the first one) with its lowercase equivalent preceded by an underscore
  const snakeCaseString = pascalCaseString.replace(/[A-Z]/g, (match, offset) =>
    offset === 0 ? match.toLowerCase() : '_' + match.toLowerCase()
  );

  return snakeCaseString.split(' ').join('_');
};
export const snakeToPascalCase = (str) => {
  // Split the string into an array of words
  const words = str.split('_');

  // Capitalize the first letter of each word and join them
  const pascalCase = words
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return pascalCase;
};
