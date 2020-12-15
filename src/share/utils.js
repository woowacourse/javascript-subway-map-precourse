export const checkOverlap = (value, list) => !list.includes(value);

export const checkValueLength = (value, minLength) => value.length >= minLength;

export const checkSameStation = (prevStation, nextStation) => prevStation !== nextStation;

export const deleteWhiteSpace = (words) => words.replaceAll(' ', '');

export const isEmpty = (value) => value === '';
