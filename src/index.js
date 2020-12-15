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
import {onAddStation, loadStation} from './Controller/station-control.js';
import {onAddLine, loadLine} from './Controller/line-control.js';
import {
  onAddSection,
  loadSectionButton,
  loadSectionTable,
} from './Controller/section-control.js';
import {loadMapPrint} from './Controller/map-print-control.js';

export const stationInstance = new Station();
export const lineInstance = new Line();

const onChangeScreen = (e) => {
  hideScreen();
  showScreen(e);
};

const gameStart = () => {
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
};

gameStart();
