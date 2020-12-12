import LineInput from './view/input.js';
import LineOutput from './view/output.js';
import Line from './line.js';
import LineModel from './model/model.js';

export default class LineManager {
	constructor() {
		this.lineInput = new LineInput();
		this.lineOutput = new LineOutput();

		this.setLineAddButtonHandler();
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

}