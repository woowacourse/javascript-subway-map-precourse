import { ERROR_MESSAGE } from "./constants.js";

const localStorageManager = {
  getItem({ key, defaultValue }) {
    try {
      const storedData = localStorage.getItem(key);

      return storedData ? JSON.parse(storedData) : defaultValue;
    } catch (e) {
      alert(ERROR_MESSAGE.getItem);
      console.error(e);
      return defaultValue;
    }
  },
  setItem({ key, item }) {
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      alert(ERROR_MESSAGE.setItem);
      console.error(e);
    }
  },
};

export default localStorageManager;
