import actionResult from "../actionResult.js";
import {
  NAME_LENGTH_ERROR,
  SAME_LINE_EXISTS_ERROR,
  SPACE_ERROR,
} from "../../common/alertMessages.js";

export default class LineNameInputValidation {
  constructor(inputValue) {
    this.inputValue = inputValue;
    this._isMoreThanTwoCharacters = inputValue.length > 0;
    this._isNotHaveSpace = !/\s+/g.test(inputValue);
  }

  // 라인 이름 중복 검사 만들기 (이미 존재하는 노선인지?, 따로 모듈화해서 외부에서 불러오자)

  getInputResult() {
    if (!this._isMoreThanTwoCharacters)
      return actionResult(false, NAME_LENGTH_ERROR);
    if (!this._isNotHaveSpace) return actionResult(false, SPACE_ERROR);
    // if (!this._isUniqueStationName())
    //   return actionResult(false, SAME_NAME_ERROR);
    return actionResult(true);
  }
}
