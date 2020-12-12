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

  checkStationName(input) {
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
    if (this.hasLine(target)) {
      this.alertStationHasLine();

      return false;
    }

    return true;
  }

  hasLine(station) {
    const loadedLines = localStorage.getItem(LINES_LS);
    const lines = loadedLines ? JSON.parse(loadedLines) : [];

    for (const line of lines) {
      const section = Object.values(line)[0];

      if (section.indexOf(station) != -1) {
        return true;
      }
    }

    return false;
  }

  alertStationHasLine() {
    alert(STATION_ALERT_HAS_LINE);
  }
}
