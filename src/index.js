import Controller from '/src/controller/controller.js';
import StationManager from '/src/station/station-manager.js';
import LineManager from '/src/line/line-manager.js';
import SectionManager from '/src/section/section-manager.js';

export default class SubwayStationApp {
	constructor() {
		new Controller();
		new StationManager();
		new LineManager();
		new SectionManager();
	}
}

new SubwayStationApp();