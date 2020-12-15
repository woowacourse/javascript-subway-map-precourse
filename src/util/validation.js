export const isTextOverMinLength = (text, minLength) => {
  return text.trim().length >= minLength ? true : false;
};

export const isNatureNumber = (num) => {
  return Number.isInteger(num) && num > 0 ? true : false;
};
