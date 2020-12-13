export const getLocalStorageAsArray = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
};

export const addItemToLocalStroage = (key, item) => {
  let list = getLocalStorageAsArray(key);

  list.push(item);
  localStorage.setItem(key, JSON.stringify(list));
};

export const addSubItemToLocalStroage = (key, item, secondKey, thirdKey) => {
  let list = getLocalStorageAsArray(key);
  let index = getIndexOf(list, secondKey);

  list[index][thirdKey].push(item);
  localStorage.setItem(key, JSON.stringify(list));
};

export const deleteItemFromLocalStroage = (key, item) => {
  let list = getLocalStorageAsArray(key);
  let index = getIndexOf(list, item.name);

  list.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
};

const getIndexOf = (list, target) => {
  for (let index in list) {
    if (list[index].name === target) {
      return index;
    }
  }
};
