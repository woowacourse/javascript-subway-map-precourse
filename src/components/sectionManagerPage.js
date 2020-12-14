import {
  SECTION_MANAGER_PAGE_MENU_TEMPLATE,
  SECTION_MANAGER_PAGE_SELECTOR_TEMPLATE,
  SECTION_MANAGER_PAGE_TABLE_TEMPLATE,
  SECTION_LINE_MENU_BTN,
  SECTION_TABLE_TEMPLATE,
} from './template/sectionManagerTemplate.js';
import lineStorage from '../utils/lineStorage.js';
import stationStorage from '../utils/stationStorage.js';
import { ALL_STATION_OPTION_LIST } from './template/lineManagerTemplate.js';

export default function sectionManagerPage($element) {
  const lines = lineStorage().getLine();
  const stations = stationStorage().getStation();

  $element.innerHTML = SECTION_MANAGER_PAGE_MENU_TEMPLATE;
  const $listMenuBtn = $element.querySelector('.line-buttons');
  $listMenuBtn.innerHTML = lines.map(SECTION_LINE_MENU_BTN).join('');
  const $sectionSelectorContainer = $element.querySelector('#section-selector-container');
  const $lineTitle = $element.querySelector('#line-title');

  const renderSectionManager = (currentLine) => {
    $lineTitle.innerText = `${currentLine.name} 관리`;
    $sectionSelectorContainer.innerHTML = SECTION_MANAGER_PAGE_SELECTOR_TEMPLATE;
    const $sectionSelector = $element.querySelector('#section-station-selector');
    const $sectionTable = $element.querySelector('#section-table');
    $sectionSelector.innerHTML = ALL_STATION_OPTION_LIST(stations);
    $sectionTable.innerHTML = SECTION_MANAGER_PAGE_TABLE_TEMPLATE;
    const $sectionTableBody = $element.querySelector('.section-table-tbody');
    $sectionTableBody.innerHTML = SECTION_TABLE_TEMPLATE(currentLine);
  };

  const onMenuFilterHandler = (e) => {
    if (!e.target.classList.contains('section-line-menu-button')) {
      return;
    }
    const currentLine = lineStorage().getOneLine(e.target.dataset.lineid);
    renderSectionManager(currentLine);
  };

  $listMenuBtn.addEventListener('click', onMenuFilterHandler);
}
