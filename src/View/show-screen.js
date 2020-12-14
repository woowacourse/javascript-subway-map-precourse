import {
  $stationContainer,
  $lineContainer,
  $sectionContainer,
  $mapContainer,
  $subwaySectionContainer,
} from './element.js';
import {BUTTON_MANAGEMENT_ID} from '../Controller/utils.js';

export const showScreen = (e) => {
  const {STATION, LINE, SECTION, MAP} = BUTTON_MANAGEMENT_ID;
  if (e.target.id === STATION) {
    return ($stationContainer.style.display = 'block');
  }
  if (e.target.id === LINE) {
    return ($lineContainer.style.display = 'block');
  }
  if (e.target.id === SECTION) {
    return ($sectionContainer.style.display = 'block');
  }
  if (e.target.id === MAP) {
    return ($mapContainer.style.display = 'block');
  }
};

export const showSectionScreen = (line) => {
  const $allSectionTr = $subwaySectionContainer.querySelectorAll('tr');
  $subwaySectionContainer.style.display = 'block';
  $allSectionTr.forEach((tr) => {
    if (tr.dataset.line === line) {
      tr.style.display = 'table-row';
    }
  });
};
