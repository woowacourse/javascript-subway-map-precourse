
import ManageStation from './manage_station.js';
import Menu from './menu.js';

export default class SubwayMap {
  constructor() {
    document.body.style.fontFamily = 'Arial';
    new Menu();

    new ManageStation();
  }
}

new SubwayMap();