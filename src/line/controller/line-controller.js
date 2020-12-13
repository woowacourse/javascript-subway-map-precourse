import LineInput from '../view/input.js';
import LineOutput from '../view/output.js';
import Line from '../line.js';
import LineModel from '../model/model.js';
import {isUnconfirmedDelete} from '/src/shared/service/confirmation.js';

export default class LineController {
	constructor() {
		this.lineInput = new LineInput();
		this.lineOutput = new LineOutput();

		this.setLineAddButtonHandler();
		this.setLineDeleteButtonHandler();
	}

	setLineAddButtonHandler = () => {
		this.lineInput.lineAddButton.addEventListener('click', this.addLine);
	}

	addLine = () => {
		const line = this.createLine();

		this.addLineToMemory(line);
		this.addLineToTable();
	}

	createLine = () => {
		const lineNameInput = this.lineInput.lineNameInput.value;
		const lineStartStation = this.lineInput.lineStartStationSelector.value;
		const lineEndStation = this.lineInput.lineEndStationSelector.value;

		const line = new Line(lineNameInput, lineStartStation, lineEndStation);

		return line;
	}

	addLineToMemory = line => {
		const lines = new LineModel().getLineStorageData();

		lines[line['lineName']] = line['lineStations'];

		new LineModel().setLineStorageData(lines);
	}

	addStationToTable = () => {
		this.lineOutput.showLineTable();
		this.setLineDeleteButtonHandler();
	}

	setLineDeleteButtonHandler = () => {
		const lineDeleteButtons = document.getElementsByClassName('line-delete-button');
		if (lineDeleteButtons != null) {
			for (let deleteButton of lineDeleteButtons) {
				deleteButton.addEventListener('click', this.deleteLine);
			}
		}
	}

	deleteLine = event => {
		const tableRowToDelete = event.target.parentNode.parentNode;
		const lineNameToDelete = tableRowToDelete.dataset.linename;
		
		if (isUnconfirmedDelete()) {
			return;
		}
		
		this.deleteLineFromMemory(lineNameToDelete);
		tableRowToDelete.remove();
	}

	deleteLineFromMemory = lineNameToDelete => {
		const lines = new LineModel().getLineStorageData();

		delete lines[lineNameToDelete];

		new LineModel().setLineStorageData(lines);
	}
}