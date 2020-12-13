import { init } from "./initial.js"

export default class Subway {
  constructor() {
    this.stationList = [];
    this.lineList = [];
  }


  // 1. 역 관리 관련 메서드
  clickStationManagerButton() {

  }

  isNotExistStation(station) {
    return this.stationList.includes(station)
  }

  checkLength(station) {
    return station.length > 2
  }

  addStation(station) {
    if (this.isNotExistStation(station) && this.checkLength(station)) {
      this.stationList.push(station)
    }
  }

  deleteStation(station) {
    const idx = this.stationList.indexOf(station)
    if (idx > -1) {
      this.stationList.splice(idx,1)
    }
  }

  // 2. 노선 관리 관련 메서드
  clickLineManagerButton() {

  }

  isNotExistLine(line) {
    return this.lineList.includes(line)
  }

  // 3. 구간 관리 관련 메서드
  clickSectionManagerButton() {

  }

  selectLine() {

  }

  getSelectedLineInfo() {

  }

  addStationOrder() {

  }

  deleteStationOrder() {

  }
}

new Subway();