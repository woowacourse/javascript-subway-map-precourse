import Section from "../../models/section.js";
import { lineSelector } from "../../store/selectors.js";
import actionResult from "../actionResult.js";
import { MIN_LENGTH_OF_LINE } from "../../common/constants.js";
import { DELETE_STATION_ERROR } from "../../common/alertMessages.js";

export default class DeleteStationValidation extends Section {
  constructor(props) {
    const { stationName, lineName } = props;
    super(stationName, null, lineName);
    this.deletedStationName = stationName;
    this.isSectionManagement = lineName !== undefined;
    this.updatedLineList = this.isSectionManagement
      ? [lineName]
      : this._getLinesContainThisStation();
  }

  _getLinesContainThisStation() {
    return lineSelector()
      .filter(({ stations }) => {
        return stations.includes(this.deletedStationName);
      })
      .map(({ lineName }) => lineName);
  }

  _getLineStationList(lineName) {
    return lineSelector().filter(
      (lineData) => lineData.lineName === lineName,
    )[0].stations;
  }

  _isLineLessThanTwo() {
    return this.updatedLineList.some(
      (lineName) =>
        this._getLineStationList(lineName).length <= MIN_LENGTH_OF_LINE,
    );
  }

  getDeleteValidationResult() {
    return actionResult(
      !this._isLineLessThanTwo(),
      this._isLineLessThanTwo() ? DELETE_STATION_ERROR : null,
      !this._isLineLessThanTwo() ? this.updatedLineList : [],
    );
  }
}
