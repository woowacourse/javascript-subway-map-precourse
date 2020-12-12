import {STATION} from '../constants.js';
import {
  renderStationList, renderStation,
} from '../views/subway-station-view.js';

export default class SubwayStation {
  constructor() {
    this.stationList = this.getStations();
  }

  getStations() {
    const stationList = JSON.parse(localStorage.getItem('station'));

    if (stationList) return stationList;

    return [];
  }

  addStation = () => {
    const station = document.getElementById(STATION.INPUT.ID).value;

    if (!this.isValidStation(station)) {
      return this.alert(station);
    }

    this.stationList.push(station);

    localStorage.setItem('station', JSON.stringify(this.stationList));

    renderStation(this.stationList);
  }

  deleteStation = (target) => {
    if (!this.deleteConfirm()) return;

    const id = parseInt(target.dataset.stationId);

    this.stationList = this.stationList.filter((station, i) => i !== id);

    localStorage.setItem('station', JSON.stringify(this.stationList));

    renderStationList(this.stationList);
  }

  deleteConfirm() {
    return confirm(STATION.ALERT.DELETE);
  }

  isValidStation(station) {
    return this.hasValidName(station);
  }

  hasValidName(station) {
    if (this.stationList.includes(station)) return false;
    if (station.length < 2 ) return false;

    return true;
  }

  alert(station) {
    if (station.length < 2) {
      return alert(STATION.ALERT.LENGTH);
    }

    alert(STATION.ALERT.DUPLICATION);
  }
}
