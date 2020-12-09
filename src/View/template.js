import { appendChilds } from '../Controller/utils.js';
import words from '../key/words.js';

export const makeBtn = (innerText, className = '') => {
	const btn = document.createElement('button');
	if (className.length > 0) btn.className = className;
	if (innerText.length > 0) btn.innerText = innerText;
	return btn;
};

export const makeText = (tag, innerText) => {
	const text = document.createElement(tag);
	text.innerText = innerText;
	return text;
};

export const makeNameInputArea = (name, placeholder, hasBtn = false) => {
	const mainArea = document.createElement('div');
	const titleArea = makeText('p', name);
	const inputArea = document.createElement('input');
	const btnArea = makeBtn(words.STATION_ADD_BTN);
	inputArea.placeholder = placeholder;
	appendChilds(
		mainArea,
		hasBtn ? [titleArea, inputArea, btnArea] : [titleArea, inputArea]
	);
	return mainArea;
};

export const makeTable = (columns) => {
	const mainTable = document.createElement('table');
	const tableThead = document.createElement('thead');
	const tableTbody = document.createElement('tbody');
	columns = columns.map((name) => {
		const column = document.createElement('th');
		column.innerText = name;
		return column;
	});
	appendChilds(tableThead, columns);
	appendChilds(mainTable, [tableThead, tableTbody]);
	return mainTable;
};

export const makeSelectBox = (list) => {
	const selectBox = document.createElement('select');
	const options = list.map((item) => {
		const option = document.createElement('option');
		option.value = item;
		option.innerText = item;
		return option;
	});
	appendChilds(selectBox, options);
	return selectBox;
};
