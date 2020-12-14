import MenuView from './Menu/MenuView.js';
import MenuController from './Menu/MenuController.js';

export default class SubwayManager {
  constructor() {
    this.setLocalStrageDefault();
    MenuView.menuButtonListView();
    MenuController.buttonEventController();
  }

  setLocalStrageDefault() {
    const stationDefault = ['인천', '서울역', '소요산', '신도림'];
    const lineDefault = {
      "1호선": [stationDefault[0], stationDefault[1], stationDefault[2]],
      "2호선": [stationDefault[3], stationDefault[1]],
      "3호선": [stationDefault[2], stationDefault[0]],
    };
    if (!(localStorage.getItem('Stations') && localStorage.getItem('Lines'))) {
      localStorage.setItem('Stations', stationDefault);
      localStorage.setItem('Lines', JSON.stringify(lineDefault));
    }
  }
}

new SubwayManager();
