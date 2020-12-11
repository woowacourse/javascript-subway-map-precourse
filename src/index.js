import { appendAtEnd } from './util/utilUI.js';
import { startStationManager } from './handlers/stationManager.js';
import { startLineManager } from './handlers/lineManager.js';
import { startSectionManager } from './handlers/sectionManager.js';
import { startMapPrintManager } from './handlers/mapPrintManager.js';

export default function SubwayLineManager() {
  const app = document.getElementById('app');
  const menuBar = appendAtEnd('div', app, '', '#menu-bar');
  const menuButtons = createMenuButtons(menuBar);

  createManagerContainer(app);
  addEventListeners(menuButtons);
}

const createMenuButtons = (menuBar) => {
  const MENU = [
    {
      index: 1,
      content: '역 관리',
      id: '#station-manager-button',
    },
    {
      index: 2,
      content: '노선 관리',
      id: '#line-manager-button',
    },
    {
      index: 3,
      content: '구간 관리',
      id: '#section-manager-button',
    },
    {
      index: 4,
      content: '지하철 노선도 출력',
      id: '#map-print-manager-button',
    },
  ];

  return MENU.map((attr) => {
    const menuButton = appendAtEnd(
      'button',
      menuBar,
      `${attr.index}. ${attr.content}`,
      attr.id
    );

    menuButton.setAttribute('data-menu', attr.index);
    return menuButton;
  });
};

const createManagerContainer = (app) => {
  const container = appendAtEnd('div', app, '', '#manager-ui');

  container.setAttribute('data-menu-selected', 0);
};

const addEventListeners = (menuButtons) => {
  const MANAGER_BUTTON_HANDLER = [
    startStationManager,
    startLineManager,
    startSectionManager,
    startMapPrintManager,
  ];

  menuButtons.forEach((button, i) =>
    button.addEventListener('click', MANAGER_BUTTON_HANDLER[i])
  );
};

new SubwayLineManager();
