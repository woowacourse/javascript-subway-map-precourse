import { STATION_LIST } from "../constant/constant.js";

export default class Station {
  constructor() {}

  _setStationList = stationList => {
    localStorage.setItem(STATION_LIST, JSON.stringify(stationList));
  };
}
