export const hasDuplicateName = (key, value, findKey) => {
  const targetStorage = JSON.parse(localStorage.getItem(key)) || [];
  let flag = false;
  for (let i = 0; i < targetStorage.length; i++) {
    if (targetStorage[i][value] === findKey) {
      flag = true;
      break;
    }
  }
  return flag;
};

export const addLocalStorageByKey = (key, object) => {
  const tmpStorage = JSON.parse(localStorage.getItem(key)) || [];
  tmpStorage.push(object);
  console.log(tmpStorage, key);
  localStorage.setItem(key, JSON.stringify(tmpStorage));
};

export const deleteDataByName = (key, value, prop) => {
  const tmpStorage = JSON.parse(localStorage.getItem(key));
  tmpStorage.map((item, idx) => {
    if (item[prop] === value) {
      tmpStorage.splice(idx, 1);
    }
  });
  localStorage.setItem(key, JSON.stringify(tmpStorage));
};
