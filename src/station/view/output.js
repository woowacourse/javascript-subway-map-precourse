import StationModel from '../model/model.js';

export default class StationOutput {
	constructor() {
		this.showStationTable();
	}

	showStationTable = () => {
		this.clearStationTable();

		const stations = new StationModel().getStationStorageData();
		const stationContainer = document.getElementById('station-container');
		const stationTable = this.createStationTable(stations);

		stationContainer.appendChild(stationTable);
	}

	clearStationTable = () => {
		const stationTable = document.getElementById('station-table');
		
		if (stationTable != null) {
			stationTable.remove();
		}
	}

	createStationTable = stations => {
		const stationTable = document.createElement('table');
		stationTable.setAttribute('id', 'station-table');

		this.createStationTableHeader(stationTable);
		this.createStationTableData(stationTable, stations);
		
		return stationTable;
	}

	createStationTableHeader = stationTable => {
		stationTable.innerHTML = 
		`
		<tr>
			<th>역 이름</th>
			<th>설정</th>
		</tr>
		`;
	}

	createStationTableData = (stationTable, stations)=> {
		for (let station in stations) {
			stationTable.innerHTML += 
			`
			<tr data-stationName="${station}">
				<td>${station}</td>
				<td><button class="station-delete-button">삭제</button>
			</tr>
			`;
		}
	}
}