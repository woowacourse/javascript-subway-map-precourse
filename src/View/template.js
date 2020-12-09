import { appendChilds } from '../Controller/utils.js';
import words from '../key/words.js';

export const makeNameInputArea = (name, placeholder, hasBtn) => {
	const mainArea = document.createElement('div');
	const titleArea = document.createElement('b');
	const inputArea = document.createElement('input');
	const btnArea = document.createElement('button');
	titleArea.innerText = name;
	inputArea.placeholder = placeholder;
	btnArea.innerText = words.ADD_STATION_BTN;
	appendChilds(
		mainArea,
		hasBtn ? [titleArea, inputArea, btnArea] : [titleArea, inputArea]
	);
	return mainArea;
};

export const makeTable = (title, names) => {
    const mainTable = document.createElement('table');
    const talbeTitle = document.createElement("b");
    const tableThead = document.createElement("thead");
    const tableTbody = document.createElement("tbody");
    talbeTitle.innerText = title;
	const columns = names.map((name) => {
		const column = document.createElement('th');
		column.innerText = name;
		return column;
    });
    appendChilds(tableThead, columns);
	appendChilds(mainTable, [talbeTitle, tableThead, tableTbody]);
	return mainTable;
};
