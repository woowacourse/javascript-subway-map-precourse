import { initStationManager } from './stationManager.js';
import { initLineManager } from './lineManager.js';

export default function SubwayMap() {
  const stationMngBtn = document.getElementById('station-manager-button');
  const lineMngBtn = document.getElementById('line-manager-button');
  // const sectionMngBtn = document.getElementById('section-manager-button');
  // const mapPrintMngBtn = document.getElementById('map-print-manager-button');

  stationMngBtn.addEventListener('click', () => initStationManager());
  lineMngBtn.addEventListener('click', () => initLineManager());
}

new SubwayMap();
