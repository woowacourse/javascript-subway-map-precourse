import addMenuButton from './addMenuButton.js';
import addMenuButtonEvent from './addMenuButtonEvent.js';
import addSubwayMangagementContainer from './addSubwayMangagementContainer.js';

export default function initializeSite() {
  addMenuButton();
  addSubwayMangagementContainer();

  addMenuButtonEvent();
}
