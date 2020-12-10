import { appendAtEnd } from './util/utilUI.js';
import { startStationManager } from './handlers/stationManager.js';
import { startLineManager } from './handlers/lineManager.js';
import { startSectionManager } from './handlers/sectionManager.js';
import { startMapPrintManager } from './handlers/mapPrintManager.js';

export default function SubwayLineManager() {
  const managerButtons = createManagerButtons();

  addEventListenerOnManagerButtons(managerButtons);
}

const createManagerButtons = () => {
  const BUTTON_ATTRIBUTE = [
    {
      content: '1. 역 관리',
      id: 'station-manager-button',
    },
    {
      content: '2. 노선 관리',
      id: 'line-manager-button',
    },
    {
      content: '3. 구간 관리',
      id: 'section-manager-button',
    },
    {
      content: '4. 지하철 노선도 출력',
      id: 'map-print-manager-button',
    },
  ];
  const app = document.getElementById('app');
  const container = appendAtEnd('div', app, null, 'manager-container');

  return BUTTON_ATTRIBUTE.map((attr) =>
    appendAtEnd('button', container, attr.content, `#${attr.id}`)
  );
};

const addEventListenerOnManagerButtons = (managerButtons) => {
  const MANAGER_BUTTON_HANDLER = [
    startStationManager,
    startLineManager,
    startSectionManager,
    startMapPrintManager,
  ];

  managerButtons.forEach((button, i) =>
    button.addEventListener('click', MANAGER_BUTTON_HANDLER[i])
  );
};

new SubwayLineManager();
