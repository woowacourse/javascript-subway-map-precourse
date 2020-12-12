import {
	addLine,
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

const lineContainer = (container) => {
	if (getAllStation().length <= 1) {
		alertAndClear(errorAlertMessages.ALERT_NOT_ENOUGH_STATION);
		return;
	}
	const titleElement = makeElement({
		tag: 'p',
		innerText: words.LINE_NAME,
		style: cssText.marginBottom(0),
	});
	const inputElement = makeElement({
		tag: 'input',
		placeholder: words.LINE_PLACEHOLDER,
		id: words.STATION_NAME_INPUT_ID,
		style: 'display:block;' + cssText.marginBottom(15),
	});
	const startPointElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(0),
	});
	const endPointElement = makeElement({
		tag: 'div',
		style: cssText.marginBottom(15),
	});
	const startPointTextElement = makeElement({
		tag: 'span',
		innerText: words.LINE_START_POINT,
		style: cssText.marginRight(5)
	});
	const startPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name),
		{ classes: [words.LINE_START_STATION_SELECTOR_ID] }
	);
	const endPointTextElement = makeElement({
		tag: 'span',
		innerText: words.LINE_END_POINT,
		style: cssText.marginRight(5)
	});
	const endPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name),
		{ classes: [words.LINE_END_STATION_SELECTOR_ID] }
	);

	const lineAddButtonElement = makeElement({
		tag: 'button',
		innerText: words.LINE_ADD_BUTTON,
		id: words.LINE_ADD_BUTTON_ID,
	});

	const talbeTitleElement = makeElement({
		tag: 'p',
		innerText: words.LINE_TABLE_TITLE,
		style: cssText.DEFAULT_BOLD_TEXT+cssText.marginBottom(15)+cssText.marginTop(15)
	});

	const tableElement = makeTable(words.LINE_TABLE_COLUMNS);

	appendChilds(startPointElement, [
		startPointTextElement,
		startPointSelectBoxElement,
	]);
	appendChilds(endPointElement, [
		endPointTextElement,
		endPointSelectBoxElement,
	]);

	lineAddButtonElement.addEventListener('click', () => {
		const lineName = inputElement.value;
		const lineStartStation =
			startPointSelectBoxElement.options[
				startPointSelectBoxElement.selectedIndex
			].text;
		const lineEndStation =
			endPointSelectBoxElement.options[endPointSelectBoxElement.selectedIndex]
				.text;
		addLine(lineName, lineStartStation, lineEndStation, inputElement);
		clearAllContents(tableElement.querySelector('tbody'));
		tableSynchronizer(tableElement);
	});

	clearAllContents(container);
	appendChilds(container, [
		titleElement,
		inputElement,
		startPointElement,
		endPointElement,
		lineAddButtonElement,
		talbeTitleElement,
		tableElement,
	]);

	tableSynchronizer(tableElement);
};

export default lineContainer;
