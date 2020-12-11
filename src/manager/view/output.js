import Toggle from '/src/core/utils/toggle.js';
import {managerInput} from '/src/manager/view/input.js';

export default class ManagerOutput {
	constructor() {
		this.managerOutputToggle = new Toggle();
		this.managerContainer = document.getElementById('manager-container');
		this.stationContainer = document.getElementById('station-container');
		this.lineContainer = document.getElementById('line-container');
		this.sectionContainer = document.getElementById('section-container');
		this.mapContainer = document.getElementById('map-container');
		
		this.hideAllContainers();
	}

	hideAllContainers = () => {
		this.hideStationContainer();
		this.hideManagerContainer();
		this.hideSectionContainer();
		this.hideMapContainer();
	}

	hideStationContainer = () => {
		this.managerOutputToggle.hideElement(this.stationContainer);
	}

	hideManagerContainer = () => {
		this.managerOutputToggle.hideElement(this.lineContainer);
	}

	hideSectionContainer = () => {
		this.managerOutputToggle.hideElement(this.sectionContainer);
	}

	hideMapContainer = () => {
		this.managerOutputToggle.hideElement(this.mapContainer);
	}
}