export const menuButtonList = () => {
  return `<div>
    ${staitonManagerButton}
    ${lineManagerButton}
    ${sectionManagerButton}
    ${mapPrintManagerButton}
  </div>`;
};

const menuButton = (id, name) => {
  return `<button id=${id}>${name}</button>`;
};

const staitonManagerButton = menuButton('station-manager-button', '1. 역 관리');
const lineManagerButton = menuButton('line-manager-button', '2. 노선 관리');
const sectionManagerButton = menuButton(
  'section-manager-button',
  '3. 구간 관리'
);
const mapPrintManagerButton = menuButton(
  'map-print-manager-button',
  '4. 지하철 노선도 출력'
);
