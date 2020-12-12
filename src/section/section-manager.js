import SectionOutput from './view/output.js';
import SectionInput from './view/input.js';

export default class SectionManager {
	constructor() {
		this.sectionOutput = new SectionOutput;
		this.sectionInput = new SectionInput;
		this.setLineNameButtonsHandler();
	}

	setLineNameButtonsHandler = () => {
		const sectionLineMenuButtons = this.sectionInput.sectionLineMenuButtons;

		for (let sectionLineMenuButton of sectionLineMenuButtons) {
			sectionLineMenuButton.addEventListener('click', this.selectLine);
		}
	}

	selectLine = event => {
		const selectedLine = event.target.getAttribute('data-lineName');
		
		this.sectionOutput.showSelectedLineSectionContainer(selectedLine);
	}
}