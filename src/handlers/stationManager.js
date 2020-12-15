import {
  stationNameInputElement,
  resultStationItemsElement,
} from '../elements/stationManager.js';
import SubwayStation from '../classes/subwayStation.js';
import { subwayMap } from '../store/store.js';
import {
  SAME_STATION_NAME_EXIST_MESSAGE,
  SHORT_STATION_NAME_ALERT_MESSAGE,
  STATION_REGISTERED_IN_LINE_MESSAGE,
} from '../constants/configuration.js';
import { getStationItemsTemplate } from '../templates/stationManager.js';

const getAddStationAlertMessage = (stationName) => {
  let alertMessage = '';
  if (subwayMap.checkIsStationNameExist(stationName)) {
    alertMessage += `${SAME_STATION_NAME_EXIST_MESSAGE}\n`;
  }
  if (SubwayStation.checkIsStationNameShort(stationName)) {
    alertMessage += SHORT_STATION_NAME_ALERT_MESSAGE;
  }

  return alertMessage;
};

const getDeleteStationAlertMessage = (stationName) => {
  let alertMessage = '';
  const station = subwayMap.allStations[stationName];
  if (SubwayStation.checkIsStationBelongToLine(station)) {
    alertMessage += STATION_REGISTERED_IN_LINE_MESSAGE;
  }

  return alertMessage;
};

const showResult = () => {
  const registerdStationNames = Object.keys(subwayMap.allStations);
  resultStationItemsElement.innerHTML = getStationItemsTemplate(
    registerdStationNames
  );
};

export const onAddStation = () => {
  const stationName = stationNameInputElement.value;
  const alertMessage = getAddStationAlertMessage(stationName);
  if (alertMessage === '') {
    const station = new SubwayStation();
    subwayMap.addStation(station, stationName);
    showResult();
  } else {
    alert(alertMessage);
  }
};

export const onDeleteStation = (event) => {
  const targetElement = event.target;
  if (targetElement.className !== 'station-delete-button') {
    return;
  }
  const deleteTargetName = targetElement.dataset.deleteTarget;
  const alertMessage = getDeleteStationAlertMessage(deleteTargetName);
  if (alertMessage === '') {
    subwayMap.deleteStationByName(deleteTargetName);
    showResult();
  } else {
    alert(alertMessage);
  }
};

export default {
  onAddStation,
};
