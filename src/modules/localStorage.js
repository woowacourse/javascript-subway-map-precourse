import { printStations } from './print.js';
export const setItem = (item) => {
  localStorage.setItem('stations', JSON.stringify(item));
  printStations();
};

export const getItem = (key) => {
  if (localStorage.getItem('stations') === null) {
    setItem([]);
  }
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = (item) => {
  const stations = getItem('stations');
  const idx = stations.indexOf(item);
  stations.splice(idx, 1);
  setItem(stations);
};
