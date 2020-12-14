import {
  $stationContainer,
  $lineContainer,
  $sectionContainer,
  $mapContainer,
  $sectionEditContainer,
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

export const showSectionScreen = (lineName) => {
  const $allSectionTr = $sectionEditContainer.querySelectorAll('tr');
  $sectionEditContainer.style.display = 'block';
  $allSectionTr.forEach((tr) => {
    if (tr.dataset.lineName === lineName) {
      tr.style.display = 'table-row';
    }
  });
};
