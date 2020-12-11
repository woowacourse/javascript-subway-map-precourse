import { appendAtEnd } from './util/utilUI.js';
import { startStationManager } from './handlers/stationManager.js';
import { startLineManager } from './handlers/lineManager.js';
import { startSectionManager } from './handlers/sectionManager.js';
import { startMapPrintManager } from './handlers/mapPrintManager.js';
import { MENU } from './configuration.js';

export default function SubwayLineManager() {
  const app = document.getElementById('app');
  const menuBar = appendAtEnd('div', app, '', '#menu-bar');
  const menuButtons = createMenuButtons(menuBar);

  appendAtEnd('div', app, '', '#container');
  addEventListeners(menuButtons);
}

const createMenuButtons = (menuBar) => {
  return MENU.map((attr, i) =>
    appendAtEnd('button', menuBar, `${i + 1}. ${attr.content}`, attr.id)
  );
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
