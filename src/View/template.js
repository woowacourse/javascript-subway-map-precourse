import { appendChilds, makeElement } from '../Controller/utils.js';

export const makeTable = (columns) => {
	const tableElement = makeElement({ tag: 'table' });
	const tableHeadElement = makeElement({ tag: 'thead' });
	const tableBodyElement = makeElement({ tag: 'tbody' });
	appendChilds(
		tableHeadElement,
		columns.map((column) => makeElement({ tag: 'th', innerText: column }))
	);
	appendChilds(tableElement, [tableHeadElement, tableBodyElement]);
	return tableElement;
};

export const addTableRow = (tableElement, values = []) => {
	const tableTBodyElement = tableElement.querySelector('tbody');
	const tableRowElement = makeElement({ tag: 'tr' });
	const tableCells = values.map((value, index) => {
		if (index === values.length - 1) {
            const tdElement = makeElement({ tag: 'td' });
            appendChilds(tdElement, [value]);
            return tdElement;
		} else {
			return makeElement({ tag: 'td', innerText: value });
		}
	});
	appendChilds(tableRowElement, tableCells);
	appendChilds(tableTBodyElement, [tableRowElement]);
};

export const makeSelectBox = (list) => {
	const selectBoxElement = makeElement({ tag: 'select' });
	const optionElements = list.map((item) =>
		makeElement({ tag: 'option', value: item, innerText: item })
	);
	appendChilds(selectBoxElement, optionElements);
	return selectBoxElement;
};

export const makeListElem = (title, elements = []) => {
	const ulElement = makeElement({ tag: 'ul', innerText: title });
	const liElements = elements.map((element) =>
		makeElement({ tag: 'li', innerText: element })
	);
	appendChilds(ulElement, liElements);
	return ulElement;
};
