import addMenuButton from './addMenuButton.js';
import addMenuButtonEvent from './addMenuButtonEvent.js';
import addSubwayMangagementContainer from './addSubwayMangagementContainer.js';
import initPages from './page/initPages.js';

export default function initializeSite() {
  addMenuButton();
  addSubwayMangagementContainer();
  initPages();

  addMenuButtonEvent();
}
