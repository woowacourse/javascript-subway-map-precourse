import StationInput from './view/input.js';
import StationOutput from './view/output.js';
import Station from './station.js';
import Model from '/src/model/model.js';

export default class StationManager {
	constructor() {
		this.stationInput = new StationInput();
		this.stationOutput = new StationOutput();

		this.setStationInputHandler();
		this.setStationDeleteButtonHandler();
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
		const stations = new Model().getStationStorageData();

		stations.push(station);

		new Model().setStationStorageData(stations);

		this.stationOutput.showStationTable();
		this.setStationDeleteButtonHandler();
	}

	createStation = stationName => {
		const station = new Station(stationName);

		return station;
	}

	setStationDeleteButtonHandler = () => {
		const stationDeleteButtons = document.getElementsByClassName('station-delete-button');
		if (stationDeleteButtons != null) {
			for (let deleteButton of stationDeleteButtons) {
				deleteButton.addEventListener('click', this.deleteStation);
			}
		}
	}

	deleteStation = event => {
		const checkDelete = confirm('정말로 삭제하시겠습니까?');
		
		if (checkDelete === false) {
			return;
		}

		const tableRowToDelete = event.target.parentNode.parentNode;
		const stationNameToDelete = tableRowToDelete.dataset.name;

		tableRowToDelete.remove();

		const stations = new Model().getStationStorageData();

		stations.splice(stations.indexOf({stationName: stationNameToDelete}), 1);
		new Model().setStationStorageData(stations);
	}
}