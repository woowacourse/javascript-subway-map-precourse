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

export const addItemToLocalStroage = (key, itemName) => {
  let list = getArrayFromLocalStorage(key);

  list.push(itemName);
  localStorage.setItem(key, JSON.stringify(list));
};

export const addSubItemToLocalStroage = (
  key,
  secondKey,
  itemName,
  subItem,
  index
) => {
  let list = getArrayFromLocalStorage(key);
  let item = list.filter((item) => item.name === itemName)[0];
  let secondList = item[secondKey];

  index = index || secondList.length;
  secondList.splice(index, 0, subItem);
  localStorage.setItem(key, JSON.stringify(list));
};

export const deleteItemFromLocalStroage = (key, itemName) => {
  let list = getArrayFromLocalStorage(key);
  let index = getIndexOf(list, itemName);

  list.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
};

export const deleteSubItemFromLocalStorage = (
  key,
  secondKey,
  itemName,
  subItemName,
  order
) => {
  let list = getArrayFromLocalStorage(key);
  let item = list.filter((item) => item.name === itemName)[0];
  let secondList = item[secondKey];
  let index = order || secondList.indexOf(subItemName);

  secondList.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(list));
};

const getIndexOf = (list, target) => {
  let index = 0;

  for (let i in list) {
    if (list[i].name === target) {
      index = i;
      break;
    }
  }
  return index;
};
