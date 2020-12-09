import Station from '../Model/Station.js';
import { makeTableRow } from '../View/template.js';

export const addStation = (inputArea) => {
	const stationName = inputArea.value;
	if (Station.isValidStationName(stationName)) {
		Station.addOneStation(new Station(stationName));
	}
};
