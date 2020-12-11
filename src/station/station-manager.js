import StationInput from './view/input.js';
import StationOutput from './view/output.js';
import Station from './station.js';

export default class StationManager {
	constructor() {
		this.stationInput = new StationInput();
		this.stationOutput = new StationOutput();
		this.stations = [];

		this.setStationInputHandler();
	}

	setStationInputHandler = () => {
		this.stationInput.stationAddButton.addEventListener('click', this.getStationInputName);	
	}

	getStationInputName = () => {
		const stationtName = this.stationInput.stationNameInput.value;
		this.addStation(stationtName);
	}

	addStation = stationName => {
		const station = this.createStation(stationName);
		this.stations.push(station);

		this.saveStations(this.stations);
	}

	createStation = stationName => {
		const station = new Station(stationName);

		return station;
	}

	saveStations = station => {
		localStorage.setItem('station-data', JSON.stringify(this.stations));
	}
}