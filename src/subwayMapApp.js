import stationManagerPage from './components/stationManagerPage.js';
import lineManagerPage from './components/lineManagerPage.js';

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
    console.log('구간관리 입니다.');
  };
  const onMapPrintManageHandler = () => {
    console.log('전체 노선도 출력 입니다.');
  };

  $stationManagerBtn.addEventListener('click', onStationManageHandler);
  $lineManagerBtn.addEventListener('click', onLineManageHandler);
  $sectionManagerBtn.addEventListener('click', onSectionManageHandler);
  $mapPrintManagerBtn.addEventListener('click', onMapPrintManageHandler);
}
