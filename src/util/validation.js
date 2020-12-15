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
      alert(ErrorMessage.DUPLICATED_STATION_NAME);

      return;
    }

    return true;
  },

  hasMinimumLength(name) {
    return (
      name.length >= Constant.MINIMUM_LENGTH &&
      !Constant.REGEX_CATCHING_WHITESPACE.test(name)
    );
  },

  isNotDuplicated(name) {
    return !Station.stations.includes(name);
  },

  isValidStatonDeletion(station) {
    let isValid = true;

    Line.lines.forEach(({ stations }) => {
      if (stations.includes(station)) {
        isValid = false;
      }
    });

    return isValid;
  },
};

export const LineValidation = {
  isValidLine(name, start, end) {
    return this.hasValidName(name) && this.hasValidStartEndStations(start, end);
  },

  hasValidName(name) {
    if (!this.isNotWhiteSpace(name)) {
      alert(ErrorMessage.NAME_WHITE_SPACE);

      return;
    }

    if (!this.isNotDuplicated(name)) {
      alert(ErrorMessage.DUPLICATED_LINE_NAME);

      return;
    }

    return true;
  },

  hasValidStartEndStations(start, end) {
    if (this.isSameStartEndStation(start, end)) {
      alert(ErrorMessage.SAME_START_END_STATION);

      return;
    }

    if (this.isDuplicatedStartEndStation(start, end)) {
      alert(ErrorMessage.DUPLICATED_START_END_STATION);

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

  isSameStartEndStation(start, end) {
    return start === end;
  },

  isDuplicatedStartEndStation(start, end) {
    let isValid = false;

    Line.lines.forEach(({ stations }) => {
      if (stations[0] === start) {
        isValid = true;
      }
      if (stations[stations.length - 1] === end) {
        isValid = true;
      }
      if (stations[0] === end && stations[stations.length - 1] === start) {
        isValid = true;
      }
    });

    return isValid;
  }
};

export const SectionValidation = {
  isValidSection(station, order, selectedLine) {
    return (
      this.hasValidName(station, selectedLine) &&
      this.hasValidOrder(order, selectedLine)
    );
  },

  hasValidName(station, selectedLine) {
    if (!this.isNotDuplicated(station, selectedLine)) {
      alert(ErrorMessage.DUPLICATED_STATION_NAME);

      return;
    }

    return true;
  },

  hasValidOrder(order, selectedLine) {
    const stationArray = Line.lines.filter(
      ({ name }) => name === selectedLine
    )[0].stations;

    if (!Constant.REGEX_CATCHING_INTEGER.test(order)) {
      alert(ErrorMessage.NOT_INTEGER_ORDER);

      return;
    }

    if (!this.hasValidNumberRange(order, stationArray)) {
      return;
    }

    return true;
  },

  hasValidNumberRange(order, stationArray) {
    if (order < 1) {
      alert(ErrorMessage.MINIMUM_ORDER);

      return;
    }

    if (order > stationArray.length - 1) {
      alert(`${stationArray.length - 1} 이하의 순서를 입력해 주세요.`);

      return;
    }

    return true;
  },

  isNotDuplicated(station, selectedLine) {
    const stationArray = Line.lines.filter(
      ({ name }) => name === selectedLine
    )[0].stations;

    return !stationArray.includes(station);
  },

  hasMinimumStations(selectedLine) {
    return (
      Line.lines.filter(({ name }) => name === selectedLine)[0].stations
        .length > Constant.MINIMUM_LENGTH
    );
  },
};
