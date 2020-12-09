import { makeBtn, makeInput, makeTable, makeText } from './template.js';
import words from '../key/words.js';
import { appendChilds, clearAllContents } from '../Controller/utils.js';

const stationContainer = (container) => {
	const titleArea = makeText('p', words.STATION_NAME);
	const inputArea = makeInput(words.STATION_NAME_PLACEHOLDER);
	const btnArea = makeBtn(words.STATION_ADD_BTN);
	const talbeTitle = makeText('p', words.STATION_TABLE_TITLE);
	const tableArea = makeTable([
		words.STATION_TALLE_COL1,
		words.STATION_TALLE_COL2,
	]);
	clearAllContents(container);
	appendChilds(container, [titleArea, inputArea, btnArea,talbeTitle, tableArea]);
};

export default stationContainer;
