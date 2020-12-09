import { appendChilds } from '../Controller/utils.js';
import words from '../key/words.js';

export const makeBtn = (innerText,className="") => {
    const btn = document.createElement("button");
    if(className.length > 0) btn.className = className;
    if(innerText.length > 0) btn.innerText = innerText;
    return btn;
}

export const makeText = (innerText) => {
    const text = document.createElement("p");
    text.innerText = innerText;
    return text;
}

export const makeNameInputArea = (name, placeholder, hasBtn = false) => {
	const mainArea = document.createElement('div');
	const titleArea = makeText(name);
	const inputArea = document.createElement('input');
	const btnArea = makeBtn(words.STATION_ADD_BTN);
	inputArea.placeholder = placeholder;
	appendChilds(
		mainArea,
		hasBtn ? [titleArea, inputArea, btnArea] : [titleArea, inputArea]
	);
	return mainArea;
};

export const makeTable = (title, names) => {
	const mainTable = document.createElement('table');
	const talbeTitle = makeText(title);
	const tableThead = document.createElement('thead');
	const tableTbody = document.createElement('tbody');
	const columns = names.map((name) => {
		const column = document.createElement('th');
		column.innerText = name;
		return column;
	});
	appendChilds(tableThead, columns);
	appendChilds(mainTable, [talbeTitle, tableThead, tableTbody]);
	return mainTable;
};

export const makeSelectBox = (list) => {
	const selectBox = document.createElement('select');
	list.forEach((item) => {
		const option = document.createElement('option');
		option.value = item;
		option.innerText = item;
    });
    return selectBox;
};
