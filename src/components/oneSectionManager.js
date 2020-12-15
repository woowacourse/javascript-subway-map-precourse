import {
  sectionIndexValidator,
  sectionStationNameValidator,
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
}
