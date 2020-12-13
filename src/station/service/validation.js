import {STATION_ON_LINE_ALERT_MESSAGE} from '../constants.js';

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

