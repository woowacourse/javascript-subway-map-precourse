import LineModel from '/src/line/model/model.js';

export default class MapOutput {
	constructor() {
		this.printAllStations();
	}

	printAllStations = () => {
		const lines = new LineModel().getLineStorageData();
		const mapContainer = document.getElementById('map-container');

		for (let line of lines) {
			const lineHeader = document.createElement('h3');
			const lineHeaderText = document.createTextNode(`${line.lineName}`);
			const unorderList = document.createElement('ul');

			lineHeader.appendChild(lineHeaderText);
			mapContainer.appendChild(lineHeader);
			mapContainer.appendChild(unorderList);

			for (let station of line.lineStations) {
				const stationList = document.createElement('li');
				const stationListText = document.createTextNode(`${station}`);

				stationList.appendChild(stationListText);
				unorderList.appendChild(stationList);
			}
		}
	}
}