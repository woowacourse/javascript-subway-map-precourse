import { appendAtEnd } from './util/util-ui.js';
import { launchStationManager } from './managers/station/launcher.js';
import { launchLineManager } from './managers/line/launcher.js';
import { launchSectionManager } from './managers/section/launcher.js';
import { launchMapPrintManager } from './managers/map-print/launcher.js';
import { MENU } from './configuration.js';

export default function SubwayLineManager() {
  const app = document.getElementById('app');

  createMenuBar(app);
  appendAtEnd('div', app, '', '#container');
}

const createMenuBar = (app) => {
  const menuBar = appendAtEnd('div', app, '', '#menu-bar');
  const menuButtons = MENU.map((attr, i) =>
    appendAtEnd('button', menuBar, `${i + 1}. ${attr.content}`, attr.id)
  );

  addEventListenerOnMenuButton(menuButtons);
};

const addEventListenerOnMenuButton = (menuButtons) => {
  const MENU_BUTTON_HANDLER = [
    launchStationManager,
    launchLineManager,
    launchSectionManager,
    launchMapPrintManager,
  ];

  menuButtons.forEach((button, i) =>
    button.addEventListener('click', MENU_BUTTON_HANDLER[i])
  );
};

new SubwayLineManager();
