export const isEmptyValue = value => !value;

export const isValidInputLength = (value, limit) => value.length >= limit;

export const isDuplicatedValue = (values, value) =>
  values.some(_value => _value === value);

export const isPossibleIndex = (index, limit) => 0 <= index && index <= limit;
