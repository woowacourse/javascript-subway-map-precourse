import {MENU} from '../constants.js';
import {handleStation} from '../handlers/station-handler.js';
import {handleLine} from '../handlers/line-handler.js';

export default class MenuListener {
  constructor() {
    this.setElement();
    this.addEventListener();
  }

  setElement() {
    this.stationButton = document.getElementById(MENU.BUTTON.STATION.ID);
    this.lineButton = document.getElementById(MENU.BUTTON.LINE.ID);
    this.sectionButton = document.getElementById(MENU.BUTTON.SECTION.ID);
    this.mapButton = document.getElementById(MENU.BUTTON.MAP.ID);
  }

  addEventListener() {
    this.stationButton.addEventListener('click', handleStation);
    this.lineButton.addEventListener('click', handleLine);
  }
}

new MenuListener();
