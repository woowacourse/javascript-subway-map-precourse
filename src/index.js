import {MENU, TEMPLATE} from './constants.js';
import {initStorage} from './util/storageAccess.js';
import {clearTemplate, setTemplateVisible} from './ui/init-ui.js';
import {resetStationTable} from './ui/station-ui.js';
import {resetLineTable, resetStartOption, resetEndOption} from './ui/line-ui.js';
import {resetLineButtons} from './ui/section/section-selection-ui.js';
import {createMap} from './ui/map-ui.js';

initStorage();

MENU.STATION.addEventListener('click', () => {
  clearTemplate();
  resetStationTable();
  setTemplateVisible(TEMPLATE.STATION);
});

MENU.LINE.addEventListener('click', () => {
  clearTemplate();
  resetLineTable();
  resetStartOption();
  resetEndOption();
  setTemplateVisible(TEMPLATE.LINE);
});

MENU.SECTION.addEventListener('click', () => {
  clearTemplate();
  resetLineButtons();
  setTemplateVisible(TEMPLATE.SECTION);
});

MENU.MAP.addEventListener('click', () => {
  clearTemplate();
  createMap();
  setTemplateVisible(TEMPLATE.MAP);
});
