import Controller from '/src/controller/controller.js';
import StationManager from '/src/station/station-manager.js';

export default class SubwayStationApp {
	constructor() {
		new Controller();
		new StationManager();
	}
}

new SubwayStationApp();