import initLineManagertPage from './initLineManagerPage.js';
import initMapPrintManagerPage from './initMapPrintManagerPage.js';
import initSectionManagerPage from './initSectionManagerPage.js';
import initStationManagerPage from './initStationManagerPage.js';

export default function initPages() {
  initStationManagerPage();
  initLineManagertPage();
  initSectionManagerPage();
  initMapPrintManagerPage();
}
