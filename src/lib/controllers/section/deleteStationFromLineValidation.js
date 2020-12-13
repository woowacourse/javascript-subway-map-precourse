import { lineSelector } from "../../_store/selectors.js";
import actionResult from "../actionResult.js";
import { MIN_LENGTH_OF_LINE } from "../../common/constants.js";
import { DELETE_STATION_ERROR } from "../../common/alertMessages.js";

export default class DeleteStationFromLineValidation {
  constructor(stationName, lineName) {
    this.deletedStationName = stationName;
    this.updatedLineName = lineName;
    this.isSectionManagement = lineName !== undefined;
    this.lineDataSet = lineName
      ? lineSelector().filter((lineData) => lineData.lineName === lineName)[0]
          .stations
      : [];
    this.isLessThanMinLength = lineName
      ? this.lineDataSet.length <= MIN_LENGTH_OF_LINE
      : false;
  }

  // 지울 역이 포함된 노선들 모두 탐색(배열)
  _getLinesContainThisStation() {
    return lineSelector()
      .filter(({ stations }) => {
        if (stations.length <= MIN_LENGTH_OF_LINE)
          this.isLessThanMinLength = true;
        return stations.includes(this.deletedStationName);
      })
      .map(({ lineName }) => lineName);
  }

  getDeleteValidationResult() {
    const lineNamesListWillBeUpdated = this.isSectionManagement
      ? [this.updatedLineName]
      : this._getLinesContainThisStation();
    console.log(this.isSectionManagement);
    console.log(lineNamesListWillBeUpdated);
    if (this.isLessThanMinLength && lineNamesListWillBeUpdated.length > 0)
      return actionResult(false, DELETE_STATION_ERROR);
    return actionResult(true, null, lineNamesListWillBeUpdated);
  }
}
