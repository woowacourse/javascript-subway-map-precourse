import Station from '../Model/Station.js';
import Line from '../Model/Line.js';
import words from '../key/words.js';
import { addTableRow } from '../View/template.js';
import { alertAndClear, confirmAlert, makeElement } from './utils.js';
import {
	confirmAlertMessage,
	errorAlertMessages,
} from '../key/alertMessages.js';

export const getAllLines = () => {
	return Line.readAllLines();
};

export const saveAllLines = (lines) => {
	Line.saveAllLines(lines);
};

export const addLine = (lineName, startStation, endStation, inputElement) => {
    const allLines = Line.readAllLines();
    const newLine = new Line(lineName);
    
	if (!Line.isValidLineName(lineName, inputElement)) {
		return;
	}
	if (startStation === endStation) {
		alertAndClear(
			errorAlertMessages.ALERT_SAME_START_WITH_END_STATION,
			inputElement
		);
		return;
    }

	newLine.stations = [startStation, endStation];
	allLines.push(newLine);
	Line.saveAllLines(allLines);
};

export const makeNewLineDeleteButtonElement = (id) =>
	makeElement({
		tag: 'button',
		innerText: words.LINE_DELETE_BUTTON,
		classes: [words.LINE_DELETE_BUTTON_CLASS],
		id,
	});

export const tableSynchronizer = (tableElement) => {
	const allLines = getAllLines();
	if (allLines.length === 0) return;
	allLines.forEach((line) => {
		addTableRow(tableElement, [
			line.name,
			line.stations[0],
			line.stations[line.stations.length - 1],
			makeNewLineDeleteButtonElement(line.name),
		]);
	});
	applyDeleteEventForAllDeleteButton();
};

export const deleteCallbackFunction = (e) => {
	const { target: buttonElement } = e;
	const { id: lineName } = buttonElement;
	if (confirmAlert(confirmAlertMessage.ALERT_DELETE_CONFIRM)) {
		Line.removeOneLine(lineName);
		buttonElement.parentNode.parentElement.remove();
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
