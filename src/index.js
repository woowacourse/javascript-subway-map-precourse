import ManageStation from './manage_station.js';
import Menu from './menu.js';
import ManageLine from './manage_line.js';
import ManageSection from './manage_section.js';

export default class SubwayMap {
  constructor() {
    document.body.style.fontFamily = 'Arial';
    new Menu();

    new ManageStation();
    new ManageLine();
    new ManageSection();
  }
}

new SubwayMap();