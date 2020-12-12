import { alertAndClear, confirmAlert, makeElement } from './utils.js';
import words from '../key/words.js';
import { getAllStation } from './stationManager.js';
import { addTableRow } from '../View/template.js';
import { getAllLines, saveAllLines } from './lineManager.js';
import {
	errorAlertMessages,
	confirmAlertMessage,
} from '../key/alertMessages.js';
import Line from '../Model/Line.js';
import Station from '../Model/Station.js';

export const makeNewSectionDeleteButtonElement = () =>
	makeElement({
		tag: 'button',
		innerText: words.SECTION_DELETE_FOR_STATION,
		classes: [words.SECTION_DELETE_BUTTON_CLASS],
	});

export const tableSynchronizer = (tableElement, lineName) => {
	const allLines = getAllLines();
	const targetStations =
        allLines[allLines.map((line) => line.name).indexOf(lineName)].stations;
    tableElement.setAttribute("data-line-name", lineName);
	targetStations.forEach((stationName, index) => {
		addTableRow(tableElement, {
			order: `${index}`,
			dataName: stationName,
			deleteButton: makeNewSectionDeleteButtonElement(),
		});
	});
	applyDeleteEventForAllDeleteButton();
};

export const insertStation = (lineName, stationName, insertElement) => {
	const allLines = getAllLines();
	const allStations = getAllStation();
	const targetLineIndex = allLines.map((line) => line.name).indexOf(lineName);
	const targetStationIndex = allStations
		.map((station) => station.name)
		.indexOf(stationName);
	const insertIndex = parseInt(insertElement.value);
	const lengthOfstationsOnLine = Line.getStationLength(lineName);
	if (insertIndex === '') {
		alertAndClear(errorAlertMessages.ALERT_NOTHING_ORDER_INPUT);
		return;
	}
	if (!(0 <= insertIndex && insertIndex <= lengthOfstationsOnLine)) {
		alertAndClear(
			errorAlertMessages.alertExceedRangeOrdrerInput(lengthOfstationsOnLine)
		);
		return;
	}
	if (Line.hasThisStation(lineName, stationName)) {
		alertAndClear(errorAlertMessages.ALERT_EXISTED_ADDED_STATION);
		return;
	}
	allLines[targetLineIndex].stations.splice(
		parseInt(insertIndex),
		0,
		allStations[targetStationIndex].name
	);
	saveAllLines(allLines);
	insertElement.value = '';
};

export const deleteCallbackFunction = (e) => {
	const { target: buttonElement } = e;
    const parentElement = buttonElement.parentNode.parentElement;
    const tableElement = buttonElement.parentElement.parentElement.parentElement.parentElement;
    const stationName = parentElement.getAttribute('data-station-name');
    const lineName = tableElement.getAttribute("data-line-name")
	if (confirmAlert(confirmAlertMessage.ALERT_DELETE_CONFIRM)) {
		if (Line.getStationLength(lineName) <= 2) {
			alertAndClear(errorAlertMessages.ALERT_UNDER_TWO_STATION_ON_LINE);
			return;
		}
		Line.removeStationOnLine(lineName, stationName);
		parentElement.remove();
		document.querySelectorAll('tbody > tr').forEach((row, rowIndex) => {
			const orderCell = row.childNodes[0];
			orderCell.innerText = rowIndex;
		});
	}
};

export const applyDeleteEventForAllDeleteButton = () => {
	const allDeleteButtons = document.querySelectorAll(
		`.${words.SECTION_DELETE_BUTTON_CLASS}`
	);
	allDeleteButtons.forEach((deleteButton) => {
		deleteButton.addEventListener('click', deleteCallbackFunction);
	});
};
