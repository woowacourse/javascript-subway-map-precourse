import StationModel from '../model/model.js';

export default class StationOutput {
	constructor() {
		this.showStationTable();
	}

	showStationTable = () => {
		this.clearStationTable();

		const stationData = new StationModel().getStationStorageData();
		const stationContainer = document.getElementById('station-container');
		const stationTable = this.createStationTable(stationData);

		stationContainer.appendChild(stationTable);
	}

	createStationTable = stationData => {
		const stationTable = document.createElement('table');
		stationTable.setAttribute('id', 'station-table');
		stationTable.innerHTML = 
		`
		<tr>
			<th>역 이름</th>
			<th>설정</th>
		</tr>
		`;

		for (let data of stationData) {
			stationTable.innerHTML += 
			`
			<tr data-name="${data.stationName}">
				<td>${data.stationName}</td>
				<td><button class="station-delete-button">삭제</button>
			</tr>
			`;
		}
				
		return stationTable;
	}

	clearStationTable = () => {
		const stationTable = document.getElementById('station-table');
		
		if (stationTable != null) {
			stationTable.remove();
		}
	}
}