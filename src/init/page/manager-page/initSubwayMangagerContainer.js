import initLineManagertPage from './initLineManagerPage.js';
import initMapPrintManagerPage from './initMapPrintManagerPage.js';
import initSectionManagerPage from './initSectionManagerPage.js';
import initStationManagerPage from './initStationManagerPage.js';

function subwayManagerContainer() {
  return `<div class="manager-container"></div>`;
}

export default function initSubwayManagerContainer() {
  const $app = document.querySelector('#app');

  $app.insertAdjacentHTML('beforeend', subwayManagerContainer());
  initStationManagerPage();
  initLineManagertPage();
  initSectionManagerPage();
  initMapPrintManagerPage();
}
