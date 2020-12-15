import actionResult from "../actionResult.js";
import { lineSelector } from "../../store/selectors.js";
import {
  LINE_NAME_EMPTY_ERROR,
  SAME_LINE_EXISTS_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";
import { isEmptyInput, haveSpace } from "../common.js";

export default class LineNameInputValidation {
  constructor({ lineName }) {
    this.inputValue = lineName;
    this._isEmptyInput = isEmptyInput(lineName);
    this._haveSpace = haveSpace(lineName);
  }

  _isUniqueLineName() {
    if (!lineSelector()) return false;
    return !lineSelector()
      .map((lineInfo) => lineInfo.lineName)
      .some((lineName) => lineName === this.inputValue);
  }

  getInputResult() {
    if (this._isEmptyInput) return actionResult(false, LINE_NAME_EMPTY_ERROR);
    if (this._haveSpace) return actionResult(false, SPACE_ERROR);
    if (!this._isUniqueLineName())
      return actionResult(false, SAME_LINE_EXISTS_ERROR);
    return actionResult(true);
  }
}
