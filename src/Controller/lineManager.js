import Station from '../Model/Station.js';
import Line from '../Model/Line.js';
import words from '../key/words.js';
import { addTableRow } from '../View/template.js';
import { makeElement } from './utils.js';

export const getAllLines = () => {
	return Line.readAllLines();
};

export const addLine = (lineName, startStation, endStation) => {
	if (Line.isValidLineName(lineName)) {
		const allLines = getAllLines();
		const newLine = new Line(lineName);
		newLine.stations = [startStation, endStation];
		allLines.push(newLine);
		Line.saveAllLines(allLines);
	}
};

export const makeNewLineDeleteButtonElement = (id) =>
	makeElement({
		tag: 'button',
		innerText: words.LINE_DELETE_BUTTON,
		classes: [words.LINE_DELETE_CLASS],
		id,
	});

export const tableSynchronizer = (tableElement) => {
    const allLines = getAllLines();
	if (allLines.length === 0) return;
	allLines.forEach((line) => {
		addTableRow(tableElement, [
			line.name,
			line.stations[0],
			line.stations[line.stations.length-1],
			makeNewLineDeleteButtonElement(line.name),
		]);
    });
};
