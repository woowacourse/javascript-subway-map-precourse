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

      return;
    }

    return this.isValidLine(input);
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
    this.alertLineInvalid(input);

    return false;
  }

  alertLineInvalid(input) {
    input.value = '';
    alert(LINE_ALERT_INVALID);
  }

  checkValidOptions(lines, lineStart, lineEnd) {
    if (
      this.isSameLines(lineStart, lineEnd) ||
      !this.isValidOptions(lines, lineStart, lineEnd)
    ) {
      this.alertOptionsInvalid();

      return false;
    }

    return true;
  }

  isSameLines(lineStart, lineEnd) {
    if (lineStart.value === lineEnd.value) {
      return true;
    }

    return false;
  }

  isValidOptions(lines, lineStart, lineEnd) {
    const lastStations = this.getLastStations(lines);

    for (const station of lastStations) {
      if (lineStart.value === station || lineEnd.value === station) {
        return false;
      }
    }

    return true;
  }

  getLastStations(lines) {
    const stations = [];

    for (const line of lines) {
      if (!line) {
        continue;
      }
      const section = Object.values(line)[0];

      stations.push(section[0], section[section.length - 1]);
    }

    return stations;
  }

  alertOptionsInvalid() {
    alert(OPTION_ALERT_INVALID);
  }
}
