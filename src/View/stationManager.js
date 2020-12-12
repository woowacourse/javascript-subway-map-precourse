import { addTableRow, makeTable } from './template.js';
import words from '../key/words.js';
import {
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import { addStation, tableSynchronizer } from '../Controller/stationManager.js';
import cssText from '../key/cssText.js';

const stationContainer = (container) => {
	const titleElement = makeElement({ tag: 'p', innerText: words.STATION_NAME, style:cssText.marginBottom(0) });
	const inputAreaElement = makeElement({tag:"div", style:cssText.marginBottom(15)})
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
		style: cssText.DEFAULT_BOLD_TEXT+cssText.marginBottom(15)
	});
	const tableElement = makeTable(words.STATION_TABLE_COLUMNS);
	
	appendChilds(inputAreaElement, [inputElement, buttonElement])

	buttonElement.addEventListener('click', () => {
		const inputValue = inputElement.value;
		addStation(inputValue, inputElement);
		inputElement.value='';
		clearAllContents(tableElement.querySelector("tbody"));
		tableSynchronizer(tableElement);
	});

	clearAllContents(container);
	appendChilds(container, [
		titleElement,
		inputAreaElement,
		talbeTitleElement,
		tableElement,
	]);
	tableSynchronizer(tableElement);
};

export default stationContainer;
