import { tabManager } from '../views/tab.js';
import { stationAddListener } from './stationManager.js';
import { lineAddListener } from './lineManager.js';

const stationManagerBtn = document.querySelector('#station-manager-button');
const lineManagerBtn = document.querySelector('#line-manager-button');
const sectionManagerBtn = document.querySelector('#section-manager-button');
const mapPrintManagerBtn = document.querySelector('#map-print-manager-button');

export const tabController = subwayMap => {
  stationManagerBtn.addEventListener('click', e => tabManager(e.target.value, subwayMap));
  lineManagerBtn.addEventListener('click', e => tabManager(e.target.value, subwayMap));
  sectionManagerBtn.addEventListener('click', e => tabManager(e.target.value, subwayMap));
  mapPrintManagerBtn.addEventListener('click', e => tabManager(e.target.value, subwayMap));
  stationAddListener(subwayMap);
  lineAddListener(subwayMap);
};
