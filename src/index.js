import ManageStation from './manage_station.js';
import Menu from './menu.js';
import ManageLine from './manage_line.js';
import ManageSection from './manage_section.js';

export default class SubwayMap {
  constructor() {
    document.body.style.fontFamily = 'Arial';
    
    const menu = new Menu();
    const manageStation = new ManageStation();
    const manageLine = new ManageLine();
    const manageSection = new ManageSection();

    menu.createMenu();
    manageLine.initPage();
    manageStation.initPage();
    manageSection.initPage();
  }
}

new SubwayMap();