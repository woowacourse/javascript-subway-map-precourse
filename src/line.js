import TableUtils from "./table_utils.js";
import CommonUtils from "./common_utils.js";

export default class Line {
  constructor(lineName, stationArray) {
    this.lineName = lineName;
    this.stations = stationArray;
  }
}