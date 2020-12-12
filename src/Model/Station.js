import { alertAndClear, isOnlySpaceString } from '../Controller/utils.js';
import words from '../key/words.js';
import { errorAlertMessages } from '../key/alertMessages.js';
import Line from './Line.js';

const Station = function (stationName) {
	this.name = stationName;
};

Station.isDuplitedStationName = (stationName) =>
	Station.readAllStations()
		.map((station) => station.name)
		.includes(stationName);

Station.isValidStationName = (stationName, inputElement) => {
	if (isOnlySpaceString(stationName)) {
		alertAndClear(errorAlertMessages.ALERT_SPACE_STATION_NAME, inputElement);
		return false;
	} else if (stationName.length < 2) {
		alertAndClear(errorAlertMessages.ALERT_STATION_NAME_LENGTH, inputElement);
		return false;
	} else if (isDuplitedStationName(stationName)) {
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

Station.searchStationsByName = (stationName) => {
	const targetIndex = Station.readAllStations()
		.map((station) => station.name)
		.indexOf(stationName);
	return targetIndex;
};

Station.removeOneStation = (targetStation) => {
	const allStations = Station.readAllStations();
	const targetIndex = Station.searchStationsByName(targetStation);
	if (targetIndex !== -1) {
		allStations.splice(targetIndex, 1);
		Station.saveAllStations(allStations);
	}
};

Station.isOnLine = (stationName) => {
	const allLines = Line.readAllLines();
	return (
		allLines
			.map((line) => line.name)
			.filter((lineName) => Line.hasThisStation(lineName, stationName)).length >
		0
	);
};

export default Station;
