import TableUtils from "./table_utils.js";
import CommonUtils from "./common_utils.js";

export default class Line {
  constructor(lineName) {
    this.lineName = lineName;
    this.stations = [];
    this.setConst();
  }

  setConst() {
    this.DELETE_BUTTON_TEXT = '삭제';
    this.IS_NOT_VALID = false;
    this.IS_VALID = true;

    this.EMPTY_ERROR_MESSAGE = '노선 이름을 한 글자 이상 입력해주세요';
    this.OVERLAP_ERROR_MESSAGE = '이미 존재하는 노선 이름입니다.'
    this.SAME_START_END_ERROR_MESSAGE = '상행 종점역과 하행 종점역이 같습니다.'
  }

  addLine(lineName) {
    if (this.checkLineValidity(lineName) === this.IS_VALID) {
      // const rowArray = TableUtils.createRowArray(lineName)

      // this.addToLineList(this._lineInput.value);
    }
  }

  checkLineValidity(lineName) {
    const commonUtils = new CommonUtils();
    if (this.isEmpty(lineName) === this.IS_NOT_VALID) {
      commonUtils.alertError(this.EMPTY_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    if (this.overlap(lineName) === this.IS_NOT_VALID) {
      commonUtils.alertError(this.OVERLAP_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    if (this.sameStartEnd() === this.IS_NOT_VALID) {
      commonUtils.alertError(this.SAME_START_END_ERROR_MESSAGE);

      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  isEmpty(lineName) {
    if (lineName.length === 0) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  overlap(lineName) {
    const commonUtils = new CommonUtils();
    const lineList = commonUtils.getLocalStorageLine();

    if (!lineList) {
      return this.IS_VALID;
    }
    else if  (lineName in lineList) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  sameStartEnd(lineName) {
    const commonUtils = new CommonUtils();
    const lineList = commonUtils.getLocalStorageLine();
    const lineListLen = lineList[lineName].length;

    if (lineList[lineName][0] === lineList[lineName][lineListLen - 1]) {
      return this.IS_NOT_VALID;
    }

    return this.IS_VALID;
  }

  createRowArray(lineName) {
    return [lineName, this.DELETE_BUTTON_TEXT];
  }
}