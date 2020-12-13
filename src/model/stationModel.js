export default class StationModel {
  constructor() {}

  /**
   * localStorage
   * stations: []
   */
  addData(station) {
    const stationList = this.getList();
    stationList.push(station);
    localStorage.setItem('stationList', JSON.stringify(stationList));
  }

  getList() {
    const storageStationList = localStorage.getItem('stationList');
    let stationList = [];
    if (storageStationList) {
      stationList = [...JSON.parse(storageStationList)];
    }

    return stationList;
  }
}
