import { appendNew } from './utils/util-ui.js';
import { launchStationManager } from './managers/station/station-launcher.js';
import { launchLineManager } from './managers/line/line-launcher.js';
import { launchSectionManager } from './managers/section/section-launcher.js';
import { launchMapPrintManager } from './managers/map-print/map-print-launcher.js';
import { MENU_LIST } from './configuration.js';

export default function SubwayLineManager() {
  const app = document.getElementById('app');

  createInitialView(app);
}

const createInitialView = (app) => {
  const menuBar = appendNew('div', app, '', '#menu-bar');
  const menuButtons = MENU_LIST.map((attr, i) =>
    appendNew('button', menuBar, `${i + 1}. ${attr.content}`, attr.id)
  );
  const container = appendNew('div', app, '', '#container');

  addEventListenerOnMenuButton(menuButtons, container);
};

const addEventListenerOnMenuButton = (menuButtons, container) => {
  const launchManager = [
    launchStationManager,
    launchLineManager,
    launchSectionManager,
    launchMapPrintManager,
  ];

  menuButtons.forEach((button, i) =>
    button.addEventListener('click', () => {
      const menu = MENU_LIST[i].menu;

      launchManager[i](menu, container);
    })
  );
};

new SubwayLineManager();
