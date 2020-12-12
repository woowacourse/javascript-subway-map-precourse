import {
	lineAddButtonCallBack,
	tableSynchronizer,
} from '../Controller/lineManager.js';
import { getAllStation } from '../Controller/stationManager.js';
import {
	alertAndClear,
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import words from '../key/words.js';
import { makeSelectBox, makeTable } from './template.js';
import { errorAlertMessages } from '../key/alertMessages.js';
import cssText from '../key/cssText.js';

const LineContainer = function (container) {
	this.titleElement = makeElement({
		tag: 'p',
		innerText: words.LINE_NAME,
		style: cssText.marginBottom(0),
	});
	this.inputElement = makeElement({
		tag: 'input',
		placeholder: words.LINE_PLACEHOLDER,
		id: words.STATION_NAME_INPUT_ID,
		style: 'display:block;' + cssText.marginBottom(15),
	});
	this.startPointElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(0),
	});
	this.endPointElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(15),
	});
	this.startPointTextElement = makeElement({
		tag: 'span',
		innerText: words.LINE_START_POINT,
		style: cssText.marginRight(5),
	});
	this.startPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name),
		{ classes: [words.LINE_START_STATION_SELECTOR_ID] }
	);
	this.endPointTextElement = makeElement({
		tag: 'span',
		innerText: words.LINE_END_POINT,
		style: cssText.marginRight(5),
	});
	this.endPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name),
		{ classes: [words.LINE_END_STATION_SELECTOR_ID] }
	);
	this.lineAddButtonElement = makeElement({
		tag: 'button',
		innerText: words.LINE_ADD_BUTTON,
		id: words.LINE_ADD_BUTTON_ID,
	});
	this.talbeTitleElement = makeElement({
		tag: 'p',
		innerText: words.LINE_TABLE_TITLE,
		style:
			cssText.DEFAULT_BOLD_TEXT +
			cssText.marginBottom(15) +
			cssText.marginTop(15),
	});
	this.tableElement = makeTable(words.LINE_TABLE_COLUMNS);

	this.lineAddButtonElement.addEventListener('click', () =>
		lineAddButtonCallBack(
			this.inputElement,
			this.startPointSelectBoxElement,
			this.endPointSelectBoxElement,
			this.tableElement
		)
	);

	this.getAllElements = () => [
		this.titleElement,
		this.inputElement,
		this.startPointElement,
		this.endPointElement,
		this.lineAddButtonElement,
		this.talbeTitleElement,
		this.tableElement,
	];

	this.initializer = () => {
		clearAllContents(container);
		appendChilds(this.startPointElement, [
			this.startPointTextElement,
			this.startPointSelectBoxElement,
		]);
		appendChilds(this.endPointElement, [
			this.endPointTextElement,
			this.endPointSelectBoxElement,
		]);
		appendChilds(container, this.getAllElements());
		tableSynchronizer(this.tableElement);
	};
};

export default LineContainer;
