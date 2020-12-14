import SectionManagerEvent from "./SectionManagerEvent.js";
import { ERROR_MESSAGE } from "../../utils/constants.js";

export default class SectionManager extends SectionManagerEvent {
  constructor(stateId) {
    super(stateId);
    console.log("--SectionManager--");
  }

  isVaildOrderNumber(order, lineIndex) {
    super.isVaildOrderNumber(order, lineIndex);

    if (
      this.isMaxOrder(order, lineIndex) &&
      this.isMinOrder(order) &&
      this.isEmpty(order)
    ) {
      return true;
    }

    return false;
  }

  isMaxOrder(order, lineIndex) {
    const maxOrder = this.lines[lineIndex].line.length;

    if (maxOrder >= order) {
      return true;
    }

    window.alert(ERROR_MESSAGE.IS_MAX_ORDER(maxOrder));
    return false;
  }

  isMinOrder(order) {
    if (order >= 0) {
      return true;
    }

    window.alert(ERROR_MESSAGE.IS_MIN_ORDER);
    return false;
  }

  isEmpty(order) {
    if (order !== "") {
      return true;
    }

    window.alert(ERROR_MESSAGE.IS_EMPTY);
    return false;
  }

  isMinSectionCount(count) {
    super.isMinSectionCount(count);
    if (count > 2) {
      return false;
    }

    window.alert(ERROR_MESSAGE.IS_MIN_SECTION_COUNT);
    return true;
  }

  isContinuousStationAdd(order, lines, newStation) {
    super.isContinuousStationAdd(order, lines, newStation);
    if (order === 0 && newStation === lines[order]) {
      return true;
    }

    if (order === lines.length && newStation === lines[order - 1]) {
      return true;
    }

    if (lines[order] === newStation || lines[order - 1] === newStation) {
      return true;
    }

    return false;
  }
}
