import { initStationManager } from './managers/stationManager.js';
import { initLineManager } from './managers/lineManager.js';
import { initSectionManager } from './managers/sectionManager.js';
import { initMapManager } from './managers/mapManager.js';

export default function SubwayMap() {
  const stationMngBtn = document.getElementById('station-manager-button');
  const lineMngBtn = document.getElementById('line-manager-button');
  const sectionMngBtn = document.getElementById('section-manager-button');
  const mapPrintMngBtn = document.getElementById('map-print-manager-button');

  stationMngBtn.addEventListener('click', () => initStationManager());
  lineMngBtn.addEventListener('click', () => initLineManager());
  sectionMngBtn.addEventListener('click', () => initSectionManager());
  mapPrintMngBtn.addEventListener('click', () => initMapManager());
}

new SubwayMap();
