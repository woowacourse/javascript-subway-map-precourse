import { makeLineNameBtn } from './sectionElemGenerator.js';
import { getLineName, getSelectedLineData } from '../line/lineDataHandler.js';
import { setStationDataToOption } from '../line/lineElemGenerator.js';
import { getStation } from '../station/stationDataHandler.js';
import { printSection } from '../print.js';

export const loadLineName = () => {
  const lineNames = getLineName();
  makeLineNameBtn(lineNames);
};

export const loadSectionStationData = () => {
  const stations = getStation();
  const stationSelector = document.querySelector('#section-station-selector');
  setStationDataToOption(stations, stationSelector);
};

export const deleteStationFromLine = (e) => {
  const station = e.target.dataset.station;
  const lineName = document.querySelector('#title').dataset.line;
  let stations = getSelectedLineData(lineName);
  const idx = stations.indexOf(station);
  stations.splice(idx, 1);
  localStorage.setItem(lineName, JSON.stringify(stations));
  printSection(lineName);
};
