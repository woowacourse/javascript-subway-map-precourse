import {
  LINE_MANAGER_PAGE_TEMPLATE,
  ALL_STATION_OPTION_LIST,
  LINE_TABLE_TEMPLATE,
} from '../utils/templete.js';
import { lineNameValidator, lineStationsValidator } from '../utils/validator/lineValidator.js';
import stationStorage from '../utils/stationStorage.js';
import lineStorage from '../utils/lineStorage.js';
import Line from '../utils/Line.js';

export default function stationManagerPage($element) {
  $element.innerHTML = LINE_MANAGER_PAGE_TEMPLATE;
  const $userInputLine = $element.querySelector('#line-name-input');
  const $startStation = $element.querySelector('#line-start-station-selector');
  const $endStation = $element.querySelector('#line-end-station-selector');
  const $userLineSubmitBtn = $element.querySelector('#line-add-button');
  const $lineTableBody = $element.querySelector('.line-table-tbody');

  const stations = stationStorage().getStation();
  const lines = lineStorage().getLine();

  $startStation.innerHTML = ALL_STATION_OPTION_LIST(stations);
  $endStation.innerHTML = ALL_STATION_OPTION_LIST(stations);

  const renderLines = () => {
    $lineTableBody.innerHTML = lines.map(LINE_TABLE_TEMPLATE).join('');
  };

  const getNewId = () => {
    if (!lines || lines.length === 0) {
      return 0;
    }
    return lines[lines.length - 1].id + 1;
  };

  const addLine = (newLine) => {
    lines.push(newLine);
    lineStorage().setLine(lines);
    renderLines();
  };

  const getStation = (stationName) => {
    return stations.filter((station) => station.name === stationName);
  };

  const createLine = (newLineName, startStationName, endStationName) => {
    const startStation = getStation(startStationName)[0];
    const endStation = getStation(endStationName)[0];

    const newLine = new Line(getNewId(), newLineName);
    newLine.setLine(startStation, 0);
    newLine.setLine(endStation, 1);
    addLine(newLine);
  };

  const onLineSubmitHandler = () => {
    const newLineName = $userInputLine.value;
    const startStationName = $startStation.value;
    const endStationName = $endStation.value;

    if (
      lineNameValidator(lines, newLineName) &&
      lineStationsValidator(startStationName, endStationName)
    ) {
      createLine(newLineName, startStationName, endStationName);
    }
    $userInputLine.value = '';
  };

  $userLineSubmitBtn.addEventListener('click', onLineSubmitHandler);
  renderLines();
}
