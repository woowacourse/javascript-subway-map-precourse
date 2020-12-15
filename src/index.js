import { applyStation } from './station.js';
import { applyLine } from './line.js';
import { applySection } from './section.js';
import { printMap } from './mapPrint.js';

export default function SubwayMap() {
  const stationManageBtn = document.getElementById('station-manager-button');
  const lineManageBtn = document.getElementById('line-manager-button');
  const sectionManageBtn = document.getElementById('section-manager-button');
  const mapPrintManageBtn = document.getElementById('map-print-manager-button');

  const chooseMenu = () => {
    if (stationManageBtn) {
      stationManageBtn.addEventListener('click', applyStation);
    }
    if (lineManageBtn) {
      lineManageBtn.addEventListener('click', applyLine);
    }
    if (sectionManageBtn) {
      sectionManageBtn.addEventListener('click', applySection);
    }
    if (mapPrintManageBtn) {
      mapPrintManageBtn.addEventListener('click', printMap);
    }
  };

  chooseMenu();
}

new SubwayMap();
