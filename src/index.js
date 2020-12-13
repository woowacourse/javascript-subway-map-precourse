import MenuController from '/src/menu/controller/menu-controller.js';
import StationController from '/src/station/controller/station-controller.js';
import LineController from '/src/line/controller/line-controller.js';
import SectionController from '/src/section/controller/section-controller.js';
import MapController from '/src/map/controller/map-controller.js';

export default class SubwayStationApp {
	constructor() {
		new MenuController();
		new StationController();
		new LineController();
		new SectionController();
		new MapController();
	}
}

new SubwayStationApp();