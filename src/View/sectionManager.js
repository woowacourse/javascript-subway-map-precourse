import { getAllStation } from '../Controller/stationManager.js';
import { appendChilds, clearAllContents, makeElement } from '../Controller/utils.js';
import words from '../key/words.js';
import { addTableRow, makeSelectBox, makeTable } from './template.js';
import {
	insertStation,
	makeNewSectionDeleteButtonElement,
	tableSynchronizer,
} from '../Controller/sectionManager.js';
import { getAllLines } from '../Controller/lineManager.js';

const lineButtonHandler = (subContainer, lineName) => {
	const allStations = getAllStation();
	const lineHandleTitleElement = makeElement({
		tag: 'p',
		innerText: `${lineName} ${words.SECTION_HANDLE_TEXT}`,
	});
	const sectionRegisterTextElement = makeElement({
		tag: 'p',
		innerText: words.SECTION_REGISTER_TEXT,
	});
	const stationSelectBox = makeSelectBox(
		allStations.map((station) => station.name),
		{ id: words.SECTION_STATION_SELECTOR_ID }
	);
	const inputElement = makeElement({
		tag: 'input',
		id: words.SECTION_ORDER_INPUT_ID,
		placeholder: words.SECTION_PLACEHOLDER,
		type: 'number',
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
		clearAllContents(tableElement.querySelector("tbody"));
		tableSynchronizer(tableElement, lineName);
	});

	clearAllContents(subContainer);
	
	appendChilds(subContainer, [
		lineHandleTitleElement,
		sectionRegisterTextElement,
		stationSelectBox,
		inputElement,
		sectionAddButtonElement,
		tableElement,
	]);
	
	tableSynchronizer(tableElement, lineName);
};

const sectionContainer = (container) => {
	const titleElement = makeElement({
		tag: 'p',
		innerText: words.SECTION_TITLE,
	});
	const subContainer = makeElement({tag:"div"})
	const lineButtonElements = getAllLines().map((line) => {
		const lineButtonElement = makeElement({
			tag: 'button',
			innerText: line.name,
			id: line.name,
			classes: [words.SECTION_LINE_MENU_BUTTON_CLASS],
		});
		lineButtonElement.addEventListener('click', () =>
			lineButtonHandler(subContainer,line.name)
		);
		return lineButtonElement;
	});
	clearAllContents(container);
	appendChilds(container, [titleElement, ...lineButtonElements, subContainer]);
};

export default sectionContainer;
