import StationModel from '/src/station/model/model.js';
import LineInput from './input.js';
import LineModel from '../model/model.js';

export default class LineOutput {
	constructor() {
		this.updateLineOutput();
	}

	updateLineOutput = () => {
		this.initializeLineOutput();
		this.addStationToLineStartStationSelector();
		this.addStationToLineEndStationSelector();
		this.showLineTable();
	}

	initializeLineOutput = () => {
		const lineContainer = document.getElementById('line-container');

		lineContainer.innerHTML = 
		`
		<br />노선 이름<br />
		<input type="text" id="line-name-input" placeholder="노선 이름을 입력해주세요"><br /><br />
		상행 종점 
		<select id="line-start-station-selector"></select><br />
		하행 종점
		<select id="line-end-station-selector"></select><br /><br />
		<button id="line-add-button">노선 추가</button>
		<h2>지하철 노선 목록</h2>
		`;
	}

	addStationToLineStartStationSelector = () => {
		this.addStationsToSelectorTag(new LineInput().lineStartStationSelector);
	}

	addStationToLineEndStationSelector = () => {
		this.addStationsToSelectorTag(new LineInput().lineEndStationSelector);
	}

	addStationsToSelectorTag = selector => {
		const stations = new StationModel().getStationStorageData();

		for (let station in stations) {
			let option = document.createElement('option');
			let optionText = document.createTextNode(station);
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

	clearLineTable = () => {
		const lineTable = document.getElementById('line-table');

		if (lineTable != null) {
			lineTable.remove();
		}
	}

	createLineTable = lines => {
		const lineTable = document.createElement('table');
		lineTable.setAttribute('id', 'line-table');
		
		this.createLineTableHeader(lineTable);
		this.createLineTableData(lineTable, lines);

		return lineTable;
	}

	createLineTableHeader = lineTable => {
		lineTable.innerHTML = 
		`
		<tr>
			<th>노선 이름</th>
			<th>상행 종점역</th>
			<th>하행 종점역</th>
			<th>설정</th>
		</tr>
		`;
	}

	createLineTableData = (lineTable, lines) => {
		for (let line in lines) {
			lineTable.innerHTML += 
			`
			<tr data-lineName=${line}>
				<td>${line}</td>
				<td>${lines[line][0]}</td>
				<td>${lines[line][lines[line].length - 1]}</td>
				<td><button class="line-delete-button">삭제</button>
			</tr>
			`;
		}
	}
}