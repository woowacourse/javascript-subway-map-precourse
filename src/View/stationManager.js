import { makeNameInputArea, makeTable } from './template.js';
import words from '../key/words.js';
import { appendChilds } from '../Controller/utils.js';

const container = document.querySelector('.container');

const stationContainer = () => {
	const nameInputArea = makeNameInputArea(
		words.STATION_NAME,
		words.STATION_NAME_PLACEHOLDER,
		true
	);
	const tableArea = makeTable(
		words.STATION_TABLE_TITLE, [words.STATION_NAME, words.SETTING]
	);
	appendChilds(container, [nameInputArea, tableArea]);
};

export default stationContainer;
