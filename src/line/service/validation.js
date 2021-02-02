import {
	NOT_VALID_LINE_NAME_ALERT_MESSAGE,
	LINE_NAME_FORMAT,
	DUPLICATED_LINE_ALERT_MESSAGE,
	SAME_START_STATION_AND_END_STATION_ALERT_MESSAGE
} from '../constants.js';

const alertNotValidLineName = () => {
	alert(NOT_VALID_LINE_NAME_ALERT_MESSAGE);

	return true;
};

const isWrongNameFormat = lineNameInput => {
	if (lineNameInput[lineNameInput.length - 1] !== LINE_NAME_FORMAT) {
		return true;
	}
};

const isNameEmpty = lineNameInput => {
	if (lineNameInput.length === 0) {
		return true;
	}
};

const notValidLineName = lineNameInput => {
	if (isNameEmpty(lineNameInput) || isWrongNameFormat(lineNameInput)) {
		return alertNotValidLineName();
	}
};

export const isNotValidLineName = lineNameInput => {
	return notValidLineName(lineNameInput);
};

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

const alertSameStartStationAndEndStation = () => {
	alert(SAME_START_STATION_AND_END_STATION_ALERT_MESSAGE);

	return true;
};

const sameStartStationAndEndStation = (lineStartStation, lineEndStation) => {
	if (lineStartStation === lineEndStation) {
		return alertSameStartStationAndEndStation();
	}
};

export const isSameStartStationAndEndStation = (lineStartStation, lineEndStation) => {
	return sameStartStationAndEndStation(lineStartStation, lineEndStation);
};