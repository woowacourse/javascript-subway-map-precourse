import { STATION_LIST } from "../constant/constant.js";

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
}
