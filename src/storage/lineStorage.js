import { LINE_STORAGE_NAME } from '../utils/constant.js';

export default function lineStorage() {
  const getLines = () => {
    if (!localStorage.getItem(LINE_STORAGE_NAME)) {
      return [];
    }
    const storedItems = localStorage.getItem(LINE_STORAGE_NAME);
    return JSON.parse(storedItems);
  };

  const setLine = (line) => {
    localStorage.setItem(LINE_STORAGE_NAME, JSON.stringify(line));
  };

  const getStartPointsId = () => {
    return getLines().map((line) => line.stationIds[0]);
  };

  const getEndPointsId = () => {
    return getLines().map((line) => line.stationIds[line.stationIds.length - 1]);
  };

  const getOneLine = (lineId) => {
    return getLines().filter((line) => line.id === parseInt(lineId))[0];
  };

  return {
    getLines,
    setLine,
    getStartPointsId,
    getEndPointsId,
    getOneLine,
  };
}
