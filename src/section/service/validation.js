import {
	DUPLICATED_STATION_IN_LINE_MESSAGE,
	NOT_VALID_ORDER_INPUT_MESSAGE,
	MINIMUM_LINE_LENGTH_ALERT_MESSAGE, 
	MINIMUM_LINE_LENGTH
} from '../constants.js';

const alertDuplicatedStationInLine = () => {
	alert(DUPLICATED_STATION_IN_LINE_MESSAGE);

	return true;
};

const duplicatedStationInline = (line, sectionStationSelect) => {
	if (line.includes(sectionStationSelect)) {
		return alertDuplicatedStationInLine();
	}
};

export const isDuplicatedStationInLine = (line, sectionStationSelect) => {
	return duplicatedStationInline(line, sectionStationSelect);
};

const alertNotValidSectionOrderInput = () => {
	alert(NOT_VALID_ORDER_INPUT_MESSAGE);

	return true;
};

const outOfIndex = (line, sectionOrderInput) => {
	if (Number(sectionOrderInput) > line.length || 0 > Number(sectionOrderInput)) {
		return true;
	}
};

const isEmptyOrderInput = sectionOrderInput => {
	return !sectionOrderInput;
};

const isOutOfIndex = (line, sectionOrderInput) => {
	return outOfIndex(line, sectionOrderInput);
};

const isNotInteger = sectionOrderInput => {
	return !Number.isInteger(Number(sectionOrderInput));
};

const notValidSectionOrderInput = (line, sectionOrderInput) => {
	if (isNotInteger(sectionOrderInput) || isOutOfIndex(line, sectionOrderInput) || isEmptyOrderInput(sectionOrderInput)) {
		return alertNotValidSectionOrderInput();
	}
};

export const isNotValidSectionOrderInput = (line, sectionOrderInput) => {
	return notValidSectionOrderInput(line, sectionOrderInput);
};

const alertMinimumLineLength = () => {
	alert(MINIMUM_LINE_LENGTH_ALERT_MESSAGE);

	return true;
};

const minimumLineLength = (lines) => {
	if (lines.length === MINIMUM_LINE_LENGTH) {
		return alertMinimumLineLength();
	}
};

export const isMinimumLineLength = (lines) => {
	return minimumLineLength(lines);
};