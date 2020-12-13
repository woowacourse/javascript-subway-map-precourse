import SectionOutput from '../view/output.js';
import SectionInput from '../view/input.js';
import LineModel from '../../line/model/model.js';
import {isUnconfirmedDelete} from '/src/shared/service/confirmation.js';
import {isMinimumLineLength} from '../service/validation.js';

export default class SectionController {
	constructor() {
		this.sectionOutput = new SectionOutput;
		this.sectionInput = new SectionInput;
		this.selectedLine;

		this.setLineNameButtonsHandler();
	}

	setLineNameButtonsHandler = () => {
		const sectionLineMenuButtons = this.sectionInput.sectionLineMenuButtons;

		for (let sectionLineMenuButton of sectionLineMenuButtons) {
			sectionLineMenuButton.addEventListener('click', this.selectLine);
		}
	}

	selectLine = event => {
		this.selectedLine = event.target.getAttribute('data-lineName');
		
		this.sectionOutput.showSelectedLineSectionContainer(this.selectedLine);

		this.setSectionAddButtonHandler();
		this.setDeleteButtonsHandler();
	}

	setSectionAddButtonHandler = () => {
		const sectionAddButton = document.getElementById('section-add-button');

		sectionAddButton.addEventListener('click', this.addSection);
	}

	addSection = () => {
		const sectionStationSelect = document.getElementById('section-station-selector').value;
		const sectionOrderInput = Number(document.getElementById('section-order-input').value);

		this.addSectionToMemory(sectionStationSelect, sectionOrderInput);
		this.addSectionToTable();
	}

	addSectionToMemory = (sectionStationSelect, sectionOrderInput) => {
		const lines = new LineModel().getLineStorageData();
		
		lines[this.selectedLine].splice(sectionOrderInput, 0, sectionStationSelect);

		new LineModel().setLineStorageData(lines);
	}

	addSectionToTable = () => {
		this.sectionOutput.showSelectedLineSectionContainer(this.selectedLine);
		this.setDeleteButtonsHandler();
	}

	setDeleteButtonsHandler = () => {
		const deleteButtons = document.getElementsByClassName('section-delete-button');
		for (let deleteButton of deleteButtons) {
			deleteButton.addEventListener('click', this.deleteSection);
		}
	}

	deleteSection = event => {
		if (isMinimumLineLength() || isUnconfirmedDelete()) {
			return;
		}

		const tableRowToDelete = event.target.parentNode.parentNode;
		const selectedLineNameToDelete = tableRowToDelete.dataset.selectedlinename;
		const stationIndexToDelete = tableRowToDelete.dataset.stationindex;

		this.deleteSectionFromMemory(selectedLineNameToDelete, stationIndexToDelete);
		this.deleteSectionFromTable(selectedLineNameToDelete);
	}

	deleteSectionFromMemory = (selectedLineNameToDelete, stationIndexToDelete) => {
		const lines = new LineModel().getLineStorageData();
		
		lines[selectedLineNameToDelete].splice(stationIndexToDelete, 1);

		new LineModel().setLineStorageData(lines);
	}

	deleteSectionFromTalbe = (selectedLineNameToDelete) => {
		this.sectionOutput.showSelectedLineSectionContainer(selectedLineNameToDelete);
		this.setSectionAddButtonHandler();
		this.setDeleteButtonsHandler();
	}
}

