import StationModel from '/src/station/model/model.js';
import LineInput from './input.js';
import LineModel from '../model/model.js';

export default class LineOutput {
	constructor() {
		this.lineInput = new LineInput();
		
		this.addStationToLineStartStationSelector();
		this.addStationToLineEndStationSelector();
		this.showLineTable();
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
			let optionText = document.createTextNode(station.stationName);
			option.appendChild(optionText);
			selector.appendChild(option);	
		}
	}

	showLineTable = () => {
		this.clearLineTable();

		const lines = new LineModel().getLineStorageData();
		const lineContainer = document.getElementById('line-container');
		const lineTable = this.createLineTable(lines);

		lineContainer.appendChild(lineTable);
	}

	createLineTable = lines => {
		const lineTable = document.createElement('table');
		lineTable.setAttribute('id', 'line-table');
		lineTable.innerHTML = 
		`
		<tr>
			<th>노선 이름</th>
			<th>상행 종점역</th>
			<th>하행 종점역</th>
			<th>설정</th>
		</tr>
		`;

		for (let line of lines) {
			lineTable.innerHTML += 
			`
			<tr data-lineName=${line.lineName}>
				<td>${line.lineName}</td>
				<td>${line.lineStations[0]}</td>
				<td>${line.lineStations[line.lineStations.length - 1]}</td>
				<td><button class="line-delete-button">삭제</button>
			</tr>
			`;
		}

		return lineTable;
	}

	clearLineTable = () => {
		const lineTable = document.getElementById('line-table');

		if (lineTable != null) {
			lineTable.remove();
		}
	}
}