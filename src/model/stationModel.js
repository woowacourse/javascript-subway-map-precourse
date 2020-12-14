import StationNode from './staionNode.js';

/**
 * localStorage와 통신하는 DAO
 * 데이터 저장/수정시에 StaionNode를 이용한다.
 * 
 * localStorage 구조:
 * {
 * stationList [] : staionNode 배열
 * }
 */
export default class StationModel {
  constructor() {}

  createNode(stationName) {
    return new StationNode({ name: stationName });
  }

  findNodeByName(stationName) {
    const stationList = this.getList();
    return stationList.find(station => station.name === stationName);
  }

  /**
   * 
   * @param {*} stationName 
   */
  insertData(stationName) {
    const stationList = this.getList();
    stationList.push(this.createNode(stationName));
    // stationList.push(stationName);
    localStorage.setItem('stationList', JSON.stringify(stationList));
  }

  deleteData(stationName) {
    const stationList = this.getList();
    const index = stationList.findIndex(
      station => station.name === stationName,
    );
    // const index = stationList.findIndex(name => name === stationName);

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
