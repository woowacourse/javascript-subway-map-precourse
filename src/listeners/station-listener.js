import {STATION} from '../constants.js';

export default class StationListener {
  constructor(subwayStation) {
    this.subwayStation = subwayStation;
    this.setElement();
    this.addEventListener();
  }

  setElement() {
    this.stationAddButton = document.getElementById(STATION.BUTTON.ADD.ID);
  }

  addEventListener() {
    this.stationAddButton
        .addEventListener('click', this.subwayStation.addStation);

    document.addEventListener('click', (event)=>{
      if (event.target.className === STATION.BUTTON.DELETE.CLASS) {
        this.subwayStation.deleteStation(event.target);
      }
    });
  }
}
