export default class StationModel {
  constructor() {}

  /**
   * localStorage
   * stations: []
   */
  insertData(stationName) {
    const stationList = this.getList();
    stationList.push(stationName);
    localStorage.setItem('stationList', JSON.stringify(stationList));
  }

  deleteData(stationName) {
    const stationList = this.getList();
    const index = stationList.findIndex(name => name === stationName);
    stationList.splice(index, 1);
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
