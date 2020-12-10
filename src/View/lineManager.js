import { addLine, makeNewLineDeleteButtonElement, tableSynchronizer } from '../Controller/lineManager.js';
import { getAllStation } from '../Controller/stationManager.js';
import {
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import words from '../key/words.js';
import { addTableRow, makeSelectBox, makeTable } from './template.js';

const lineContainer = (container) => {
	const titleElement = makeElement({ tag: 'p', innerText: words.LINE_NAME });
	const inputElement = makeElement({
		tag: 'input',
		placeholder: words.LINE_PLACEHOLDER,
	});
	const startPointTextElement = makeElement({
		tag: 'p',
		innerText: words.LINE_START_POINT,
	});
	const startPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name)
	);
	const endPointTextElement = makeElement({
		tag: 'p',
		innerText: words.LINE_END_POINT,
	});
	const endPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name)
	);

	const lineAddButtonElement = makeElement({
		tag: 'button',
		innerText: words.LINE_ADD_BUTTON,
		id: words.LINE_ADD_BUTTON_ID,
	});

	const tableElement = makeTable(words.LINE_TABLE_COLUMNS);

	lineAddButtonElement.addEventListener('click', () => {
		const lineName = inputElement.value;
		const lineStartStation =
			startPointSelectBoxElement.options[
				startPointSelectBoxElement.selectedIndex
			].text;
		const lineEndStation =
			endPointSelectBoxElement.options[endPointSelectBoxElement.selectedIndex]
				.text;
		addLine(lineName, lineStartStation, lineEndStation);
		addTableRow(tableElement, [
			lineName,
			lineStartStation,
			lineEndStation,
			makeNewLineDeleteButtonElement(lineName),
		]);
	});

	clearAllContents(container);
	appendChilds(container, [
		titleElement,
		inputElement,
		startPointTextElement,
		startPointSelectBoxElement,
		endPointTextElement,
		endPointSelectBoxElement,
		lineAddButtonElement,
		tableElement,
	]);

	tableSynchronizer(tableElement);
};

export default lineContainer;
