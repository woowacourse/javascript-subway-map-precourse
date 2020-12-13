import LineModel from '/src/line/model/model.js';

export default class MapOutput {
	constructor() {
		this.printAllStations();
	}

	printAllStations = () => {
		const mapContainer = document.getElementById('map-container');
		const lines = new LineModel().getLineStorageData();

		this.createLineHeader(mapContainer, lines);
	}

	createLineHeader = (mapContainer, lines) => {
		for (let line in lines) {
			const lineHeader = document.createElement('h3');
			const lineHeaderText = document.createTextNode(`${line}`);

			lineHeader.appendChild(lineHeaderText);
			mapContainer.appendChild(lineHeader);

			this.createLineList(mapContainer, lines, line);
		}
	}

	createLineList = (mapContainer, lines, line) => {
		const unorderList = document.createElement('ul');

		for (let station of lines[line]) {
			const stationList = document.createElement('li');
			const stationListText = document.createTextNode(`${station}`);

			stationList.appendChild(stationListText);
			unorderList.appendChild(stationList);
		}

		mapContainer.appendChild(unorderList);
	}
}	