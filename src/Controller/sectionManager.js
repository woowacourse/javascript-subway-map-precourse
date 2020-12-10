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

export const insertStation = (lineName, stationName, insertIndex) => {
    console.log(lineName, stationName, insertIndex);
	const allLines = getAllLines();
	const allStations = getAllStation();
	const targetLineIndex = allLines.map((line) => line.name).indexOf(lineName);
	const targetStationIndex = allStations
		.map((station) => station.name)
		.indexOf(stationName);
	allLines[targetLineIndex].stations.splice(
		parseInt(insertIndex),
		0,
		allStations[targetStationIndex].name
	);
	saveAllLines(allLines);
	console.log(allLines);
	console.log(getAllLines());
};
