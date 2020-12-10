export default class StationManager {
  constructor() {
    this.stationList = [];
    this.setStationList();
  }

  setStationList() {
    const storedStationList = localStorage.stationList;
    if (storedStationList !== undefined) {
      this.stationList = JSON.parse(storedStationList);
    }
  }

  addStation(station) {
    this.stationList.push(station);
    localStorage.stationList = JSON.stringify(this.stationList);
  }
}
