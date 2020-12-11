import { STATION_NAME_ALERT_MESSAGE } from '../../library/constant/constant.js';

export default class ErrorHandler {
  handleStationNameError(input) {
    input.value = '';
    alert(STATION_NAME_ALERT_MESSAGE);
  }
}
