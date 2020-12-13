import StationModel from '../../station/model/model.js';
import LineModel from '../../line/model/model.js';

export default class SectionOutput {
	constructor() {

		this.showLineNameButtons();
	}

	showLineNameButtons = () => {
		const lines = new LineModel().getLineStorageData();
		const sectionContainer = document.getElementById('section-container');
		const sectionLineMenuButtonContainer = document.createElement('div');

		sectionContainer.appendChild(sectionLineMenuButtonContainer);
		sectionLineMenuButtonContainer.setAttribute('id', 'section-line-menu-button-container');
		
		for (let line in lines) {
			sectionLineMenuButtonContainer.innerHTML += `<button class="section-line-menu-button" data-lineName=${line}>${line}</button> `;
		}
	}

	showSelectedLineSectionContainer = selectedLine => {
		this.clearSelectedLineSectionContainer();

		const sectionContainer = document.getElementById('section-container');
		const selectedLineSectionContainer = document.createElement('div');

		selectedLineSectionContainer.setAttribute('id', 'selected-line-section-container');
		sectionContainer.appendChild(selectedLineSectionContainer);
		selectedLineSectionContainer.innerHTML = 
		`
		<h3>${selectedLine}</h3>
		<h4>구간 등록</h4>
		<select id="section-station-selector"></select>
		<input type="number" id="section-order-input" placeholder="순서"/>
		<button id="section-add-button">등록</button>
		<h2>지하철 노선 목록</h2>
		`;

		this.addStationsToSelectorTag();
		this.showSelectedLineSectionTable(selectedLineSectionContainer, selectedLine);
	}

	clearSelectedLineSectionContainer = () => {
		const selectedLineSectionContainer = document.getElementById('selected-line-section-container');

		if (selectedLineSectionContainer === null) {
			return;
		}

		selectedLineSectionContainer.remove();
	}

	addStationsToSelectorTag = () => {
		const stations = new StationModel().getStationStorageData();
		const sectionStationSelector = document.getElementById('section-station-selector');

		for (let station in stations) {
			let option = document.createElement('option');
			let optionText = document.createTextNode(station);
			option.appendChild(optionText);
			sectionStationSelector.appendChild(option);
		}
	}

	showSelectedLineSectionTable = (selectedLineSectionContainer, selectedLine) => {
		const sectionTable = document.createElement('table');
		sectionTable.setAttribute('id', 'section-table');
		sectionTable.innerHTML = 
		`
		<tr>
			<th>순서</th>
			<th>이름</th>
			<th>설정</th>
		</tr>
		`;

		const lines = new LineModel().getLineStorageData();
		const lineStations = lines[selectedLine];

		for (let stationIndex = 0; stationIndex < lineStations.length; stationIndex++) {
			sectionTable.innerHTML += 
			`
			<tr data-selectedLineName="${selectedLine}" data-stationIndex="${stationIndex}">
				<td>${stationIndex}</td>
				<td>${lineStations[stationIndex]}</td>
				<td><button class="section-delete-button">노선에서 제거</button></td>
			</tr>
			`;
		}
		selectedLineSectionContainer.appendChild(sectionTable);
	}
}