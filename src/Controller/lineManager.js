import Line from '../Model/Line.js';
import words from '../key/words.js';
import { addTableRow } from '../View/template.js';
import { alertAndClear, confirmAlert, makeElement } from './utils.js';
import {
	confirmAlertMessage,
	errorAlertMessages,
} from '../key/alertMessages.js';
import Station from '../Model/Station.js';

export const getAllLines = () => {
	return Line.readAllLines();
};

export const saveAllLines = (lines) => {
	Line.saveAllLines(lines);
};

export const addLine = (lineName, startStation, endStation, inputElement) => {
	const allLines = Line.readAllLines();
	const newLine = new Line(lineName);
	if (!Line.isValidLineName(lineName, inputElement)) return;
	if (startStation === endStation) {
		alertAndClear(errorAlertMessages.ALERT_SAME_START_WITH_END_STATION, inputElement);
		return;
	}
	newLine.stations = [startStation, endStation];
	allLines.push(newLine);
	Line.saveAllLines(allLines);
};

export const makeNewLineDeleteButtonElement = () =>
	makeElement({
		tag: 'button',
		innerText: words.LINE_DELETE_BUTTON,
		classes: [words.LINE_DELETE_BUTTON_CLASS],
	});

export const tableSynchronizer = (tableElement) => {
	const allLines = getAllLines();
	if (allLines.length === 0) return;
	allLines.forEach((line) => {
		addTableRow(tableElement, {
			dataName: line.name,
			startPointName: line.stations[0],
			endPointName: line.stations[line.stations.length - 1],
			deleteButton: makeNewLineDeleteButtonElement(),
		});
	});
	applyDeleteEventForAllDeleteButton();
};

export const deleteCallbackFunction = (e) => {
	const { target: buttonElement } = e;
	const parentElement = buttonElement.parentNode.parentElement;
	if (confirmAlert(confirmAlertMessage.ALERT_DELETE_CONFIRM)) {
		Line.removeOneLine(parentElement.getAttribute('data-station-name'));
		parentElement.remove();
	}
};

export const applyDeleteEventForAllDeleteButton = () => {
	const allDeleteButtons = document.querySelectorAll(
		`.${words.LINE_DELETE_BUTTON_CLASS}`
	);
	allDeleteButtons.forEach((deleteButton) => {
		deleteButton.addEventListener('click', deleteCallbackFunction);
	});
};

export const canAccessLinePage = () => {
    if (Station.readAllStations().length <= 1) {
		alertAndClear(errorAlertMessages.ALERT_NOT_ENOUGH_STATION);
		return false;
    }
    return true;
}