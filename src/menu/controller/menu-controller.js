import MenuOutput from '../view/output.js';
import MenuInput from '../view/input.js';
import StationController from '/src/station/controller/station-controller.js';
import LineController from '/src/line/controller/line-controller.js';
import SectionController from '/src/section/controller/section-controller.js';
import MapController from '/src/map/controller/map-controller.js';

export default class MenuController {
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
		this.managerInput.stationManagerButton.addEventListener('click', () => new StationController());
	}

	setLineManagerButtonHandler = () => {
		this.managerInput.lineManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.lineManagerButton.addEventListener('click', this.managerOutput.showLineContainer);
		this.managerInput.lineManagerButton.addEventListener('click', () => new LineController());
	}

	setSectionManagerButtonHandler = () => {
		this.managerInput.sectionManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.sectionManagerButton.addEventListener('click', this.managerOutput.showSectionContainer);
		this.managerInput.sectionManagerButton.addEventListener('click', () => new SectionController());
	}

	setMapPrintManagerButtonHandler = () => {
		this.managerInput.mapPrintManagerButton.addEventListener('click', this.managerOutput.hideAllContainers);
		this.managerInput.mapPrintManagerButton.addEventListener('click', this.managerOutput.showMapContainer);
		this.managerInput.mapPrintManagerButton.addEventListener('click', () => new MapController());
	}
}