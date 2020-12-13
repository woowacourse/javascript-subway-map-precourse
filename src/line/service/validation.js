import {DUPLICATED_LINE_ALERT_MESSAGE} from '../constants.js';

const duplicatedLineAlert = () => {
	alert(DUPLICATED_LINE_ALERT_MESSAGE);

	return true;
};

const duplicatedLine = (line, lineNameInput) => {
	if (line[lineNameInput]) {
		return duplicatedLineAlert();
	}
};

export const isDuplicatedLine = (line, lineNameInput) => {
	return duplicatedLine(line, lineNameInput);
};