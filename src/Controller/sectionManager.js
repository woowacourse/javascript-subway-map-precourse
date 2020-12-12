import { makeElement } from './utils.js';
import words from '../key/words.js';
import { getAllStation } from './stationManager.js';
import { addTableRow } from '../View/template.js';
import { getAllLines, saveAllLines } from './lineManager.js';

export const makeNewSectionDeleteButtonElement = (id) =>
	makeElement({
		tag: 'button',
		innerText: words.SECTION_DELETE_FOR_STATION,
		classes: [words.STATION_DELETE_CLASS],
		id,
	});

export const tableSynchronizer = (tableElement, lineName) => {
	const allLines = getAllLines();
	const targetStations =
		allLines[allLines.map((line) => line.name).indexOf(lineName)].stations;
	targetStations.forEach((stationName, index) => {
		addTableRow(tableElement, [
			`${index}`,
			stationName,
			makeNewSectionDeleteButtonElement(stationName),
		]);
	});
};

export const insertStation = (lineName, stationName, insertElement) => {
	const allLines = getAllLines();
	const allStations = getAllStation();
	const targetLineIndex = allLines.map((line) => line.name).indexOf(lineName);
	const targetStationIndex = allStations
		.map((station) => station.name)
        .indexOf(stationName);
    const insertIndex = insertElement.value;
	allLines[targetLineIndex].stations.splice(
		parseInt(insertIndex),
		0,
		allStations[targetStationIndex].name
	);
	saveAllLines(allLines);
};
