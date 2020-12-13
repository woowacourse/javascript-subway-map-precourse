import { initStationManager } from './stationManager.js';
import { initLineManager } from './lineManager.js';
import { initSectionManager } from './sectionManager.js';
import { initMapManager } from './mapManager.js';

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
