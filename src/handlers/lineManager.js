import {
  lineNameInputElement,
  lineStartStationSelectorElement,
  lineEndStationSelectorElement,
} from '../elements/lineManager.js';
import { subwayMap } from '../store/store.js';
import SubwayLine from '../classes/subwayLine.js';
import {
  SAME_LINE_NAME_EXIST_MESSAGE,
  END_AND_START_STATION_NAME_SAME_MESSAGE,
} from '../constants/configuration.js';

const getAddLineAlertMessage = ({
  lineName,
  startStationName,
  endStationName,
}) => {
  let alertMessage = '';
  if (subwayMap.checkIsLineNameExist(lineName)) {
    alertMessage += `${SAME_LINE_NAME_EXIST_MESSAGE}\n`;
  }
  if (startStationName === endStationName) {
    alertMessage += END_AND_START_STATION_NAME_SAME_MESSAGE;
  }

  return alertMessage;
};

export const onAddLine = () => {
  const lineName = lineNameInputElement.value;
  const startStationName = lineStartStationSelectorElement.value;
  const endStationName = lineEndStationSelectorElement.value;
  const line = new SubwayLine({ startStationName, endStationName });
  const alertMessage = getAddLineAlertMessage({
    lineName,
    startStationName,
    endStationName,
  });
  if (alertMessage === '') {
    subwayMap.addLine(line, lineName);
  } else {
    alert(alertMessage);
  }
};

export default {
  onAddLine,
};
