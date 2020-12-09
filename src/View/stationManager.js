import { makeNameInputArea, makeTable } from './template.js';
import words from '../key/words.js';
import { appendChilds, clearAllContents } from '../Controller/utils.js';

const stationContainer = (container) => {
	const nameInputArea = makeNameInputArea(
		words.STATION_NAME,
		words.STATION_NAME_PLACEHOLDER,
		true
	);
	const tableArea = makeTable(
		words.STATION_TABLE_TITLE, [words.STATION_NAME, words.SETTING]
	);
	clearAllContents(container);
	appendChilds(container, [nameInputArea, tableArea]);
};

export default stationContainer;
