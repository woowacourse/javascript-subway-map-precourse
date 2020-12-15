import stationManagerPage from './components/stationManagerPage.js';
import lineManagerPage from './components/lineManagerPage.js';
import sectionManagerPage from './components/sectionManagerPage.js';
import mapPrintManagerPage from './components/mapPrintManagerPage.js';

export default function subwayMapApp($element) {
  const $stationManagerBtn = $element.querySelector('#station-manager-button');
  const $lineManagerBtn = $element.querySelector('#line-manager-button');
  const $sectionManagerBtn = $element.querySelector('#section-manager-button');
  const $mapPrintManagerBtn = $element.querySelector('#map-print-manager-button');
  const $contentSection = $element.querySelector('.content-container');

  const onStationManageHandler = () => {
    stationManagerPage($contentSection);
  };
  const onLineManageHandler = () => {
    lineManagerPage($contentSection);
  };
  const onSectionManageHandler = () => {
    sectionManagerPage($contentSection);
  };
  const onMapPrintManageHandler = () => {
    mapPrintManagerPage($contentSection);
  };

  $stationManagerBtn.addEventListener('click', onStationManageHandler);
  $lineManagerBtn.addEventListener('click', onLineManageHandler);
  $sectionManagerBtn.addEventListener('click', onSectionManageHandler);
  $mapPrintManagerBtn.addEventListener('click', onMapPrintManageHandler);
}
