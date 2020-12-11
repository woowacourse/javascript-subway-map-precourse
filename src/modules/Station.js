import { STATION_LIST, MIN_STATION_NAME_LENGTH } from "../constant/constant.js";
import {
  INVALID_NAME_LENGTH_ALERT,
  SAVED_STATION_ALERT,
} from "../constant/message.js";

export default class Station {
  constructor() {
    this._stationList = this._getSavedStationList();
  }

  _isSavedStation = name => {
    const savedStation = this._stationList.filter(
      station => station.name === name
    );

    return savedStation.length !== 0;
  };

  _setStationList = stationList => {
    localStorage.setItem(STATION_LIST, JSON.stringify(stationList));
  };

  _getSavedStationList = () => {
    const savedStationList = localStorage.getItem(STATION_LIST);

    return JSON.parse(savedStationList) || [];
  };

  _getStationObject = name => {
    return { name, line: [] };
  };

  _failToSaveNewStation = (isValidLength, isSavedStation) => {
    if (!isValidLength) {
      alert(INVALID_NAME_LENGTH_ALERT);
    }

    if (isSavedStation) {
      alert(SAVED_STATION_ALERT);
    }
  };

  saveNewStation = name => {
    const isValidLength = name.length >= MIN_STATION_NAME_LENGTH;
    const isSavedStation = this._isSavedStation(name);

    if (isValidLength && !isSavedStation) {
      this._stationList.push(this._getStationObject(name));
      this._setStationList(this._stationList);

      return;
    }

    this._failToSaveNewStation(isValidLength, isSavedStation);
  };

  getStationList = () => {
    return this._stationList;
  };
}
