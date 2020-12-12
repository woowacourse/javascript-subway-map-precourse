import { confirmAlertMessage } from '../key/alertMessages.js';
import words from '../key/words.js';
import Station from '../Model/Station.js';
import { addTableRow } from '../View/template.js';
import { confirmAlert, makeElement } from './utils.js';

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
		addTableRow(tableElement, [
			station.name,
			makeNewStationDeleteButtonElement(station.name),
		]);
    });
    applyDeleteEventForAllDeleteButton();
};

export const makeNewStationDeleteButtonElement = (id) =>
	makeElement({
		tag: 'button',
		innerText: words.STATION_DELETE_BUTTON,
		classes: [words.STATION_DELETE_CLASS],
		id,
	});

export const deleteCallbackFunction = (e) => {
    const {target:buttonElement} = e;
    const {id:stationName} = buttonElement;
    if(confirmAlert(confirmAlertMessage.ALERT_DELETE_CONFIRM)){
        Station.removeOneStation(stationName);
        buttonElement.parentNode.parentElement.remove();
    }
}

export const applyDeleteEventForAllDeleteButton = () => {
    const allDeleteButtons = document.querySelectorAll(`.${words.STATION_DELETE_CLASS}`);
    allDeleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", deleteCallbackFunction)
    });
}