export const setItemWithKey = (item, key) => {
  const stringifiedItem = JSON.stringify(item);
  localStorage.setItem(key, stringifiedItem);
};

export const getItemByKey = (key) => {
  const stringifiedItem = localStorage.getItem(key);
  return JSON.parse(stringifiedItem);
};

export default {
  setItemWithKey,
  getItemByKey,
};
