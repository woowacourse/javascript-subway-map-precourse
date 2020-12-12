import { appendAtEnd } from './util/util-ui.js';
import { launchStationManager } from './managers/station/launcher.js';
import { launchLineManager } from './managers/line/launcher.js';
import { launchSectionManager } from './managers/section/launcher.js';
import { launchMapPrintManager } from './managers/map-print/launcher.js';
import { MENU_LIST } from './configuration.js';

export default function SubwayLineManager() {
  const app = document.getElementById('app');

  createInitialView(app);
}

const createInitialView = (app) => {
  const menuBar = appendAtEnd('div', app, '', '#menu-bar');
  const menuButtons = MENU_LIST.map((attr, i) =>
    appendAtEnd('button', menuBar, `${i + 1}. ${attr.content}`, attr.id)
  );
  const container = appendAtEnd('div', app, '', '#container');

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
