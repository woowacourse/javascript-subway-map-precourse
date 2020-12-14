import Station from './station.js';
export const setItem = (item) => {
  localStorage.setItem('stations', JSON.stringify(item));
  Station.readStation();
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = (item) => {
  const stations = getItem('stations');
  const idx = stations.indexOf(item);
  stations.splice(idx, 1);
  setItem(stations);
};
