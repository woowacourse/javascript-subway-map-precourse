import initPages from './page/initPages.js';
import addMenuButtonEvent from './event/addMenuButtonEvent.js';

export default function initializeSite() {
  initPages();

  addMenuButtonEvent();
}
