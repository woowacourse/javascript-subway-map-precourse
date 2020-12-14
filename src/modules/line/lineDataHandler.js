import { getStation } from '../station/stationDataHandler.js';
import { printLines } from '../print.js';

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

export const setStationDataToOption = (stations, selector) => {
  for (let i = 0; i < stations.length; i++) {
    let option = document.createElement('option');
    option.text = stations[i];
    if (i === 0) {
      option.selected = true;
    }
    selector.add(option);
  }
};

export const setLine = (inputElem, start, end) => {
  const lineName = inputElem.value;
  localStorage.setItem(lineName, JSON.stringify([start, end]));
  //   printStations();
  setLineName(addLineName(lineName));
  printLines();
};

export const deleteLine = (e) => {
  const lineName = e.target.dataset.line;
  const names = getLineName();
  const idx = names.indexOf(lineName);
  names.splice(idx, 1);
  setLineName(names);
  console.log(lineName);
  localStorage.removeItem(lineName);
  printLines();
};

export const getSelectedLineData = (selectedLine) => {
  return JSON.parse(localStorage.getItem(selectedLine));
};

export const getLineName = () => {
  if (localStorage.getItem('lines') === null) {
    setLineName([]);
  }
  return JSON.parse(localStorage.getItem('lines'));
};

export const addLineName = (lineName) => {
  const lineNames = getLineName();
  lineNames.push(lineName);
  return lineNames;
};

export const setLineName = (lineNames) => {
  localStorage.setItem('lines', JSON.stringify(lineNames));
};
