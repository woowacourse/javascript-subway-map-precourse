import {
	confirmAlertMessage,
	errorAlertMessages,
} from '../key/alertMessages.js';
import words from '../key/words.js';
import Station from '../Model/Station.js';
import { addTableRow } from '../View/template.js';
import { alertAndClear, confirmAlert, makeElement } from './utils.js';

export const addStation = (text, inputElement) => {
	if (Station.isValidStationName(text, inputElement)) {
		Station.addOneStation(new Station(text));
	}
};

export const getAllStation = () => {
	return Station.readAllStations();
};

export const tableSynchronizer = (tableElement) => {
	const allStations = getAllStation();
	allStations.forEach((station) => {
		addTableRow(tableElement, {
			dataName: station.name,
			deleteButton: makeNewStationDeleteButtonElement(),
		});
	});
	applyDeleteEventForAllDeleteButton();
};

export const makeNewStationDeleteButtonElement = () =>
	makeElement({
		tag: 'button',
		innerText: words.STATION_DELETE_BUTTON,
		classes: [words.STATION_DELETE_CLASS],
	});

export const deleteCallbackFunction = (e) => {
	const { target: buttonElement } = e;
	const parentElement = buttonElement.parentNode.parentElement;
	if (confirmAlert(confirmAlertMessage.ALERT_DELETE_CONFIRM)) {
		if (Station.isOnLine(parentElement.getAttribute('data-station-name'))) {
			alertAndClear(errorAlertMessages.ALERT_STATION_REGISTED_ON_LINE);
			return;
		}
		Station.removeOneStation(parentElement.getAttribute('data-station-name'));
		parentElement.remove();
	}
};

export const applyDeleteEventForAllDeleteButton = () => {
	const allDeleteButtons = document.querySelectorAll(
		`.${words.STATION_DELETE_CLASS}`
	);
	allDeleteButtons.forEach((deleteButton) => {
		deleteButton.addEventListener('click', deleteCallbackFunction);
	});
};
