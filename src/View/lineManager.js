import { makeBtn, makeInput, makeSelectBox, makeTable, makeText } from './template.js';
import words from '../key/words.js';
import { appendChilds, clearAllContents } from '../Controller/utils.js';

const lineContainer = (container) => {
	const titleArea = makeText('p', words.LINE_NAME);
	const inputArea = makeInput(words.LINE_PLACEHOLDER);

	const ascendingEndPointText = makeText('p', words.LINE_ASC_ENDPOINT);
	const descendingEndPointText = makeText('p', words.LINE_DESC_ENDPOINT);
	const ascendingEndPointSelectBox = makeSelectBox(['인천', '동인천']);
	const descendingEndPointSelectBox = makeSelectBox(['인천', '동인천']);

	const lineAddBtn = makeBtn(words.LINE_ADD_BTN);

	const tableTitle = makeText('p', words.LINE_TABLE_TITLE);
	const tableArea = makeTable([
		words.LINE_TABLE_COL1,
		words.LINE_TABLE_COL2,
		words.LINE_TABLE_COL3,
		words.LINE_TABLE_COL4,
	]);

	clearAllContents(container);

	appendChilds(container, [
		titleArea,
		inputArea,
		ascendingEndPointText,
		descendingEndPointText,
		ascendingEndPointSelectBox,
		descendingEndPointSelectBox,
		lineAddBtn,
		tableTitle,
		tableArea,
	]);
};

export default lineContainer;
