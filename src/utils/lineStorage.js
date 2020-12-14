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

  const getStartPoints = () => {
    return getLine().map((line) => line.stations[0]);
  };

  const getEndPoints = () => {
    return getLine().map((line) => line.stations[line.stations.length - 1]);
  };

  const getOneLine = (lineId) => {
    return getLine().filter((line) => line.id === parseInt(lineId))[0];
  };

  return {
    getLine,
    setLine,
    getStartPoints,
    getEndPoints,
    getOneLine,
  };
}
