const isNull = (value) => {
  return value === "";
};

const isUnderTwo = (value) => {
  return value.length < 2;
};

const isDuplication = (arr, value) => {
  return arr.map((x) => x.name).indexOf(value) !== -1;
};

const isEmpty = (arr) => {
  return arr.length === 0;
};

const isNegative = (value) => {
  return value < 0;
};

const isInLine = (arr, value) => {
  return arr.indexOf(value) !== -1;
};

export { isNull, isUnderTwo, isDuplication, isEmpty, isNegative, isInLine };
