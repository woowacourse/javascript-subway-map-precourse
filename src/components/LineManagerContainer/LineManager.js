import LineManagerEvent from "./LineManagerEvent.js";
import isValidValue from "../../utils/isValidValue.js";
import { ERROR_MESSAGE } from "../../utils/constants.js";

export default class LineManager extends LineManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--LineManager--");
  }

  isValidLineInfo(lineInfo) {
    // super.isValidLineInfo(lineInfo);
    if (
      this.isDuplicateLineName(lineInfo.lineName) &&
      isValidValue(lineInfo.lineName) &&
      this.isMinStationCount() &&
      this.isStartEndSame(lineInfo.line[0], lineInfo.line[1])
    ) {
      return true;
    }
    return false;
  }

  isDuplicateLineName(inputLineName) {
    for (const line of this.lines) {
      if (line.lineName === inputLineName) {
        window.alert(ERROR_MESSAGE.IS_DUPLICATE_LINE_NAME);
        return false;
      }
    }
    return true;
  }

  isMinStationCount() {
    if (this.stations.length >= 2) return true;
    window.alert(ERROR_MESSAGE.IS_MIN_STATION_COUNT);
    return false;
  }

  isStartEndSame(start, end) {
    if (start !== end) return true;
    window.alert(ERROR_MESSAGE.IS_START_END_SANME);
    return false;
  }
}
