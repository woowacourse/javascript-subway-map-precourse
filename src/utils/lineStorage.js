import { LINE_STORAGE_NAME } from './constant.js';

export default function lineStorage() {
  const getLine = () => {
    if (!localStorage.getItem(LINE_STORAGE_NAME)) {
      return [];
    }
    const storedItems = localStorage.getItem(LINE_STORAGE_NAME);
    return JSON.parse(storedItems);
  };

  const setLine = (line) => {
    localStorage.setItem(LINE_STORAGE_NAME, JSON.stringify(line));
  };

  return {
    getLine,
    setLine,
  };
}
