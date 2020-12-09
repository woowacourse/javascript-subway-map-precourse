import stationManagementPage from '../page/stationManagementPage.js';
import lineManagementPage from '../page/lineManagementPage.js';
import sectionManagementPage from '../page/sectionManagementPage.js';
import mapPrintPage from '../page/mapPrintManagementPage.js';

function changeManagementContainer({ target }) {
  if (target.id === 'station-manager-button') {
    stationManagementPage();
  }
  if (target.id === 'line-manager-button') {
    lineManagementPage();
  }
  if (target.id === 'section-manager-button') {
    sectionManagementPage();
  }
  if (target.id === 'map-print-manager-button') {
    mapPrintPage();
  }
}

export default function addMenuButtonEvent() {
  const $menuButton = document.querySelector('.menu');

  $menuButton.addEventListener('click', changeManagementContainer);
}
