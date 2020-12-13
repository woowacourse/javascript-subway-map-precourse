import Toggle from '../services/toggle.js';

export default class MenuOutput {
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
		this.hideLineContainer();
		this.hideSectionContainer();
		this.hideMapContainer();
	}

	hideStationContainer = () => {
		this.managerOutputToggle.hideElement(this.stationContainer);
	}

	hideLineContainer = () => {
		this.managerOutputToggle.hideElement(this.lineContainer);
	}

	hideSectionContainer = () => {
		this.managerOutputToggle.hideElement(this.sectionContainer);
	}

	hideMapContainer = () => {
		this.managerOutputToggle.hideElement(this.mapContainer);
	}

	showStationContainer = () => {
		this.managerOutputToggle.showElement(this.stationContainer);
	}

	showLineContainer = () => {
		this.managerOutputToggle.showElement(this.lineContainer);
	}

	showSectionContainer = () => {
		this.managerOutputToggle.showElement(this.sectionContainer);
	}

	showMapContainer = () => {
		this.managerOutputToggle.showElement(this.mapContainer);
	}
}