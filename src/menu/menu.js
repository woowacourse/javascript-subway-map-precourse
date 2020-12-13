import MenuOutput from './view/output.js';
import MenuInput from './view/input.js';

export default class Menu {
	constructor() {
		this.managerInput = new MenuInput();
		this.managerOutput = new MenuOutput();

		this.setManagerButtonHandlers();
	}

	setManagerButtonHandlers = () => {
		this.setStationManagerButtonHandler();
		this.setLineManagerButtonHandler();
		this.setSectionManagerButtonHandler();
		this.setMapPrintManagerButtonHandler();
	}

	setStationManagerButtonHandler = () => {
		this.managerInput.stationManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.stationManagerButton.addEventListener('click', this.managerOutput.showStationContainer);
	}

	setLineManagerButtonHandler = () => {
		this.managerInput.lineManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.lineManagerButton.addEventListener('click', this.managerOutput.showLineContainer);

	}

	setSectionManagerButtonHandler = () => {
		this.managerInput.sectionManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.sectionManagerButton.addEventListener('click', this.managerOutput.showSectionContainer);
	}

	setMapPrintManagerButtonHandler = () => {
		this.managerInput.mapPrintManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.mapPrintManagerButton.addEventListener('click', this.managerOutput.showMapContainer);
	}
}