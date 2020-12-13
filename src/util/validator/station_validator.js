import Validator from './validator.js';
import {
  STATION_FETCH_URL,
  STATION,
  STATION_ALERT_INVALID,
  STATION_ALERT_OVERLAP,
  STATION_ALERT_HAS_LINE,
  LINES_LS,
} from '../../library/constant/constant.js';

export default class StationValidator extends Validator {
  constructor() {
    super();
  }

  checkValidInput(input) {
    if (this.isOverlapped(input.value, STATION)) {
      this.alertStationOverlap(input);

      return;
    }

    return this.checkValidStation(input);
  }

  alertStationOverlap(input) {
    input.value = '';
    alert(STATION_ALERT_OVERLAP);
  }

  checkValidStation(input) {
    const response = this.getStationData();

    return response.then(data => {
      for (const stationInfo of data) {
        if (input.value === stationInfo.STATION_NM) {
          return true;
        }
      }
      this.alertStationInvalid(input);

      return false;
    });
  }

  getStationData() {
    return fetch(STATION_FETCH_URL)
      .then(response => response.json())
      .then(data => {
        const {
          SearchSTNBySubwayLineInfo: { row },
        } = data;

        return row;
      });
  }

  alertStationInvalid(input) {
    input.value = '';
    alert(STATION_ALERT_INVALID);
  }

  canDelete(target) {
    const includedLines = this.getIncludedLines(target);

    if (includedLines.length > 0) {
      this.alertStationHasLine(includedLines);

      return false;
    }

    return true;
  }

  getIncludedLines(station) {
    const loadedLines = localStorage.getItem(LINES_LS);
    const lines = loadedLines ? JSON.parse(loadedLines) : [];
    const included = [];

    for (const lineInfo of lines) {
      const line = lineInfo ? Object.keys(lineInfo)[0] : '';
      const section = lineInfo ? Object.values(lineInfo)[0] : [];

      section.includes(station) && included.push(line);
    }

    return included;
  }

  alertStationHasLine(lines) {
    alert(`${STATION_ALERT_HAS_LINE} ${lines.join(', ')}`);
  }
}
