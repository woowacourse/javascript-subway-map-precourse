import { setStationDataToOption } from './lineElemGenerator.js';
import { validateUserInput } from './lineValidator.js';

import Subway from '../subwayManager.js';
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
  localStorage.setItem(lineName, JSON.stringify(stations));
  setLineName(updateLineName(lineName));
  printLines();
};

export const getSelectedLineData = (lineName) => {
  return JSON.parse(localStorage.getItem(lineName));
};

export const createLine = () => {
  const lineNameInput = document.querySelector('#line-name-input');
  const startStation = document.querySelector('#line-start-station-selector')
    .value;
  const endStation = document.querySelector('#line-end-station-selector').value;
  if (!validateUserInput(lineNameInput.value, startStation, endStation)) {
    alert('노선과 역 이름을 다시 한 번 확인해주세요🚨');
    return Subway.clearInput(lineNameInput);
  }
  setLine(lineNameInput.value, [startStation, endStation]);
  Subway.clearInput(lineNameInput);
};

export const deleteLine = (e) => {
  if (!Subway.confirmMessage(e.target.innerHTML)) {
    return;
  }
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
