const defaultState = {
  stationList: [],
  lineList: [],
  currentLineData: {
    name: '',
    section: [],
  },
};

const setItem = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getItem = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data || defaultState;
};

const storage = {
  setItem,
  getItem,
};

export default storage;
