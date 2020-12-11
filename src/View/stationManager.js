import { addTableRow, makeTable } from './template.js';
import words from '../key/words.js';
import {
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import { addStation, makeNewStationDeleteButtonElement, tableSynchronizer } from '../Controller/stationManager.js';

const stationContainer = (container) => {
	const titleElement = makeElement({ tag: 'p', innerText: words.STATION_NAME });
	const inputElement = makeElement({
		tag: 'input',
		id: words.STATION_ADD_BUTTON_ID,
		placeholder: words.STATION_NAME_PLACEHOLDER,
	});
	const buttonElement = makeElement({
		tag: 'button',
		innerText: words.STATION_ADD_BUTTON,
		id: words.STATION_ADD_BUTTON_ID,
	});
	const talbeTitleElement = makeElement({
		tag: 'p',
		innerText: words.STATION_TABLE_TITLE,
	});
	const tableElement = makeTable(words.STATION_TABLE_COLUMNS);

	buttonElement.addEventListener('click', () => {
		const inputValue = inputElement.value;
		addStation(inputValue, inputElement);
		clearAllContents(tableElement.querySelector("tbody"));
		tableSynchronizer(tableElement);
		// addTableRow(tableElement, [inputValue, makeNewStationDeleteButtonElement(inputValue)]);
	});

	clearAllContents(container);
	appendChilds(container, [
		titleElement,
		inputElement,
		buttonElement,
		talbeTitleElement,
		tableElement,
	]);
	tableSynchronizer(tableElement);
};

export default stationContainer;
