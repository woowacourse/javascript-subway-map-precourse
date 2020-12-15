import Line from '../factory/Line.js';

const defaultState = {
  stationList: [],
  lineList: [],
  currentLineData: {
    name: '',
    section: [],
  },
};

const jsonToClassConverter = (dataList, Creator) =>
  dataList.map((data) => new Creator(data));

const setItem = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getItem = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  data.lineList = jsonToClassConverter(data.lineList, Line);
  return data || defaultState;
};

const storage = {
  setItem,
  getItem,
};

export default storage;
