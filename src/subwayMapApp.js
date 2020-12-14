export default function subwayMapApp($element) {
  const $stationManagerBtn = $element.querySelector('#station-manager-button');
  const $lineManagerBtn = $element.querySelector('#line-manager-button');
  const $sectionManagerBtn = $element.querySelector('#section-manager-button');
  const $mapPrintManagerBtn = $element.querySelector('#map-print-manager-button');

  const onStationManageHandler = () => {
    console.log('역관리 입니다.');
  };
  const onLineManageHandler = () => {
    console.log('라인관리 입니다.');
  };
  const onSectionManageHandler = () => {
    console.log('노선관리 입니다.');
  };
  const onMapPrintManageHandler = () => {
    console.log('전체 노선도 출력 입니다.');
  };

  $stationManagerBtn.addEventListener('click', onStationManageHandler);
  $lineManagerBtn.addEventListener('click', onLineManageHandler);
  $sectionManagerBtn.addEventListener('click', onSectionManageHandler);
  $mapPrintManagerBtn.addEventListener('click', onMapPrintManageHandler);
}
