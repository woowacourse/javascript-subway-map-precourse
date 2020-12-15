import {
  LINE,
  LINE_NAMES,
  LINE_ALERT_OVERLAP,
  LINE_ALERT_INVALID,
  OPTION_ALERT_INVALID,
} from '../../library/constant/constant.js';
import Validator from './validator.js';

export default class LineValidator extends Validator {
  constructor() {
    super();
  }

  checkValidInput(input) {
    if (this.isOverlapped(input.value, LINE)) {
      this.alertLineOverlap(input);

      return false;
    }
    if (!this.isValidLine(input)) {
      this.alertLineInvalid(input);

      return false;
    }

    return true;
  }

  alertLineOverlap(input) {
    input.value = '';
    alert(LINE_ALERT_OVERLAP);
  }

  isValidLine(input) {
    for (const lineName of LINE_NAMES) {
      if (lineName === input.value) {
        return true;
      }
    }

    return false;
  }

  alertLineInvalid(input) {
    input.value = '';
    alert(LINE_ALERT_INVALID);
  }

  checkValidOptions(lineInfos, lineStart, lineEnd) {
    if (
      this.isSameLines(lineStart, lineEnd) ||
      !this.isValidOptions(lineInfos, lineStart, lineEnd)
    ) {
      this.alertOptionsInvalid();

      return false;
    }

    return true;
  }

  isSameLines(lineStart, lineEnd) {
    return lineStart.value === lineEnd.value;
  }

  isValidOptions(lineInfos, lineStart, lineEnd) {
    const lastStations = this.getLastStations(lineInfos);

    for (const station of lastStations) {
      if (lineStart.value === station || lineEnd.value === station) {
        return false;
      }
    }

    return true;
  }

  getLastStations(lineInfos) {
    const stations = [];

    for (const lineInfo of lineInfos) {
      if (!lineInfo) {
        continue;
      }
      const sections = Object.values(lineInfo)[0];

      stations.push(sections[0], sections[sections.length - 1]);
    }

    return stations;
  }

  alertOptionsInvalid() {
    alert(OPTION_ALERT_INVALID);
  }
}

export const lineValidator = new LineValidator();
