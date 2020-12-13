import SectionOutput from '../view/output.js';
import SectionInput from '../view/input.js';
import LineModel from '../../line/model/model.js';
import {isUnconfirmedDelete} from '/src/shared/service/confirmation.js';
import {
	isMinimumLineLength, 
	isDuplicatedStationInLine, 
	isNotValidSectionOrderInput
} from '../service/validation.js';

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
		const [sectionStationSelect, sectionOrderInput] = this.getSectionInputValues();

		if (this.isSectionInputError()) {
			return;
		}

		this.addSectionToMemory(sectionStationSelect, sectionOrderInput);
		this.addSectionToTable();
	}

	isSectionInputError = () => {
		const lines = new LineModel().getLineStorageData();

		const [sectionStationSelect, sectionOrderInput] = this.getSectionInputValues();

		if (
			isDuplicatedStationInLine(lines[this.selectedLine], sectionStationSelect) || 
			isNotValidSectionOrderInput(lines[this.selectedLine], sectionOrderInput)
		) {
			return true;
		}
	}

	getSectionInputValues = () => {
		const sectionStationSelect = document.getElementById('section-station-selector').value;
		const sectionOrderInput = document.getElementById('section-order-input').value;

		return [sectionStationSelect, sectionOrderInput];
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
		const lines = new LineModel().getLineStorageData();

		if (isMinimumLineLength(lines[this.selectedLine]) || isUnconfirmedDelete()) {
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

	deleteSectionFromTable = (selectedLineNameToDelete) => {
		this.sectionOutput.showSelectedLineSectionContainer(selectedLineNameToDelete);
		this.setSectionAddButtonHandler();
		this.setDeleteButtonsHandler();
	}
}

