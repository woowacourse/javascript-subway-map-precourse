import { isOnlySpaceString } from '../Controller/utils.js';
import words from '../key/words.js';

const Station = function (stationName) {
	this.name = stationName;
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
		return targetStation.name === station.name;
	});
	if (targetIndex !== -1) {
		allStations.splice(targetIndex, 1);
		Station.saveAllStations(allStations);
	}
};

export default Station;
