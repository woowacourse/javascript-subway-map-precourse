import actionResult from "../actionResult.js";
import { lineSelector } from "../../_store/selectors.js";
import {
  LINE_NAME_EMPTY_ERROR,
  SAME_LINE_EXISTS_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";

export default class LineNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this._isMoreThanTwoCharacters = inputValue.length > 0;
    this._isNotHaveSpace = !/\s+/g.test(inputValue);
  }

  _isUniqueLineName() {
    if (!lineSelector()) return false;
    return !lineSelector()
      .map((lineInfo) => lineInfo.lineName)
      .some((lineName) => lineName === this.inputValue);
  }

  getInputResult() {
    if (!this._isMoreThanTwoCharacters)
      return actionResult(false, LINE_NAME_EMPTY_ERROR);
    if (!this._isNotHaveSpace) return actionResult(false, SPACE_ERROR);
    if (!this._isUniqueLineName())
      return actionResult(false, SAME_LINE_EXISTS_ERROR);
    return actionResult(true);
  }
}
