import { isOnlySpaceString } from '../Controller/utils.js';
import words from '../key/words.js';

const Station = function (stationName) {
	this.name = stationName;
	this.onLine = [];
};

Station.isValidStationName = (stationName) => {
	if (
		!isOnlySpaceString(stationName) &&
		stationName.length >= 2 &&
		!Station.readAllStations().includes(stationName)
	) {
		return true;
	}
	return false;
};

Station.saveAllStations = (stations) => {
	localStorage.setItem(words.STATION, stations);
};

Station.readAllStations = () => {
	return localStorage.getItem(words.STATION);
};

Station.removeAllStations = () => {
	localStorage.removeItem(words.STATION);
};

Station.addOneStation = (station) => {
	const allStations = readAllStations();
	allStations.push(station);
	saveAllStations(allStations);
};

Station.removeOneStation = (targetStation) => {
	const allStations = readAllStations();
	const targetIndex = allStations.findIndex((station) => {
		return targetStation.name === station.name;
	});
	if (targetIndex !== -1) {
		allStations.splice(targetIndex, 1);
		saveAllStations(allStations);
	}
};

export default Station;
