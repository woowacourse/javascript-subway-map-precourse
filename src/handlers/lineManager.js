import {
  lineNameInputElement,
  lineStartStationSelectorElement,
  lineEndStationSelectorElement,
  resultLineItemsElement,
} from '../elements/lineManager.js';
import { subwayMap } from '../store/store.js';
import SubwayLine from '../classes/subwayLine.js';
import {
  SAME_LINE_NAME_EXIST_MESSAGE,
  END_AND_START_STATION_NAME_SAME_MESSAGE,
} from '../constants/configuration.js';
import { getTableRowsTemplate } from '../templates/table.js';
import { getSelectorOptionsTemplate } from '../templates/selector.js';

const getAddLineAlertMessage = ({
  lineName,
  startStationName,
  endStationName,
}) => {
  let alertMessage = '';
  if (subwayMap.checkIsLineNameExist(lineName)) {
    alertMessage += `${SAME_LINE_NAME_EXIST_MESSAGE}\n`;
  }
  if (SubwayLine.checkIsStationsSame(startStationName, endStationName)) {
    alertMessage += END_AND_START_STATION_NAME_SAME_MESSAGE;
  }

  return alertMessage;
};

const showResultTable = () => {
  const lineTableRows = [];
  const allLineNames = Object.keys(subwayMap.allLines);
  allLineNames.forEach((lineName) => {
    const line = subwayMap.allLines[lineName];
    const lineStartStation = line.allStationsInLine[0];
    const lineEndStationIndex = line.allStationsInLine.length - 1;
    const lineEndStation = line.allStationsInLine[lineEndStationIndex];
    const lineTableRow = [lineName, lineStartStation, lineEndStation];
    lineTableRows.push(lineTableRow);
  });

  resultLineItemsElement.innerHTML = getTableRowsTemplate(lineTableRows, 0, 'line-delete-button');
};

export const onConverToLineContent = () => {
  const allStationNames = Object.keys(subwayMap.allStations);
  lineStartStationSelectorElement.innerHTML = getSelectorOptionsTemplate(
    allStationNames
  );
  lineEndStationSelectorElement.innerHTML = getSelectorOptionsTemplate(
    allStationNames
  );
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
    showResultTable();
  } else {
    alert(alertMessage);
  }
};

export const onDeleteLine = (event) => {
  const targetElement = event.target;
  console.log(targetElement);
  if (targetElement.className !== 'line-delete-button') {
    return;
  }
  const deleteTargetName = targetElement.dataset.deleteTarget;
  subwayMap.deleteLineByName(deleteTargetName);
  showResultTable();
};

export default {
  onAddLine,
  onConverToLineContent,
  onDeleteLine,
};
