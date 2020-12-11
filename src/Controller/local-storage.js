export const setLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  if (localStorageValue === null) {
    return localStorage.setItem(key, JSON.stringify([value]));
  }

  return localStorage.setItem(
    key,
    JSON.stringify([...localStorageValue, value]),
  );
};

export const getLocalStorage = (key) => {
  const localStorageValue = JSON.parse(localStorage.getItem(key));

  return localStorageValue;
};

export const removeLocalStorage = (key, value) => {
  const localStorageValue = getLocalStorage(key);
  const filteredStorage = localStorageValue.filter((storage) => {
    if (key === 'station') {
      return storage !== value;
    }
    if (key === 'line') {
      return storage.lineName !== value;
    }
  });

  return localStorage.setItem(key, JSON.stringify(filteredStorage));
};
