import { Line } from "../model/line.js";
import { Station } from "../model/station.js";
import { Constant, ErrorMessage } from "./constant.js";

export const StationValidation = {
  isValidStation(name) {
    return this.hasValidName(name);
  },

  hasValidName(name) {
    if (!this.hasMinimumLength(name)) {
      alert(ErrorMessage.MINIMUM_NAME_LENGTH);

      return;
    }

    if (!this.isNotDuplicated(name)) {
      alert(ErrorMessage.DUPLICATED_NAME);

      return;
    }

    return true;
  },

  hasMinimumLength(name) {
    return (
      name.length >= Constant.MINIMUM_NAME_LENGTH &&
      !Constant.REGEX_CATCHING_WHITESPACE.test(name)
    );
  },

  isNotDuplicated(name) {
    return !Station.stations.includes(name);
  },
};

export const LineValidation = {
  isValidLine(name, start, end) {
    return this.hasValidName(name) && this.hasValidStartEndStation(start, end);
  },

  hasValidName(name) {
    if (!this.isNotWhiteSpace(name)) {
      alert(ErrorMessage.NAME_WHITE_SPACE);

      return;
    }

    if (!this.isNotDuplicated(name)) {
      alert(ErrorMessage.DUPLICATED_NAME);

      return;
    }

    return true;
  },

  hasValidStartEndStation(start, end) {
    if (start === end) {
      alert(ErrorMessage.SAME_START_END_STATION);

      return;
    }

    return true;
  },

  isNotWhiteSpace(name) {
    return !Constant.REGEX_CATCHING_WHITESPACE.test(name);
  },

  isNotDuplicated(name) {
    const stationNameArray = Line.lines.map(({ name }) => name);

    return !stationNameArray.includes(name);
  },
};
