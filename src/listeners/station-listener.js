import {STATION} from '../constants.js';
import {
  handleAddStation, handlerDeleteStation,
} from '../handlers/station-handler.js';

export default class StationListener {
  constructor(subwayStation) {
    this.subwayStation = subwayStation;

    this.addListenerToAddButton();
    this.addListenerToResult();
  }

  addListenerToAddButton() {
    const stationAddButton = document.getElementById(STATION.BUTTON.ADD.ID);

    stationAddButton.addEventListener('click', () => {
      handleAddStation(this.subwayStation);
    });
  }

  addListenerToResult() {
    const result = document.getElementById(STATION.DIV.RESULT.ID);

    result.addEventListener('click', (event) => {
      if (event.target.className === STATION.BUTTON.DELETE.CLASS) {
        handlerDeleteStation(this.subwayStation, event.target);
      }
    });
  }
}
