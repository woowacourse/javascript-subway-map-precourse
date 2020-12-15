import StationManagerEvent from "./StationManagerEvent.js";
import isValidValue from "../../utils/isValidValue.js";
import { ERROR_MESSAGE } from "../../utils/constants.js";

export default class StationManager extends StationManagerEvent {
  constructor(stateId) {
    super(stateId);
  }

  isValidStationName(station) {
    if (
      isValidValue(station) &&
      this.is2Digits(station) &&
      this.isDuplicate(station)
    ) {
      return true;
    }

    return false;
  }

  is2Digits(station) {
    if (station.length >= 2) return true;
    window.alert(ERROR_MESSAGE.IS_VALID_2DIGITS);
    return false;
  }

  isDuplicate(station) {
    if (!this.stations.includes(station)) return true;
    window.alert(ERROR_MESSAGE.IS_DUPLICATE_STATION_NAME);
    return false;
  }

  localStorageItemAdd(item) {
    this.stations.push(item);
    this.saveLocalStorageValue(this.localStorageKey, this.stations);
  }

  deleteTrData(stationName) {
    this.stations = this.stations.filter((station) => station !== stationName);
    this.saveLocalStorageValue(this.localStorageKey, this.stations);
  }

  isUsedLine(stationName) {
    for (const lineInfo of this.lines) {
      if (lineInfo.line.includes(stationName)) {
        return true;
      }
    }

    return false;
  }
}
