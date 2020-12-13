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
    // 중복 검증 구현 해야함
    return true;
  }

  localStorageItemAdd(item) {
    super.localStorageItemAdd(item);
    this.stations.push(item);
    this.saveLocalStorageValue(this.localStorageKey, this.stations);
  }
}
