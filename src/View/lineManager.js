import { addLine, makeNewLineDeleteButtonElement, tableSynchronizer } from '../Controller/lineManager.js';
import { getAllStation } from '../Controller/stationManager.js';
import {
	alertAndClear,
	appendChilds,
	clearAllContents,
	makeElement,
} from '../Controller/utils.js';
import words from '../key/words.js';
import { addTableRow, makeSelectBox, makeTable } from './template.js';
import Station from '../Model/Station.js';
import { errorAlertMessages } from '../key/alertMessages.js';

const lineContainer = (container) => {
	if(Station.readAllStations().length<=1){
		alertAndClear(errorAlertMessages.ALERT_NOT_ENOUGH_STATION);
		return;
	}
	const titleElement = makeElement({ tag: 'p', innerText: words.LINE_NAME });
	const inputElement = makeElement({
		tag: 'input',
		placeholder: words.LINE_PLACEHOLDER,
		id: words.STATION_NAME_INPUT_ID
	});
	const startPointTextElement = makeElement({
		tag: 'p',
		innerText: words.LINE_START_POINT,
	});
	const startPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name), {classes:[words.LINE_START_STATION_SELECTOR_ID]}
	);
	const endPointTextElement = makeElement({
		tag: 'p',
		innerText: words.LINE_END_POINT,
	});
	const endPointSelectBoxElement = makeSelectBox(
		getAllStation().map((item) => item.name), {classes:[words.LINE_END_STATION_SELECTOR_ID]}
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
		addLine(lineName, lineStartStation, lineEndStation, inputElement);
		clearAllContents(tableElement.querySelector('tbody'));
		tableSynchronizer(tableElement);
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
