export const setItemWithKey = (item, key) => {
  const stringifiedItem = JSON.stringify(item);
  localStorage.set(key, stringifiedItem);
};

export default {
  setItemWithKey,
};
