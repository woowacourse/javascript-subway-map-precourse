import LineInput from './view/input.js';
import LineOutput from './view/output.js';
import Line from './line.js';
import LineModel from './model/model.js';
import SectionManager from '../section/section-manager.js';
import SectionModel from '../section/model/model.js';

export default class LineManager {
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
		const lineNameInput = this.lineInput.lineNameInput.value;
		const lineStartStation = this.lineInput.lineStartStationSelector.value;
		const lineEndStation = this.lineInput.lineEndStationSelector.value;
		const line = this.createLine(lineNameInput, lineStartStation, lineEndStation);
		const lines = new LineModel().getLineStorageData();

		lines.push(line);

		new LineModel().setLineStorageData(lines);

		this.lineOutput.showLineTable();
	}

	createLine = (lineNameInput, lineStartStation, lineEndStation) => {
		const line = new Line(lineNameInput, lineStartStation, lineEndStation);

		return line;
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
		const checkDelete = confirm('정말로 삭제하시겠습니까');

		if (checkDelete === false) {
			return;
		}

		const tableRowToDelete = event.target.parentNode.parentNode;
		const lineNameToDelete = tableRowToDelete.dataset.lineName;
		
		tableRowToDelete.remove();

		const lines = new LineModel().getLineStorageData();

		lines.splice(lines.indexOf({lineName: lineNameToDelete}));

		new LineModel().setLineStorageData(lines);
	}
}