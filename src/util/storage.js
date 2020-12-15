export const Storage = {
  save(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
  },

  load(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};
