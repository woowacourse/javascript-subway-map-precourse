import {MENU} from '../constants.js';
import {handleInitStation} from '../handlers/station-handler.js';
import {handleInitLine} from '../handlers/line-handler.js';
import {handleInitSection} from '../handlers/section-handler.js';
import {handleMap} from '../handlers/map-handler.js';

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
    this.stationButton.addEventListener('click', handleInitStation);
    this.lineButton.addEventListener('click', handleInitLine);
    this.sectionButton.addEventListener('click', handleInitSection);
    this.mapButton.addEventListener('click', handleMap);
  }
}

new MenuListener();
