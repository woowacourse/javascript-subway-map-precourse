export const getStateFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setStateToStorage = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
