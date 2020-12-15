import {
  LINE_MANAGER_PAGE_TEMPLATE,
  ALL_STATION_OPTION_LIST,
  LINE_TABLE_TEMPLATE,
} from '../template/lineManagerTemplate.js';
import { lineNameValidator, lineStationsValidator } from '../../utils/validator/lineValidator.js';
import stationStorage from '../../storage/stationStorage.js';
import lineStorage from '../../storage/lineStorage.js';
import Line from '../../utils/Line.js';

export default function stationManagerPage($element) {
  $element.innerHTML = LINE_MANAGER_PAGE_TEMPLATE;
  const $userInputLine = $element.querySelector('#line-name-input');
  const $startStation = $element.querySelector('#line-start-station-selector');
  const $endStation = $element.querySelector('#line-end-station-selector');
  const $userLineSubmitBtn = $element.querySelector('#line-add-button');
  const $lineTableBody = $element.querySelector('.line-table-tbody');

  const stations = stationStorage().getStations();
  let lines = lineStorage().getLines();

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

  const getStationById = (stationIds) => {
    return stations.filter((station) => station.id === stationIds)[0];
  };

  const removeLineInStation = (currentLineId) => {
    const stationsInLine = lines
      .filter((line) => line.id === parseInt(currentLineId))[0]
      .stationIds.map(getStationById);

    for (let i = 0; i < stationsInLine.length; i++) {
      const deleteIndex = stationsInLine[i].line.indexOf(parseInt(currentLineId));
      stationsInLine[i].line.splice(deleteIndex, 1);
    }
    stationStorage().setStation(stations);
  };

  const removeLine = (currentLineId) => {
    removeLineInStation(currentLineId);
    lines = lines.filter((line) => line.id !== parseInt(currentLineId));
    lineStorage().setLine(lines);
    renderLines();
  };

  const onLineDeleteHandler = (e) => {
    if (!e.target.classList.contains('line-delete-button')) {
      return;
    }
    if (confirm('정말로 삭제하시겠습니까?')) {
      removeLine(e.target.closest('tr').id);
    }
  };

  const addLine = (newLine) => {
    lines.push(newLine);
    lineStorage().setLine(lines);
    renderLines();
  };

  const getStation = (stationName) => {
    return stations.filter((station) => station.name === stationName)[0];
  };

  const addLineInStation = (lineId, stationName) => {
    getStation(stationName).line.push(lineId);
    stationStorage().setStation(stations);
  };

  const createLine = (newLineName, startStationName, endStationName) => {
    const newLine = new Line(getNewId(), newLineName);
    newLine.setLine(stationStorage().getStationIdByName(startStationName), 0);
    newLine.setLine(stationStorage().getStationIdByName(endStationName), 1);

    addLineInStation(newLine.id, startStationName);
    addLineInStation(newLine.id, endStationName);
    addLine(newLine);
  };

  const onLineSubmitHandler = () => {
    const newLineName = $userInputLine.value;

    if (
      lineNameValidator(lines, newLineName) &&
      lineStationsValidator($startStation.value, $endStation.value)
    ) {
      createLine(newLineName, $startStation.value, $endStation.value);
    }

    $userInputLine.value = '';
  };

  $userLineSubmitBtn.addEventListener('click', onLineSubmitHandler);
  $lineTableBody.addEventListener('click', onLineDeleteHandler);
  renderLines();
}
