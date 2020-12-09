import { makeBtn, makeNameInputArea, makeSelectBox } from './template.js';
import words from '../key/words.js';

const lineContainer = (container) => {
	const nameInputArea = makeNameInputArea(
		words.LINE_NAME,
		words.LINE_PLACEHOLDER
	);
	const lineAddBtn = makeBtn(words.LINE_ADD_BTN);
	const ascendingEndPointselectBox = makeSelectBox(["인천, 동인천"]);
	const descendingEndPointselectBox = makeSelectBox(["인천, 동인천"]);
};

export default lineContainer;
