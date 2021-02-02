import LocalStorage from '../../shared/service/local-storage.js';

export default class StationOutput {
	constructor() {
		this.updateStationOutput();
	}

	updateStationOutput = () => {
		this.initializeStationOuput();
		this.showStationTable();
	}

	initializeStationOuput = () => {
		const stationContainer = document.getElementById('station-container');

		stationContainer.innerHTML = 
		`
		<br />
		역 이름
		<br />
		<input type="text" id="station-name-input" placeholder="역 이름을 입력해주세요.">
		<button id="station-add-button">역 추가</button>
		<h2>🚉 지하철 역 목록</h2>
		`;
	}

	showStationTable = () => {
		this.clearStationTable();

		const stations = new LocalStorage().loadData('station-data');
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