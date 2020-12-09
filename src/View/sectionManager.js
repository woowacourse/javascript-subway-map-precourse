import { appendChilds, clearAllContents } from '../Controller/utils.js';
import words from '../key/words.js';
import {
	makeBtn,
	makeInput,
	makeSelectBox,
	makeTable,
	makeText,
} from './template.js';

const appendUnderBtns = (data) => {
	const subContainer = document.querySelector(".sub-container");
	const handleText = makeText('p', `${data} ${words.SECTION_HANDLE_TEXT}`);
	const registerText = makeText('p', words.SECTION_REGISTER_TEXT);
	const stationSelectBox = makeSelectBox(['인천', '동인천']);
	const nameInputArea = makeInput(words.SECTION_PLACEHOLDER, 'number');
	const registerBtn = makeBtn(words.SECTION_ADD_BTN);
	const tableArea = makeTable([
		data + words.SECTION_TABLE_COL1,
		data + words.SECTION_TABLE_COL2,
		data + words.SECTION_TABLE_COL3,
	]);
	clearAllContents(subContainer);
	appendChilds(subContainer, [
		handleText,
		registerText,
		stationSelectBox,
		nameInputArea,
		registerBtn,
		tableArea,
	]);
	
};

const sectionContainer = (container) => {
	const tempData = ['1호선', '2호선', '3호선'];
	const sectionTitle = makeText('p', words.SECTION_TITLE);
	const subContainer = document.createElement("div");
	const sectionBtns = tempData.map((data) => {
		const btn = makeBtn(data);
		btn.addEventListener('click', () => appendUnderBtns(data));
		return btn;
	});
	subContainer.className="sub-container";
	clearAllContents(container);
	appendChilds(container, [sectionTitle, ...sectionBtns, subContainer]);
};

export default sectionContainer;
