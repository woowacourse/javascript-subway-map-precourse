import MenuView from './Menu/MenuView.js';
import MenuController from './Menu/MenuController.js';

export default class SubwayManager {
  constructor() {
    if (!(localStorage.getItem('Stations') && localStorage.getItem('Lines'))) {
      this.setLocalStrageDefault();
    }
    this.setLocalStrageDefault();
    // console.log(JSON.parse(localStorage.getItem('Stations')));
    // console.log(JSON.parse(localStorage.getItem('Lines')));
    MenuView.menuButtonListView();
    MenuController.buttonEventController();
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

    console.log(JSON.parse(localStorage.getItem('Stations')));
    console.log(JSON.parse(localStorage.getItem('Lines')));
  }
}

new SubwayManager();
