import LineModel from '../../line/model/model.js';

export default class SectionOutput {
	constructor() {

		this.showLineNameButtons();
	}

	showLineNameButtons = () => {
		const lines = new LineModel().getLineStorageData();
		const lineNameButtonContainer = document.getElementById('line-name-button-container');
		for (let line of lines) {
			let lineButton = document.createElement('button');
			let lineName = document.createTextNode(line.lineName);

			lineButton.appendChild(lineName);
			lineNameButtonContainer.appendChild(lineButton);
		}
	}
}