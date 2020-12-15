import MenuView from './Menu/MenuView.js';
import MenuController from './Menu/MenuController.js';
import StationManagerController from './StationManger/StationManagerController.js';
import LineManagerController from './LineManger/LineManagerController.js';
import SectionManagerController from './SectionManager/SectionManagerController.js';

export default class SubwayManager {
  constructor() {
    if (this.checkLocalStorage()) {
      this.setLocalStrageDefault();
    }
    MenuView.menuButtonListView();
    MenuController.buttonEventController();
    SectionManagerController.buttonEventController();
    LineManagerController.buttonEventController();
    StationManagerController.buttonEventController();
  }

  checkLocalStorage() {
    const stations = localStorage.getItem('Stations');
    const lines = localStorage.getItem('Lines');
    return !(stations && lines) || (stations === '{}') || (lines === '{}');
  }

  setLocalStrageDefault() {
    const stationDefault = {
      "인천": { "lines": ["1호선", "3호선"] },
      "서울역": { "lines": ["1호선", "2호선"] },
      "소요산": { "lines": ["1호선", "3호선"] },
      "신도림": { "lines": ["2호선"] }
    };
    const lineDefault = {
      "1호선": { "stations": ["인천", "서울역", "소요산"] },
      "2호선": { "stations": ["신도림", "서울역"] },
      "3호선": { "stations": ["소요산", "인천"] }
    };
    localStorage.setItem('Stations', JSON.stringify(stationDefault));
    localStorage.setItem('Lines', JSON.stringify(lineDefault));
  }
}

new SubwayManager();
