export const convertStringToNumber = (inputString) => {
  return parseInt(inputString);
};

export const isPositiveInteger = (inputNumber) => {
  const isPositive = inputNumber >= 0;
  const isInteger = Number.isInteger(inputNumber);
  const isPositiveInteger = isPositive && isInteger;

  return isPositiveInteger;
};
