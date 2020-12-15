import { stationNameInputElement } from '../elements/stationManager.js';
import SubwayStation from '../classes/subwayStation.js';
import { stationMap } from '../store/store.js';
import {
  SAME_STATION_NAME_EXIST_MESSAGE,
  SHORT_STATION_NAME_ALERT_MESSAGE,
} from '../constants/configuration.js';

const getAlertMessage = (stationName) => {
  let alertMessage = '';
  if (stationMap.checkIsDuplicatedStationName(stationName)) {
    alertMessage += `${SAME_STATION_NAME_EXIST_MESSAGE}\n`;
  }
  if (SubwayStation.checkIsStationNameShort(stationName)) {
    alertMessage += SHORT_STATION_NAME_ALERT_MESSAGE;
  }

  return alertMessage;
};

export const onAddStation = () => {
  const stationName = stationNameInputElement.value;
  const alertMessage = getAlertMessage(stationName);
  if (alertMessage === '') {
    const station = new SubwayStation();
    stationMap.addStation(station, stationName);
  } else {
    alert(alertMessage);
  }
};

export default {
  onAddStation,
};
