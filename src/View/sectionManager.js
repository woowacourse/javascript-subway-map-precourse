import { getAllStation } from '../Controller/stationManager.js';
import {
	alertAndClear,
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import words from '../key/words.js';
import { makeSelectBox, makeTable } from './template.js';
import {
	insertStation,
	tableSynchronizer,
} from '../Controller/sectionManager.js';
import { getAllLines } from '../Controller/lineManager.js';
import { errorAlertMessages } from '../key/alertMessages.js';
import cssText from '../key/cssText.js';

const lineButtonHandler = (subContainer, lineName) => {
	const allStations = getAllStation();
	const lineHandleTitleElement = makeElement({
		tag: 'p',
		innerText: `${lineName} ${words.SECTION_HANDLE_TEXT}`,
		style: cssText.boldText(1.3, 800),
	});
	const sectionRegisterTextElement = makeElement({
		tag: 'p',
		innerText: words.SECTION_REGISTER_TEXT,
		style: cssText.boldText(1, 800),
	});
	const inputAreaElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(35),
	});
	const stationSelectBox = makeSelectBox(
		allStations.map((station) => station.name),
		{ id: words.SECTION_STATION_SELECTOR_ID, style: cssText.marginRight(5) }
	);
	const inputElement = makeElement({
		tag: 'input',
		id: words.SECTION_ORDER_INPUT_ID,
		placeholder: words.SECTION_PLACEHOLDER,
		type: 'number',
		style: cssText.marginRight(5),
	});
	const sectionAddButtonElement = makeElement({
		tag: 'button',
		innerText: words.SECTION_ADD_BUTTON,
		id: words.SECTION_ADD_BUTTON_ID,
	});
	const tableElement = makeTable(words.SECTION_TABLE_COLUMNS);

	sectionAddButtonElement.addEventListener('click', () => {
		const stationName =
			stationSelectBox.options[stationSelectBox.selectedIndex].text;
		insertStation(lineName, stationName, inputElement);
		clearAllContents(tableElement.querySelector('tbody'));
		tableSynchronizer(tableElement, lineName);
	});

	clearAllContents(subContainer);
	appendChilds(inputAreaElement, [
		stationSelectBox,
		inputElement,
		sectionAddButtonElement,
	]);
	appendChilds(subContainer, [
		lineHandleTitleElement,
		sectionRegisterTextElement,
		inputAreaElement,
		tableElement,
	]);

	tableSynchronizer(tableElement, lineName);
};

const sectionContainer = (container) => {
	if (getAllLines().length < 1) {
		alertAndClear(errorAlertMessages.ALERT_NOT_ENOUGH_LINE);
		return;
	}
	const titleElement = makeElement({
		tag: 'p',
		innerText: words.SECTION_TITLE,
		style: cssText.boldText(1.3, 800) + cssText.marginTop(35),
	});
	const subContainer = makeElement({ tag: 'div' });
	const lineButtonElements = getAllLines().map((line) => {
		const lineButtonElement = makeElement({
			tag: 'button',
			innerText: line.name,
			id: line.name,
			classes: [words.SECTION_LINE_MENU_BUTTON_CLASS],
		});
		lineButtonElement.addEventListener('click', () =>
			lineButtonHandler(subContainer, line.name)
		);
		return lineButtonElement;
	});
	clearAllContents(container);
	appendChilds(container, [titleElement, ...lineButtonElements, subContainer]);
};

export default sectionContainer;
