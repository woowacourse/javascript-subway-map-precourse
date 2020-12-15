export const loadStorage = key => {
  try {
    const storage = localStorage.getItem(key);
    return storage ? JSON.parse(storage) : [];
  } catch (err) {
    console.error(err);
  }
};

export const saveStorage = (key, data) => {
  try {
    const storage = JSON.stringify(data);
    localStorage.setItem(key, storage);
  } catch (err) {
    console.error(err);
  }
};
