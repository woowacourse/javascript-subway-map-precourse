import actionResult from "../actionResult.js";
import {
  NAME_LENGTH_ERROR,
  //  SAME_NAME_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";

export default class LineNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this._isMoreThanTwoCharacters = inputValue.length > 0;
    this._isNotHaveSpace = !/\s+/g.test(inputValue);
  }

  //중복 검사 만들기

  getInputResult() {
    if (!this._isMoreThanTwoCharacters)
      return actionResult(false, NAME_LENGTH_ERROR);
    if (!this._isNotHaveSpace) return actionResult(false, SPACE_ERROR);
    // if (!this._isUniqueStationName())
    //   return actionResult(false, SAME_NAME_ERROR);
    return actionResult(true);
  }
}
