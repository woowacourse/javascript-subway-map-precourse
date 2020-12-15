import stationManagerPage from './components/views/stationManagerPage.js';
import lineManagerPage from './components/views/lineManagerPage.js';
import sectionManagerPage from './components/views/SectionManagerPages/sectionManagerPage.js';
import mapPrintManagerPage from './components/views/mapPrintManagerPage.js';

export default function subwayMapApp($element) {
  const init = () => {
    const $stationManagerBtn = $element.querySelector('#station-manager-button');
    const $lineManagerBtn = $element.querySelector('#line-manager-button');
    const $sectionManagerBtn = $element.querySelector('#section-manager-button');
    const $mapPrintManagerBtn = $element.querySelector('#map-print-manager-button');
    const $contentSection = $element.querySelector('.content-container');

    $stationManagerBtn.addEventListener('click', () => stationManagerPage($contentSection));
    $lineManagerBtn.addEventListener('click', () => lineManagerPage($contentSection));
    $sectionManagerBtn.addEventListener('click', () => sectionManagerPage($contentSection));
    $mapPrintManagerBtn.addEventListener('click', () => mapPrintManagerPage($contentSection));
  };

  init();
}
