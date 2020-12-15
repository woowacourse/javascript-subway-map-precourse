import Station from './Model/station.js';
import Line from './Model/line.js';
import {
  $screenAllButton,
  $stationAddButton,
  $lineAddButton,
  $sectionAddButton,
} from './View/element.js';
import {hideScreen} from './View/hide-screen.js';
import {showScreen} from './View/show-screen.js';
import {
  onAddStation,
  loadStation,
  onRemoveStation,
} from './Controller/station-control.js';
import {onAddLine, loadLine, onRemoveLine} from './Controller/line-control.js';
import {
  onAddSection,
  loadSectionButton,
  loadSectionTable,
  onLoadSection,
  onRemoveSection,
} from './Controller/section-control.js';
import {loadMapPrint} from './Controller/map-print-control.js';

export const stationInstance = new Station();
export const lineInstance = new Line();

const onChangeScreen = (e) => {
  hideScreen();
  showScreen(e);
};

export const setLineDeleteButton = ($button) => {
  $button.addEventListener('click', onRemoveLine);
};

export const setSectionDeleteButton = ($button) => {
  $button.addEventListener('click', onRemoveSection);
};

export const setSectionLoadButton = ($button) => {
  $button.addEventListener('click', onLoadSection);
};

(function gameStart() {
  $screenAllButton.forEach((button) =>
    button.addEventListener('click', onChangeScreen),
  );
  $stationAddButton.addEventListener('click', onAddStation);
  $lineAddButton.addEventListener('click', onAddLine);
  $sectionAddButton.addEventListener('click', onAddSection);

  loadStation();
  loadLine();
  loadSectionButton();
  loadSectionTable();
  loadMapPrint();
})();
