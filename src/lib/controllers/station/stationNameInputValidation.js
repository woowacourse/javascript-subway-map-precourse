import actionResult from "../actionResult.js";
import { stationSelector } from "../../_store/selectors.js";
import { MIN_LENGTH_OF_STATION_NAME } from "../../common/constants.js";

export default class StationNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this._isMoreThanTwoCharacters =
      inputValue.length >= MIN_LENGTH_OF_STATION_NAME;
    this._isNotHaveSpace = !/\s+/g.test(inputValue);
  }

  _isUniqueStationName() {
    return !stationSelector.some(
      (stationName) => stationName === this.inputValue,
    );
  }

  getInputResult() {
    if (!this._isMoreThanTwoCharacters)
      return actionResult(
        false,
        `역 이름은 최소 ${MIN_LENGTH_OF_STATION_NAME}글자 이상이어야 합니다.`,
      );
    if (!this._isNotHaveSpace)
      return actionResult(false, `공백은 입력받을 수 없습니다.`);
    if (!this._isUniqueStationName())
      return actionResult(false, `지하철 역 이름은 중복될 수 없습니다.`);
    return actionResult(true);
  }
}
