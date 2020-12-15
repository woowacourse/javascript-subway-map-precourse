export const isTextOverMinLength = (text, minLength) => {
  return text.trim().length >= minLength ? true : false;
};
