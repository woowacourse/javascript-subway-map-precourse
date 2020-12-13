export const getArrayFromLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
};

export const getItemFromLocalStorage = (key, target) => {
  let list;

  try {
    list = JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    list = [];
  }
  return list.filter((item) => item.name === target)[0];
};

export const addItemToLocalStroage = (key, item) => {
  let list = getArrayFromLocalStorage(key);

  list.push(item);
  localStorage.setItem(key, JSON.stringify(list));
};

export const addSubItemToLocalStroage = (key, secondKey, itemName, subItem) => {
  let list = getArrayFromLocalStorage(key);
  let item = list.filter((item) => item.name === itemName)[0];

  item[secondKey].push(subItem);
  localStorage.setItem(key, JSON.stringify(list));
};

export const deleteItemFromLocalStroage = (key, item) => {
  let list = getArrayFromLocalStorage(key);
  let index = getIndexOf(list, item.name);

  list.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
};

export const deleteSubItemFromLocalStorage = (
  key,
  secondKey,
  itemName,
  subItem
) => {
  let list = getArrayFromLocalStorage(key);
  let item = list.filter((item) => item.name === itemName)[0];
  let secondList = item[secondKey];
  let index = getIndexOf(secondList, subItem.name);

  secondList.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
};

const getIndexOf = (list, target) => {
  for (let index in list) {
    if (list[index].name === target) {
      return index;
    }
  }
};
