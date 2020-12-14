import { printStations } from '../util/output.js';

export const setStation = (stations) => {
  localStorage.setItem('stations', JSON.stringify(stations));
  printStations();
};

export const getStation = () => {
  if (localStorage.getItem('stations') === null) {
    setStation([]);
  }
  return JSON.parse(localStorage.getItem('stations'));
};

export const deleteStation = (e) => {
  const station = e.target.dataset.station;
  const stations = getStation();
  const idx = stations.indexOf(station);
  stations.splice(idx, 1);
  setStation(stations);
};
