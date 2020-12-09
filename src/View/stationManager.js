import { makeNameInputArea, makeTable, makeText } from './template.js';
import words from '../key/words.js';
import { appendChilds, clearAllContents } from '../Controller/utils.js';

const stationContainer = (container) => {
	const nameInputArea = makeNameInputArea(
		words.STATION_NAME,
		words.STATION_NAME_PLACEHOLDER,
		true
	);
	const talbeTitle = makeText('p', words.STATION_TABLE_TITLE);
	const tableArea = makeTable([words.STATION_NAME, words.SETTING]);
	clearAllContents(container);
	appendChilds(container, [nameInputArea, talbeTitle, tableArea]);
};

export default stationContainer;
