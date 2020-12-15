import { validateUserInput, checkDeleteAvailable } from './stationValidator.js';

import Subway from '../subwayManager.js';
import { printStations } from '../util/output.js';
import { numInCondition } from '../util/constants.js';

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

export const createStation = () => {
  const stationNameInput = document.querySelector('#station-name-input');
  if (!validateUserInput(stationNameInput.value)) {
    alert(`중복되지 않은 ${numInCondition.MIN_LENGTH_STATION}글자 이상 한글 입력만 가능해요🚨`);
    return Subway.clearInput(stationNameInput);
  }
  const station = stationNameInput.value;
  const stations = getStation();
  stations.push(station);
  setStation(stations);
  Subway.clearInput(stationNameInput);
};

export const deleteStation = (e) => {
  if (!Subway.confirmMessage(e.target.innerHTML)) {
    return;
  }
  const station = e.target.dataset.station;
  if (!checkDeleteAvailable(station)) {
    alert('노선에 등록된 역은 삭제할 수 없습니다🚨');
    Subway.clearInput();
  }
  const stations = getStation();
  const idx = stations.indexOf(station);
  stations.splice(idx, 1);
  setStation(stations);
};
