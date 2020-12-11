export default class StationOutput {
	constructor() {
		this.showStations();
	}

	showStations = () => {
		const stationData = JSON.parse(localStorage.getItem('station-data'));
		const stationContainer = document.getElementById('station-container');
		const stationTable = document.createElement('table');
		stationContainer.appendChild(stationTable);
		stationTable.innerHTML += 
		`
		<tr>
			<th>역 이름</th>
			<th>설정</th>
		</tr>
		`;

		for (let data of stationData) {
			stationTable.innerHTML += 
			`
			<tr>
				<td>${data.stationName}</td>
				<td><button class="station-delete-button">삭제</button>
			</tr>
			`;
		}
	}
}