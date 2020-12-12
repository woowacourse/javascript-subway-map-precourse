import { alertAndClear, isOnlySpaceString } from '../Controller/utils.js';
import words from '../key/words.js';
import { errorAlertMessages } from '../key/alertMessages.js';

const Station = function (stationName) {
	this.name = stationName;
};

Station.isValidStationName = (stationName, inputElement) => {
	if (isOnlySpaceString(stationName)) {
		alertAndClear(errorAlertMessages.ALERT_SPACE_STATION_NAME, inputElement);
		return false;
	}
	if (stationName.length < 2) {
		alertAndClear(errorAlertMessages.ALERT_STATION_NAME_LENGTH, inputElement);
		return false;
	}
	if (
		Station.readAllStations()
			.map((station) => station.name)
			.includes(stationName)
	) {
		alertAndClear(errorAlertMessages.ALERT_EXISTED_ADDED_STATION, inputElement);
		return false;
	}

	return true;
};

Station.saveAllStations = (stations) => {
	localStorage.setItem(words.STATION, JSON.stringify(stations));
};

Station.readAllStations = () => {
	return JSON.parse(localStorage.getItem(words.STATION));
};

Station.removeAllStations = () => {
	localStorage.removeItem(words.STATION);
};

Station.addOneStation = (station) => {
	const allStations = Station.readAllStations();
	// console.log(allStations);
	allStations.push(station);
	Station.saveAllStations(allStations);
};

Station.removeOneStation = (targetStation) => {
	const allStations = Station.readAllStations();
	const targetIndex = allStations.findIndex((station) => {
		return targetStation === station.name;
	});
	if (targetIndex !== -1) {
		allStations.splice(targetIndex, 1);
		Station.saveAllStations(allStations);
	}
};

export default Station;
