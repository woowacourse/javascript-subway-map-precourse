import StationInput from './view/input.js';
import StationOutput from './view/output.js';
import Station from './station.js';
import StationModel from './model/model.js';

export default class StationManager {
	constructor() {
		this.stationInput = new StationInput();
		this.stationOutput = new StationOutput();

		this.setStationInputHandler();
	}

	setStationInputHandler = () => {
		this.stationInput.stationAddButton.addEventListener('click', this.getStationInputName);	
	}

	getStationInputName = () => {
		const stationName = this.stationInput.stationNameInput.value;

		this.addStation(stationName);
	}

	addStation = stationName => {
		const station = this.createStation(stationName);
		const stations = new StationModel().getStationStorageData();

		stations.push(station);

		new StationModel().setStationStorageData(stations);

		this.stationOutput.showStationTable();
		this.setStationDeleteButtonHandler();
	}

	createStation = stationName => {
		const station = new Station(stationName);

		return station;
	}

	
}