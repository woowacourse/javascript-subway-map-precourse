import { makeBtn, makeInput, makeTable, makeTableRow, makeText } from './template.js';
import words from '../key/words.js';
import { appendChilds, clearAllContents } from '../Controller/utils.js';
import Station from '../Model/Station.js';
import { addStation } from '../Controller/stationManager.js';

const drawTable = (tableArea) => {
	const allStations = Station.readAllStations();
	const tbodyArea = tableArea.querySelector('tbody');
	const tableRows = allStations.map((station) => {
			return makeTableRow([station.name], words.DELETE);
		})

	clearAllContents(tbodyArea);
	appendChilds(tbodyArea, tableRows)
};

const stationContainer = (container) => {
	const titleArea = makeText('p', words.STATION_NAME);
	const inputArea = makeInput(words.STATION_NAME_PLACEHOLDER);
	const btnArea = makeBtn(words.STATION_ADD_BTN);
	const talbeTitle = makeText('p', words.STATION_TABLE_TITLE);
	const tableArea = makeTable([
		words.STATION_TALLE_COL1,
		words.STATION_TALLE_COL2,
	]);
	btnArea.addEventListener('click', ()=>{
		addStation(inputArea);
		drawTable(tableArea);
	})
	clearAllContents(container);
	appendChilds(container, [titleArea, inputArea, btnArea,talbeTitle, tableArea]);
	drawTable(tableArea);
};

export default stationContainer;
