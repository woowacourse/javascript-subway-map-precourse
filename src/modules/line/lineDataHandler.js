import { setStationDataToOption } from './lineElemGenerator.js';

import { getStation } from '../station/stationDataHandler.js';
import { printLines } from '../util/output.js';

export const loadStationData = () => {
  const stations = getStation();
  const startStationSelector = document.querySelector(
    '#line-start-station-selector'
  );
  const endStationSelector = document.querySelector(
    '#line-end-station-selector'
  );
  setStationDataToOption(stations, startStationSelector);
  setStationDataToOption(stations, endStationSelector);
};

export const setLine = (lineName, stations) => {
  // const lineName = inputElem.value;
  localStorage.setItem(lineName, JSON.stringify(stations));
  setLineName(updateLineName(lineName));
  printLines();
};

export const getSelectedLineData = (lineName) => {
  return JSON.parse(localStorage.getItem(lineName));
};

export const deleteLine = (e) => {
  const lineName = e.target.dataset.line;
  const names = getLineName();
  const idx = names.indexOf(lineName);
  names.splice(idx, 1);
  setLineName(names);
  localStorage.removeItem(lineName);
  printLines();
};

export const setLineName = (lineNames) => {
  localStorage.setItem('lines', JSON.stringify(lineNames));
};

export const getLineName = () => {
  if (localStorage.getItem('lines') === null) {
    setLineName([]);
  }
  return JSON.parse(localStorage.getItem('lines'));
};

const updateLineName = (lineName) => {
  const lineNames = getLineName();
  lineNames.push(lineName);
  return lineNames;
};
