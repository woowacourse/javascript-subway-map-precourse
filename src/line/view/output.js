import StationModel from '/src/station/model/model.js';
import LineInput from './input.js';

export default class LineOutput {
	constructor() {
		this.lineInput = new LineInput();

		this.addStationToLineStartStationSelector();
		this.addStationToLineEndStationSelector();
	}

	addStationToLineStartStationSelector = () => {
		this.addStationsToSelectorTag(this.lineInput.lineStartStationSelector);
	}

	addStationToLineEndStationSelector = () => {
		this.addStationsToSelectorTag(this.lineInput.lineEndStationSelector);
	}

	addStationsToSelectorTag = selector => {
		const stations = new StationModel().getStationStorageData();

		for (let station of stations) {
			let option = document.createElement('option');
			let optionText = document.createTextNode(`${station.stationName}`);
			option.appendChild(optionText);
			selector.appendChild(option);	
		}
	}

	
}