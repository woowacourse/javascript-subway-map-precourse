import {
  sectionLineMenuButtonListElement,
  sectionStationSelectorElement,
  sectionLineNameElement,
  stationRegisterWrapperElement,
  registeredStationItemTableElement,
  registeredStationItemsElement,
  sectionOrderInputElement,
} from '../elements/sectionManager.js';
import { subwayMap } from '../store/store.js';
import {
  SAME_STATION_REGISTER_TRY_MESSAGE,
  LESS_THAN_DELETE_LENGTH_LIMIT_MESSAGE,
  INDEX_IS_NOT_NUMBER_MESSAGE,
} from '../constants/configuration.js';
import { getTableRowsTemplate } from '../templates/table.js';
import { getSelectorOptionsTemplate } from '../templates/selector.js';
import { getSectionLineMenuButtonsTemplate } from '../templates/button.js';
import SubwayLine from '../classes/subwayLine.js';

const getInsertStationAlertMessage = ({ line, stationName, index }) => {
  let alertMessage = '';
  if (line.checkIsStationNameExistInLine(stationName)) {
    alertMessage += `${SAME_STATION_REGISTER_TRY_MESSAGE}\n`;
  }
  if (SubwayLine.checkIsIndexNumberCorrect(index) === false) {
    alertMessage += INDEX_IS_NOT_NUMBER_MESSAGE;
  }

  return alertMessage;
};

const getPullOutStationAlertMessage = (line) => {
  let alertMessage = '';
  if (line.checkIsAllStationsInLineLengthSameAsLimit()) {
    alertMessage += LESS_THAN_DELETE_LENGTH_LIMIT_MESSAGE;
  }

  return alertMessage;
};

export const showSectionManagerResultTable = () => {
  const lineName = sectionLineNameElement.innerText;
  const line = subwayMap.allLines[lineName];
  if (line) {
    const stationInLineRows = [];
    line.allStationsInLine.forEach((stationName, index) => {
      stationInLineRows.push([index, stationName]);
    });
    registeredStationItemsElement.innerHTML = getTableRowsTemplate({
      rows: stationInLineRows,
      deleteTargetCellIndex: 0,
      deleteButtonClass: 'section-delete-button',
      deleteButtonText: '노선에서 제거',
    });
  }
};

export const onClickSectionLineButton = (event) => {
  const targetElement = event.target;
  if (targetElement.className === 'section-line-menu-button') {
    const lineName = targetElement.innerText;
    sectionLineNameElement.innerText = lineName;
    stationRegisterWrapperElement.setAttribute('style', 'display: block;');
    registeredStationItemTableElement.setAttribute('style', 'display: block;');
    showSectionManagerResultTable();
  }
};

export const onConverToSectionContent = () => {
  const allLineNames = Object.keys(subwayMap.allLines);
  const allStationNames = Object.keys(subwayMap.allStations);
  sectionLineMenuButtonListElement.innerHTML = getSectionLineMenuButtonsTemplate(
    allLineNames
  );
  sectionStationSelectorElement.innerHTML = getSelectorOptionsTemplate(
    allStationNames
  );
};

export const onInsertStation = () => {
  const lineName = sectionLineNameElement.innerText;
  const stationName = sectionStationSelectorElement.value;
  const index = Number(sectionOrderInputElement.value);
  const line = subwayMap.allLines[lineName];
  const alertMessage = getInsertStationAlertMessage({
    line,
    stationName,
    index,
  });
  if (alertMessage === '') {
    const insertingStation = subwayMap.allStations[stationName];
    insertingStation.addBeloningLineByLineName(lineName);
    line.insertStationToLineByNameAndIndex({ stationName, index });
    showSectionManagerResultTable(line.allStationsInLine);
  } else {
    alert(alertMessage);
  }
};

export const onPullOutStation = (event) => {
  const targetElement = event.target;
  if (targetElement.className !== 'section-delete-button') {
    return;
  }
  const lineName = sectionLineNameElement.innerText;
  const targetIndex = targetElement.dataset.deleteTarget;
  const line = subwayMap.allLines[lineName];
  const alertMessage = getPullOutStationAlertMessage(line);
  if (alertMessage === '') {
    const pulledOutStationName = line.pullOutStationFromLineByIndex(
      targetIndex
    );
    const pulledOutStation = subwayMap.allStations[pulledOutStationName];
    pulledOutStation.deleteBeloningLineByLineName(lineName);
    showSectionManagerResultTable(line.allStationsInLine);
  } else {
    alert(alertMessage);
  }
};

export default {
  onInsertStation,
  onConverToSectionContent,
  onClickSectionLineButton,
  showSectionManagerResultTable,
};
