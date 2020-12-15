import Line from '../factory/Line.js';

export const STORAGE_KEY = 'data';

const defaultState = {
  stationList: [],
  lineList: [],
  currentLineData: {
    name: '',
    section: [],
  },
};

const jsonToClassConverter = (dataList, Creator) => dataList.map((data) => new Creator(data));

const setItem = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getItem = (key) => {
  const tempData = JSON.parse(localStorage.getItem(key));
  const data = tempData || defaultState;
  data.lineList = jsonToClassConverter(data.lineList, Line);
  return data;
};

const storage = {
  setItem,
  getItem,
};

export default storage;
