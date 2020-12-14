export const checkOverlap = (value, list) => !list.includes(value);

export const checkValueLength = (value, minLength) => value.length >= minLength;

export const customConfirm = (message) => confirm(message);
