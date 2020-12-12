import { appendChilds, makeElement } from '../Controller/utils.js';

const getTdElements = (values) =>
    values.map((value, index) => {
        if (index === values.length - 1) {
            const tdElement = makeElement({ tag: 'td' });
            appendChilds(tdElement, [value]);
            return tdElement;
        } else {
            return makeElement({ tag: 'td', innerText: value });
        }
    });

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

export const addTableRow = (
	tableElement,
	{ order, dataName, startPointName, endPointName, deleteButton }
) => {
	const tableTBodyElement = tableElement.querySelector('tbody');
	const tableRowElement = makeElement({ tag: 'tr', dataName });
	const values = [order,dataName,startPointName,endPointName,deleteButton].filter((value) => value);
	const tableCells = getTdElements(values);
	appendChilds(tableRowElement, tableCells);
	appendChilds(tableTBodyElement, [tableRowElement]);
};

export const makeSelectBox = (list, { classes, id, style }) => {
	const selectBoxElement = makeElement({ tag: 'select', classes, id, style });
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
