import Station from './Model/station.js';
import Line from './Model/line.js';
import {hideScreen} from './View/hide-screen.js';
import {showScreen} from './View/show-screen.js';
import {loadStation} from './Controller/station-control.js';
import {loadLine} from './Controller/line-control.js';
import {
  loadSectionButton,
  loadSectionTable,
} from './Controller/section-control.js';
import {loadMapPrint} from './Controller/map-print-control.js';

export const stationInstance = new Station();
export const lineInstance = new Line();

export function onChangeScreen(e) {
  hideScreen();
  showScreen(e);
  loadScreen(e.target.id);
}

const loadScreen = (buttonId) => {
  if (buttonId === 'station-manager-button') {
    return loadStation();
  }
  if (buttonId === 'line-manager-button') {
    return loadLine();
  }
  if (buttonId === 'section-manager-button') {
    return loadSectionButton();
  }
  if (buttonId === 'map-print-manager-button') {
    return loadMapPrint();
  }
};

loadStation();
loadLine();
loadSectionTable();
