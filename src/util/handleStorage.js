export const loadStorage = (key) => {
  const loadedStorage = localStorage.getItem(key);
  let parsedStorage = [];

  if (loadedStorage !== null) {
    parsedStorage = JSON.parse(loadedStorage);
  }

  return parsedStorage;
};

export const saveStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};
