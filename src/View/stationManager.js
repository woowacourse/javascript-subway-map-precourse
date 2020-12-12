import { makeTable } from './template.js';
import words from '../key/words.js';
import {
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import { addStation, tableSynchronizer } from '../Controller/stationManager.js';
import cssText from '../key/cssText.js';

const StationContainer = function (container) {
	this.titleElement = makeElement({
		tag: 'p',
		innerText: words.STATION_NAME,
		style: cssText.marginBottom(0),
	});
	this.inputAreaElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(15),
	});
	this.inputElement = makeElement({
		tag: 'input',
		id: words.STATION_ADD_BUTTON_ID,
		placeholder: words.STATION_NAME_PLACEHOLDER,
	});
	this.buttonElement = makeElement({
		tag: 'button',
		innerText: words.STATION_ADD_BUTTON,
		id: words.STATION_ADD_BUTTON_ID,
	});
	this.talbeTitleElement = makeElement({
		tag: 'p',
		innerText: words.STATION_TABLE_TITLE,
		style: cssText.DEFAULT_BOLD_TEXT + cssText.marginBottom(15),
	});
	this.tableElement = makeTable(words.STATION_TABLE_COLUMNS);

	this.buttonElement.addEventListener('click', () => {
		const inputValue = this.inputElement.value;
		addStation(inputValue, this.inputElement);
		this.inputElement.value = '';
		clearAllContents(this.tableElement.querySelector('tbody'));
		tableSynchronizer(this.tableElement);
	});

	this.getAllElements = () => [
		this.titleElement,
		this.inputAreaElement,
		this.talbeTitleElement,
		this.tableElement,
	];

	this.initializer = () => {
		clearAllContents(container);
		appendChilds(this.inputAreaElement, [
			this.inputElement,
			this.buttonElement,
		]);
		appendChilds(container, this.getAllElements());
		tableSynchronizer(this.tableElement);
	};
};

export default StationContainer;
