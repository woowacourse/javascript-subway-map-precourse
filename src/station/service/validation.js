import {
	STATION_ON_LINE_ALERT_MESSAGE,
	NOT_VALID_STATION_NAME_ALERT_MESSAGE,
	DUPLICATED_STATION_NAME_ALERT_MESSAGE,
} from '../constants.js';

const stationOnLineAlert = () => {
	alert(STATION_ON_LINE_ALERT_MESSAGE);

	return true;
};

const stationOnLine = (lines, stationNameToDelete) => {
	for (let line in lines) {
		if (lines[line].includes(stationNameToDelete)) {
			return stationOnLineAlert();
		}
	}
};

export const isStationOnLine = (lines, stationNameToDelete) => {
	return stationOnLine(lines, stationNameToDelete);
};

const duplicatedStationNameAlert = () => {
	alert(DUPLICATED_STATION_NAME_ALERT_MESSAGE);

	return true;
};

const duplicatedStationName = (stations, stationName) => {
	if (stations[stationName]) {
		return duplicatedStationNameAlert();
	}
};

export const isDuplicatedStationName = (stations, stationName) => {
	return duplicatedStationName(stations, stationName);
};

const notValidNameAlert = () => {
	alert(NOT_VALID_STATION_NAME_ALERT_MESSAGE);

	return true;
};

const notValidStationName = stationName => {
	if (stationName.length < 2) {
		return notValidNameAlert();
	}
};

export const isNotValidStationName = stationName => {
	return notValidStationName(stationName);
};