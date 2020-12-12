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

const sectionAddButtonHandler = (
	stationSelectBox,
	lineName,
	inputElement,
	tableElement
) => {
	const stationName =
		stationSelectBox.options[stationSelectBox.selectedIndex].text;
	insertStation(lineName, stationName, inputElement);
	clearAllContents(tableElement.querySelector('tbody'));
	tableSynchronizer(tableElement, lineName);
};

const SubSectionContainer = function (subContainer, lineName) {
	this.allStations = getAllStation();
	this.lineHandleTitleElement = makeElement({
		tag: 'p',
		innerText: `${lineName} ${words.SECTION_HANDLE_TEXT}`,
		style: cssText.boldText(1.3, 800),
	});
	this.sectionRegisterTextElement = makeElement({
		tag: 'p',
		innerText: words.SECTION_REGISTER_TEXT,
		style: cssText.boldText(1, 800),
	});
	this.inputAreaElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(35),
	});
	this.stationSelectBox = makeSelectBox(
		this.allStations.map((station) => station.name),
		{ id: words.SECTION_STATION_SELECTOR_ID, style: cssText.marginRight(5) }
	);
	this.inputElement = makeElement({
		tag: 'input',
		id: words.SECTION_ORDER_INPUT_ID,
		placeholder: words.SECTION_PLACEHOLDER,
		type: 'number',
		style: cssText.marginRight(5),
	});
	this.sectionAddButtonElement = makeElement({
		tag: 'button',
		innerText: words.SECTION_ADD_BUTTON,
		id: words.SECTION_ADD_BUTTON_ID,
	});
	this.tableElement = makeTable(words.SECTION_TABLE_COLUMNS);

	this.sectionAddButtonElement.addEventListener('click', () =>
		sectionAddButtonHandler(
			this.stationSelectBox,
			lineName,
			this.inputElement,
			this.tableElement
		)
	);

	this.initializer = () => {
		clearAllContents(subContainer);
		appendChilds(this.inputAreaElement, [
			this.stationSelectBox,
			this.inputElement,
			this.sectionAddButtonElement,
		]);
		appendChilds(subContainer, [
			this.lineHandleTitleElement,
			this.sectionRegisterTextElement,
			this.inputAreaElement,
			this.tableElement,
		]);

		tableSynchronizer(this.tableElement, lineName);
	};
};

const SectionContainer = function (container) {
	this.titleElement = makeElement({
		tag: 'p',
		innerText: words.SECTION_TITLE,
		style: cssText.boldText(1.3, 800) + cssText.marginTop(35),
	});
	this.subContainer = makeElement({ tag: 'div' });
	this.lineButtonElements = getAllLines().map((line) => {
		const lineButtonElement = makeElement({
			tag: 'button',
			innerText: line.name,
			id: line.name,
			classes: [words.SECTION_LINE_MENU_BUTTON_CLASS],
			style: cssText.marginRight(5)
		});
		lineButtonElement.addEventListener('click', () =>
			new SubSectionContainer(this.subContainer, line.name).initializer()
		);
		return lineButtonElement;
	});

	this.initializer = () => {
		clearAllContents(container);
		appendChilds(container, [
			this.titleElement,
			...this.lineButtonElements,
			this.subContainer,
		]);
	};
};

export default SectionContainer;
