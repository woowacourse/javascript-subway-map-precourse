import { createLineNameBtn } from './sectionElemGenerator.js';
import { validateUserInput, checkDeleteAvailable } from './sectionValidator.js';

import Subway from '../subwayManager.js';
import { getLineName, getSelectedLineData } from '../line/lineDataHandler.js';
import { setStationDataToOption } from '../line/lineElemGenerator.js';
import { getStation } from '../station/stationDataHandler.js';
import { printSection } from '../util/output.js';
import { numInCondition } from '../util/constants.js';

export const loadLineName = () => {
  const lineNames = getLineName();
  createLineNameBtn(lineNames);
};

export const loadSectionStationData = () => {
  const stations = getStation();
  const stationSelector = document.querySelector('#section-station-selector');
  setStationDataToOption(stations, stationSelector);
};

export const updateLine = () => {
  const lineName = document.querySelector('#title').dataset.line;
  const station = document.querySelector('#section-station-selector');
  const input = document.querySelector('#section-order-input');
  if (!validateUserInput(lineName, station.value, input.value)) {
    alert('역 이름과 순서를 다시 한 번 확인해주세요🚨');
    return Subway.clearInput(input);
  }
  let stations = getSelectedLineData(lineName);
  stations.splice(input.value, 0, station.value);
  localStorage.setItem(lineName, JSON.stringify(stations));
  printSection(lineName);
  Subway.clearInput(input);
  station.selectedIndex = 0;
};

export const deleteStationFromLine = (e) => {
  if (!Subway.confirmMessage(e.target.innerHTML)) {
    return;
  }
  const station = e.target.dataset.station;
  const lineName = document.querySelector('#title').dataset.line;
  if (!checkDeleteAvailable(lineName)) {
    return alert(
      `노선에 남아있는 역의 갯수가 ${numInCondition.MIN_LENGTH_LINE}개 이상이어야 합니다🚨`
    );
  }
  let stations = getSelectedLineData(lineName);
  const idx = stations.indexOf(station);
  stations.splice(idx, 1);
  localStorage.setItem(lineName, JSON.stringify(stations));
  printSection(lineName);
};
