import actionResult from "../actionResult.js";
import { lineSelector } from "../../_store/selectors.js";
import {
  NAME_LENGTH_ERROR,
  SAME_LINE_EXISTS_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";

const getLineNameList = () =>
  lineSelector() ? lineSelector().map((lineInfo) => lineInfo.lineName) : [];

export default class LineNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this._isMoreThanTwoCharacters = inputValue.length > 0;
    this._isNotHaveSpace = !/\s+/g.test(inputValue);
  }

  _isUniqueLineName() {
    return !getLineNameList().some((lineName) => lineName === this.inputValue);
  }

  getInputResult() {
    if (!this._isMoreThanTwoCharacters)
      return actionResult(false, NAME_LENGTH_ERROR);
    if (!this._isNotHaveSpace) return actionResult(false, SPACE_ERROR);
    if (!this._isUniqueLineName())
      return actionResult(false, SAME_LINE_EXISTS_ERROR);
    return actionResult(true);
  }
}
