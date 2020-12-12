import Validator from './validator.js';
import {
  STATION_FETCH_URL,
  STATION_NAME,
  STATION_NAME_ALERT_INVALID,
  STATION_NAME_ALERT_OVERLAP,
} from '../../library/constant/constant.js';

export default class StationValidator extends Validator {
  constructor(input) {
    super();
    this._input = input;
  }

  checkStationName() {
    if (this.isOverlapped(this._input.value, STATION_NAME)) {
      this.alertStationNameOverlap(this._input);

      return;
    }

    return this.checkValidStation();
  }

  alertStationNameOverlap() {
    this._input.value = '';
    alert(STATION_NAME_ALERT_OVERLAP);
  }

  checkValidStation() {
    const response = this.getStationData();

    return response.then(data => {
      for (const stationInfo of data) {
        if (this._input.value === stationInfo.STATION_NM) {
          return true;
        }
      }
      this.alertStationNameInvalid();

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

  alertStationNameInvalid() {
    this._input.value = '';
    alert(STATION_NAME_ALERT_INVALID);
  }
}
