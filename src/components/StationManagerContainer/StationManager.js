import StationManagerEvent from "./StationManagerEvent.js";

export default class StationManager extends StationManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--StationManager--");
  }

  isValidStationName(station) {
    super.isValidStationName(station);
    if (this.is2Digits(station) && this.isDuplicate(station)) return true;
    return false;
  }

  is2Digits(station) {
    if (station.length >= 2) return true;
    window.alert("역 이름은 2자리수 이상이여야 합니다");
    return false;
  }

  isDuplicate(station) {
    if (!this.stations.includes(station)) return true;
    window.alert(`${station}은 중복되는 역 이름 입니다.`);
    return false;
  }

  localStorageItemAdd(item) {
    super.localStorageItemAdd(item);
    this.stations.push(item);
    this.saveLocalStorageValue(this.localStorageKey, this.stations);
  }

  deleteTrData(stationName) {
    super.deleteTrData(stationName);
    this.stations = this.stations.filter((station) => station !== stationName);
    this.saveLocalStorageValue(this.localStorageKey, this.stations);
  }
}
