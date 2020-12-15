import {
  sectionIndexValidator,
  sectionStationNameValidator,
  sectionDeleteValidator,
} from '../utils/validator/sectionValidator.js';
import {
  SECTION_MANAGER_PAGE_SELECTOR_TEMPLATE,
  SECTION_MANAGER_PAGE_TABLE_TEMPLATE,
  SECTION_TABLE_TEMPLATE,
} from './template/sectionManagerTemplate.js';
import { ALL_STATION_OPTION_LIST } from './template/lineManagerTemplate.js';
import stationStorage from '../utils/stationStorage.js';
import lineStorage from '../utils/lineStorage.js';

export default function oneSectionManager($container, $table, line) {
  const stations = stationStorage().getStations();
  const lines = lineStorage().getLine();

  $container.innerHTML = SECTION_MANAGER_PAGE_SELECTOR_TEMPLATE;
  const $lineTitle = $container.querySelector('#line-title');
  $lineTitle.innerText = `${line.name} 관리`;

  const $sectionSelector = $container.querySelector('#section-station-selector');
  $sectionSelector.innerHTML = ALL_STATION_OPTION_LIST(stations);

  $table.innerHTML = SECTION_MANAGER_PAGE_TABLE_TEMPLATE;
  const $sectionTableBody = $table.querySelector('.section-table-tbody');
  $sectionTableBody.innerHTML = SECTION_TABLE_TEMPLATE(line);

  const $userSectionIndexInput = $container.querySelector('#section-order-input');
  const $userSelectStationBtn = $container.querySelector('#section-station-selector');
  const $userSectionSubmitBtn = $container.querySelector('#section-add-button');

  const renderSection = (newLine) => {
    $sectionTableBody.innerHTML = SECTION_TABLE_TEMPLATE(newLine);
  };

  const getStationById = (stationIds) => {
    return stations.filter((station) => station.id === stationIds)[0];
  };

  const updateLineState = (stationId, stationIndex) => {
    line.stationIds.splice(stationIndex, 0, stationId);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].id === line.id) {
        lines[i] = line;
      }
    }
    lineStorage().setLine(lines);
    return line;
  };

  const updateStationState = (stationId) => {
    getStationById(stationId).line.push(line.id);
    stationStorage().setStation(stations);
  };

  const updateSection = (stationName, stationIndex) => {
    const stationId = stationStorage().getStationIdByName(stationName);
    updateStationState(stationIndex);
    renderSection(updateLineState(stationId, stationIndex));
  };

  const removeStationInLine = (stationId) => {
    const deleteIndex = line.stationIds.findIndex((id) => id === stationId);
    line.stationIds.splice(deleteIndex, 1);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].id === line.id) {
        lines[i] = line;
      }
    }
    lineStorage().setLine(lines);
    return line;
  };

  const removeLineInStation = (stationId, lineId) => {
    const station = getStationById(stationId);
    const deleteIndex = station.line.findIndex((lineNum) => lineNum === lineId);
    station.line.splice(deleteIndex, 1);
    stationStorage().setStation(stations);
  };

  const removeStationInSection = (stationId, lineId) => {
    removeLineInStation(stationId, lineId);
    console.log(lines);
    renderSection(removeStationInLine(stationId));
  };

  const onRemoveSubmitHandler = (e) => {
    const stationId = parseInt(e.target.dataset.stationid);
    const lineId = parseInt(e.target.closest('tr').id); // line.id
    if (Number.isNaN(stationId)) {
      return;
    }

    if (sectionDeleteValidator(lineId) && confirm('정말로 노선에서 삭제하시겠습니까?')) {
      removeStationInSection(stationId, lineId);
    }
  };

  const onSectionSubmitHandler = () => {
    const userSelectStationName = $userSelectStationBtn.value;
    const userSectionIndex = parseInt($userSectionIndexInput.value);

    if (
      sectionStationNameValidator(line, stations, userSelectStationName) &&
      sectionIndexValidator(line.stationIds.length, userSectionIndex)
    ) {
      updateSection(userSelectStationName, userSectionIndex);
    }
    $userSectionIndexInput.value = '';
  };

  $userSectionSubmitBtn.addEventListener('click', onSectionSubmitHandler);
  $sectionTableBody.addEventListener('click', onRemoveSubmitHandler);
}
