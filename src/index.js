import { appendAtEnd } from './utilUI.js';

export default function SubwayLineManager() {
  const managerButtons = createManagerButtons();
}

const createManagerButtons = () => {
  const MANAGER_BUTTON_ID = [
    'station-manager-button',
    'line-manager-button',
    'section-manager-button',
    'map-print-manager-button',
  ];
  const MANAGER_BUTTON_CONTENT = [
    '1. 역 관리',
    '2. 노선 관리',
    '3. 구간 관리',
    '4. 지하철 노선도 출력',
  ];
  const app = document.getElementById('app');
  const container = appendAtEnd('div', app, null, 'manager-container');

  return MANAGER_BUTTON_ID.map((v, i) => {
    appendAtEnd(
      'button',
      container,
      MANAGER_BUTTON_CONTENT[i],
      `#${MANAGER_BUTTON_ID[i]}`
    );
  });
};

new SubwayLineManager();
