import StationInput from '../view/input.js';
import StationOutput from '../view/output.js';
import Station from '../station.js';
import LocalStorage from '../../shared/service/local-storage.js';
import {isUnconfirmedDelete} from '/src/shared/service/confirmation.js';
import {isStationOnLine, isNotValidStationName, isDuplicatedStationName} from '../service/validation.js';

export default class StationController {
	constructor() {
		this.stationOutput = new StationOutput();
		this.stationInput = new StationInput();

		this.setStationInputHandler();
		this.setStationDeleteButtonHandler();
	}

	setStationInputHandler = () => {
		this.stationInput.stationAddButton.addEventListener('click', this.addStation);	
	}

	addStation = () => {
		const stationName = this.stationInput.stationNameInput.value;

		if (this.isStationInputError()) {
			return;
		}

		const station = this.createStation(stationName);
		
		this.addStationToMemory(station);
		this.addStationToTable();
	}

	isStationInputError = () => {
		const stations = new LocalStorage().loadData('station-data');
		const stationName = this.stationInput.stationNameInput.value;

		if (isDuplicatedStationName(stations, stationName) || isNotValidStationName(stationName)) {
			return true;
		}
	}

	createStation = (stationName) => {
		const station = new Station(stationName);

		return station;
	}

	addStationToMemory = station => {
		const stations = new LocalStorage().loadData('station-data');

		stations[station['stationName']] = station['stationName'];
		
		new LocalStorage().saveData('station-data', stations);
	}

	addStationToTable = () => {
		this.stationOutput.showStationTable();
		this.setStationDeleteButtonHandler();
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
		const tableRowToDelete = event.target.parentNode.parentNode;
		const stationNameToDelete = tableRowToDelete.dataset.stationname;
		const lines = new LocalStorage().loadData('line-data');

		if (isStationOnLine(lines, stationNameToDelete) || isUnconfirmedDelete()) {
			return;
		}

		this.deleteStationFromMemory(stationNameToDelete);
		tableRowToDelete.remove();
	}

	deleteStationFromMemory = stationNameToDelete => {
		const stations = new LocalStorage().loadData('station-data');

		delete stations[stationNameToDelete];
		
		new LocalStorage().saveData('station-data', stations);
	}
}