import actionResult from "../actionResult.js";
import { stationSelector } from "../../_store/selectors.js";
import { MIN_LENGTH_OF_STATION_NAME } from "../../common/constants.js";
import {
  NAME_LENGTH_ERROR,
  SAME_NAME_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";

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
      return actionResult(false, NAME_LENGTH_ERROR);
    if (!this._isNotHaveSpace) return actionResult(false, SPACE_ERROR);
    if (!this._isUniqueStationName())
      return actionResult(false, SAME_NAME_ERROR);
    return actionResult(true);
  }
}
