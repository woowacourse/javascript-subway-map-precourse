import actionResult from "../actionResult.js";
import { stationSelector } from "../../_store/selectors.js";

import {
  NAME_LENGTH_ERROR,
  SAME_NAME_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";

import { isLessThanMinLengthOfStationName, haveSpace } from "../common.js";

export default class StationNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this._isLessThanMinLength = isLessThanMinLengthOfStationName(inputValue);
    this._haveSpace = haveSpace(inputValue);
  }

  _isUniqueStationName() {
    return !stationSelector().some(
      (stationName) => stationName === this.inputValue,
    );
  }

  getInputResult() {
    if (this._isLessThanMinLength)
      return actionResult(false, NAME_LENGTH_ERROR);
    if (this._haveSpace) return actionResult(false, SPACE_ERROR);
    if (!this._isUniqueStationName())
      return actionResult(false, SAME_NAME_ERROR);
    return actionResult(true);
  }
}
