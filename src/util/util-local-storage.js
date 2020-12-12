export const getLocalStorageAsArray = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
};

export const addItemToLocalStroage = (item, key) => {
  let list = getLocalStorageAsArray(key);

  list.push(item);
  localStorage.setItem(key, JSON.stringify(list));
};

export const deleteItemFromLocalStroage = (item, key) => {
  let list = getLocalStorageAsArray(key);
  let index = list.forEach((value, index) => {
    if (value.name === item.name) {
      return index;
    }
  });

  list.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
};
