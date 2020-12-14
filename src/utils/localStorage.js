export const setItemWithKey = (item, key) => {
  const stringifiedItem = JSON.stringify(item);
  localStorage.set(key, stringifiedItem);
};

export const getItemByKey = (key) => {
  const stringifiedItem = localStorage.get(key);
  return JSON.parse(stringifiedItem);
};

export default {
  setItemWithKey,
  getItemByKey,
};
