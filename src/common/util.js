export const camelize = (string) => {
  const camelCaseString = string.replace(/-[a-z]/g, (char) => {
    return char.toUpperCase().replace("-", "");
  });

  return camelCaseString;
};

export const convertStringToNumber = (inputString) => {
  return parseInt(inputString);
};

export const isPositiveInteger = (inputNumber) => {
  const isPositive = inputNumber >= 0;
  const isInteger = Number.isInteger(inputNumber);
  const isPositiveInteger = isPositive && isInteger;

  return isPositiveInteger;
};
